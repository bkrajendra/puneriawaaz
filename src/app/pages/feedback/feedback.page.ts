import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
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
    public toastController: ToastController,
    private loadingCtrl: LoadingController
  ) { }

  ngOnInit() {
  }
  async presentToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 5000
    });
    toast.present();
  }
  submitFeedback() {
    this.showLoading();
    console.log(this.feedbackForm.value);
    this.cld.postFeedback(this.feedbackForm.value).subscribe((data:any) => {
      console.log(data);
      alert("Email Sent!");
      if (data.status==='sent') {
        this.presentToast("Email Sent!");
        this.feedbackForm.reset();
        this.loadingCtrl.dismiss();
      }
    }, (e) => {
      this.presentToast("Error Sending email!"); 
      console.log(e);
      this.loadingCtrl.dismiss();
    });
  }
  async showLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Sending message...',
      duration: 30000,
    });

    loading.present();
  }
}
