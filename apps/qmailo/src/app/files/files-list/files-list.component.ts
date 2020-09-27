import { AfterViewInit, ChangeDetectionStrategy, Component, NgZone, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { RootState } from '../../reducers';
import { Store } from '@ngrx/store';
import { FilterField, selectAllFiles, selectFilterSettings, selectIsLoading, selectSortSettings, SortOrder } from '../qmail-file.reducer';
import { combineLatest, Observable, of, ReplaySubject } from 'rxjs';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { concat, distinctUntilChanged, filter, map, startWith, take, takeUntil, takeWhile } from 'rxjs/operators';
import { QmailFile } from '../qmail-file.model';
import { ChangeFilterSettings, ChangeSortSettings } from '../qmail-file.actions';
import { ScrollDispatcher } from '@angular/cdk/scrolling';

@Component({
  selector: 'app-files-list',
  templateUrl: './files-list.component.html',
  styleUrls: ['./files-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilesListComponent implements OnInit, AfterViewInit, OnDestroy {
  isLoading$: Observable<boolean>;
  columnsToDisplay = ['id', 'content'];
  dataSource = new MatTableDataSource<QmailFile>();
  filterField: FilterField;
  filterValue: string;
  onDestroy$ = new ReplaySubject<boolean>(1);
  sortSettings$: Observable<{ sortAttribute: string; sortOrder: SortOrder }>;
  filterSettings$: Observable<{ filterValue: string; filterField: FilterField }>;
  files$: Observable<QmailFile[]>;
  shouldLoadAllData$: Observable<boolean>;

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private store: Store<RootState>,
              private scroll: ScrollDispatcher,
              private ngZone: NgZone) {
  }

  ngOnInit() {
    this.isLoading$ = this.store.select(selectIsLoading);
    this.sortSettings$ = this.store.select(selectSortSettings);
    this.filterSettings$ = this.store.select(selectFilterSettings)
      .pipe(takeUntil(this.onDestroy$));

    // data source setup
    this.getSlicesFiles().subscribe(files => this.ngZone.run(() => this.dataSource.data = files));
    this.dataSource.filterPredicate = (data, filter) => this.filterPredicate(data, filter);
    // workaround for bug: https://github.com/angular/material2/issues/9966
    this.dataSource.sortingDataAccessor = (data, header) => data[header];
    this.filterSettings$.pipe(takeUntil(this.onDestroy$))
      .subscribe(({filterValue, filterField}) => {
        this.filterValue = filterValue;
        this.filterField = filterField;
        this.dataSource.filter = this.filterValue;
      });
  }

  getSlicesFiles() {
    const hasScrolledToBottom$: Observable<boolean> = this.scroll.scrolled().pipe(
      map(() => document.documentElement.scrollTop + document.body.clientHeight),
      map(scrollBottom => document.documentElement.scrollHeight - 50 <= scrollBottom),
      filter(hasScrolledToBottom => hasScrolledToBottom),
      take(1),
      startWith(false)
    );
    const hasAFilter$: Observable<boolean> = this.filterSettings$.pipe(
      map(({filterValue, filterField}) => !!filterValue),
    );
    this.shouldLoadAllData$ = combineLatest(hasScrolledToBottom$, hasAFilter$).pipe(
      map(([hasScrolled, hasFiltered]) => hasScrolled || hasFiltered),
      distinctUntilChanged(),
      takeWhile((loadAllData: boolean) => !loadAllData),
      concat(of(true))
    );

    this.files$ = this.store.select(selectAllFiles)
      .pipe(takeUntil(this.onDestroy$));

    const slicedFiles$ = combineLatest(this.files$, this.shouldLoadAllData$, this.sortSettings$).pipe(
      map(([files, shouldLoadAllData, sortSetting]) => {
        if (shouldLoadAllData) {
          return files;
        } else {
          files.sort((e1, e2) => {
            if (e1[sortSetting.sortAttribute] > e2[sortSetting.sortAttribute]) {
              return sortSetting.sortOrder === 'asc' ? 1 : -1;
            } else {
              return sortSetting.sortOrder === 'desc' ? 1 : -1;
            }
          });
          return files.slice(0, 20);
        }
      })
    );
    return slicedFiles$;
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  ngOnDestroy() {
    this.onDestroy$.next(true);
    this.onDestroy$.complete();
  }

  applyFilter() {
    this.store.dispatch(new ChangeFilterSettings({filterValue: this.filterValue, filterField: this.filterField}));
  }

  sortChange(sort: Sort) {
    const sortOrder = sort.direction !== '' ? sort.direction : 'asc';
    this.store.dispatch(new ChangeSortSettings({sortAttribute: sort.active, sortOrder}));
  }

  private filterPredicate(data, filter) {
    const value = (data[this.filterField] || '').toLowerCase().trim();
    const normFilter = (filter || '').trim().toLowerCase();
    return value.includes(normFilter);
  }
}

