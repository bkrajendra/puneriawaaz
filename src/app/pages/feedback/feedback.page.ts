import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { CloudService } from 'src/app/services/cloud.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.page.html',
  styleUrls: ['./feedback.page.scss'],
})
export class FeedbackPage implements OnInit {
  feedbackForm = this.fb.group({
    name:['', Validators.required],
    email: ['', Validators.email],
    feedback:['', Validators.required]
  });
  constructor(
    private cld: CloudService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
  }

  submitFeedback() {
    console.log(this.feedbackForm.value);
    this.cld.postFeedback(this.feedbackForm.value).subscribe(data => {
      console.log(data);
    });
  }

}
