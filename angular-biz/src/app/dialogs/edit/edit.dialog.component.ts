import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Component, Inject} from '@angular/core';
import {DataService} from '../../_services/data.service';
import {FormControl, Validators} from '@angular/forms';
import { AlertService, AuthenticationService } from '../../_services';

@Component({
  selector: 'app-baza.dialog',
  templateUrl: '../../dialogs/edit/edit.dialog.html',
  styleUrls: ['../../dialogs/edit/edit.dialog.css']
})
export class EditDialogComponent {

  options: string[] = ['true', 'false'];
  
  constructor(public dialogRef: MatDialogRef<EditDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, public dataService: DataService, private alertService: AlertService) { }

  formControl = new FormControl('', [
    Validators.required
     // Validators.email,
  ]);

  getErrorMessage() {
    return this.formControl.hasError('required') ? 'Required field' :
      this.formControl.hasError('email') ? 'Not a valid email' : '';
  }

  submit() {
    // emppty stuff
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  stopEdit(): void {
    //this.dataService.updateStory(this.data);
    this.dataService.updateStory(this.data)
            .subscribe(
                data => {
                    this.alertService.success('Story updated successful', true);
                },
                error => {
                    this.alertService.error(error);
             
                });
  }
}
