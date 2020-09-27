import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FileAddFormComponent } from './file-add-form.component';

describe('FileAddFormComponent', () => {
  let component: FileAddFormComponent;
  let fixture: ComponentFixture<FileAddFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FileAddFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileAddFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
