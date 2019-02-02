import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddTaskComponent } from './add-task.component';
import { FilterProjectPipe } from '../../pipes/filter-project.pipe';
import { FilterUserPipe } from '../../pipes/filter-user.pipe';
import { FilterParentTaskPipe } from '../../pipes/filter-parent-task.pipe';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('AddTaskComponent', () => {
  let component: AddTaskComponent;
  let fixture: ComponentFixture<AddTaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        HttpClientTestingModule, RouterTestingModule
      ],
      declarations: [
        AddTaskComponent,
        FilterProjectPipe,
        FilterParentTaskPipe,
        FilterUserPipe
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    fixture = TestBed.createComponent(AddTaskComponent);
    component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
