import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Component, Inject} from '@angular/core';
import {DataService} from '../../_services/data.service';
import {FormControl, Validators} from '@angular/forms';
import {Story} from '../../_models/story';
import { AlertService, AuthenticationService } from '../../_services';

@Component({
  selector: 'app-add.dialog',
  templateUrl: '../../dialogs/add/add.dialog.html',
  styleUrls: ['../../dialogs/add/add.dialog.css']
})

export class AddDialogComponent {
  constructor(public dialogRef: MatDialogRef<AddDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Story,
              public dataService: DataService, private alertService: AlertService) { }

  formControl = new FormControl('', [
    Validators.required
    // Validators.email,
  ]);

  getErrorMessage() {
    return this.formControl.hasError('required') ? 'Required field' :
      this.formControl.hasError('email') ? 'Not a valid email' :
        '';
  }

  submit() {
  // emppty stuff
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public confirmAdd(): void {
      console.log('new data:',this.data);
    let data = { "title" : this.data.title, "description":this.data.description, "published" : true }
    //this.dataService.addStory(data);
    this.dataService.addStory(data)
            .subscribe(
                data => {
                    this.alertService.success('Story added successful', true);
                },
                error => {
                    this.alertService.error(error);
                    
                });
  }
}
