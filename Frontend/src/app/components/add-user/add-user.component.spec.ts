import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddUserComponent } from './add-user.component';
import { FilterProjectPipe } from '../../pipes/filter-project.pipe';
import { FilterUserPipe } from '../../pipes/filter-user.pipe';
import { FilterParentTaskPipe } from '../../pipes/filter-parent-task.pipe';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AddUserComponent', () => {
  let component: AddUserComponent;
  let fixture: ComponentFixture<AddUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        HttpClientTestingModule
      ],
      declarations: [
        AddUserComponent,
        FilterProjectPipe,
        FilterParentTaskPipe,
        FilterUserPipe
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    fixture = TestBed.createComponent(AddUserComponent);
    component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
