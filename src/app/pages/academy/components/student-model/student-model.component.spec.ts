import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentModelComponent } from './student-model.component';

describe('StudentModelComponent', () => {
  let component: StudentModelComponent;
  let fixture: ComponentFixture<StudentModelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudentModelComponent]
    });
    fixture = TestBed.createComponent(StudentModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
