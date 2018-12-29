import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../models/User.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
  providers: [UserService]
})
export class AddUserComponent implements OnInit {

  addUserForm: FormGroup;
  users_list: User[];
  editable: boolean;
  edit_id: any;
  search_key: string;
  error: string;
  constructor(private fb: FormBuilder, private userService: UserService) { }

  ngOnInit() {
    this.createForm();
    this.getUsersList();
  }

  createForm() {
    this.addUserForm = this.fb.group({
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      employeeId: [null, Validators.required],
    });
  }

  onSubmit() {
    console.log('user submitted')
    var user = new User();
    user.firstName = this.addUserForm.get('firstName').value;
    user.lastName = this.addUserForm.get('lastName').value;
    user.employeeId = this.addUserForm.get('employeeId').value;
    this.userService.addUser(user).subscribe(data => {
      this.addUserForm.reset();
      this.getUsersList();
      this.error = null;
    }, error => {
      this.error = 'Atleast one of the field has error !!';
      console.log(error)
    });
  }

  getUsersList() {
    this.users_list = [];
    this.userService.getUsers().subscribe(data => {
      this.users_list = data;
      // console.log(this.users_list)
    }, error => {
      console.log(error)
    });
  }

  sort(basis) {
    // sort by employeeId
    if (basis == 'employeeId') {
      this.users_list.sort((a, b) => {
        return +a.employeeId - +b.employeeId;
      });
    } else if (basis == 'firstName') {
      // sort by firstName
      this.users_list.sort((a, b) => {
        var nameA = a.firstName.toUpperCase();
        var nameB = b.firstName.toUpperCase();
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      });
    } else {
      // sort by lastName
      this.users_list.sort((a, b) => {
        var nameA = a.lastName.toUpperCase();
        var nameB = b.lastName.toUpperCase();
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      });
    }
  }

  onDelete(id) {
    // console.log(id)
    this.userService.deleteUser(id).subscribe(data => {
      this.getUsersList();
    }, error => {
      console.log(error)
    });
  }

  onEdit(id) {
    this.userService.searchUser(id).subscribe(result => {
      this.addUserForm.setValue({
        "firstName": result[0].firstName,
        "lastName": result[0].lastName,
        "employeeId": result[0].employeeId
      });
      this.editable = true;
      this.edit_id = id
    }, error => {
      console.log(error)
    });
  }

  onEditSave() {
    var user = new User();
    user.firstName = this.addUserForm.get('firstName').value;
    user.lastName = this.addUserForm.get('lastName').value;
    user.employeeId = this.addUserForm.get('employeeId').value;
    this.userService.updateUser(user, this.edit_id).subscribe(data => {
      this.editable = false;
      this.edit_id = null;
      this.addUserForm.reset();
      this.getUsersList();
      this.error = null;
    }, error => {
      this.error = 'Atleast one of the field has error !!';
      console.log(error)
    });
  }

  cancelEdit() {
    this.addUserForm.reset();
    this.editable = false;
    this.edit_id = null;
    this.error = null;
  }

  clearFilter() {
    this.search_key = null;
    this.getUsersList();
  }

}