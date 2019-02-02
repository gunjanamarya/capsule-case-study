import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddProjectComponent } from './add-project.component';
import { FilterProjectPipe } from '../../pipes/filter-project.pipe';
import { FilterUserPipe } from '../../pipes/filter-user.pipe';
import { FilterParentTaskPipe } from '../../pipes/filter-parent-task.pipe';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AddProjectComponent', () => {
  let component: AddProjectComponent;
  let fixture: ComponentFixture<AddProjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        HttpClientTestingModule
      ],
      declarations: [
        AddProjectComponent,
        FilterProjectPipe,
        FilterUserPipe,
        FilterParentTaskPipe
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    fixture = TestBed.createComponent(AddProjectComponent);
    component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
