import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AlertController, ToastController } from '@ionic/angular';
import { CloudService } from 'src/app/services/cloud.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.page.html',
  styleUrls: ['./feedback.page.scss'],
})
export class FeedbackPage implements OnInit {
  feedbackForm = this.fb.group({
    name:['', Validators.required],
    email:['', [Validators.email, Validators.required]],
    feedback:['', Validators.required]
  });
  constructor(
    private cld: CloudService,
    private fb: FormBuilder,
    public toastController: ToastController
  ) { }

  ngOnInit() {
  }
  async presentToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 3000
    });
    toast.present();
  }
  submitFeedback() {
    console.log(this.feedbackForm.value);
    this.cld.postFeedback(this.feedbackForm.value).subscribe((data:any) => {
      console.log(data);
      if (data.status==='sent') {
        this.presentToast("Email Sent!");
        this.feedbackForm.reset();
      }
    });
  }

}
