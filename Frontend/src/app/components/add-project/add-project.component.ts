import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})

export class AddProjectComponent implements OnInit {

  addProjectForm: FormGroup;
  today: Date;
  tomorrow: Date;
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.setDefaultDate();
    this.createForm();
  }

  dateFormatter(date: Date, format: string): any {
    if (!date) { return null; }
    return new DatePipe("en-US").transform(date, format);
  }

  setDefaultDate() {
    let date1 = new Date();
    let date2 = new Date(date1.setDate(date1.getDate() + 1));
    this.today = this.dateFormatter(new Date(), 'yyyy-MM-dd');
    this.tomorrow = this.dateFormatter(date2, 'yyyy-MM-dd');
    if (this.addProjectForm) {
      let start, end;
      start = this.addProjectForm.get('startDate').value;
      end = this.addProjectForm.get('endDate').value;
      if (!start || this.addProjectForm.get('startDate').status == 'INVALID') {
        this.addProjectForm.patchValue({
          "startDate": this.today
        })
      }
      if (!end || this.addProjectForm.get('endDate').status == 'INVALID') {
        this.addProjectForm.patchValue({
          "endDate": this.tomorrow
        })
      }
    }
  }

  createForm() {
    this.addProjectForm = this.fb.group({
      project: [null, Validators.required],
      priority: [0, Validators.required],
      setDate: false,
      startDate: [{ value: this.today, disabled: true }, [Validators.required, this.startDateValidator]],
      endDate: [{ value: this.tomorrow, disabled: true }, [Validators.required, this.endDateValidator]],
      manager: [null, Validators.required]
    });
  }

  onSelect(event) {
    let status = event.target.checked;
    if (status) {
      this.addProjectForm.get('startDate').enable();
      this.addProjectForm.get('endDate').enable();
    }
    else {
      this.setDefaultDate();
      this.addProjectForm.get('startDate').disable();
      this.addProjectForm.get('endDate').disable();
    }
  }

  startDateValidator(control: FormControl) {
    let startDate = new Date(control.value);
    let endDate = new Date(control.root.get('endDate').value);
    let today = new Date(new DatePipe("en-US").transform(new Date(), 'yyyy-MM-dd'))
    if (startDate && (startDate.getDate() < today.getDate()) || startDate > endDate) {
      return { error: true }
    }
    return null;
  }

  endDateValidator(control: FormControl) {
    let endDate = new Date(control.value);
    let startDate = new Date(control.root.get('startDate').value);
    if (endDate && startDate && endDate < startDate) {
      return { error: true }
    }
    return null;
  }

  onAdd() {
    console.log(this.addProjectForm);
  }

}
