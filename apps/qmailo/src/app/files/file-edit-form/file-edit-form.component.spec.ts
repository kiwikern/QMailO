import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FileEditFormComponent } from './file-edit-form.component';

describe('FileEditFormComponent', () => {
  let component: FileEditFormComponent;
  let fixture: ComponentFixture<FileEditFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FileEditFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
