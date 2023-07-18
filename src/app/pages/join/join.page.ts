import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { LoadingController, ToastController } from '@ionic/angular';
import { CloudService } from 'src/app/services/cloud.service';

@Component({
  selector: 'app-join',
  templateUrl: './join.page.html',
  styleUrls: ['./join.page.scss'],
})
export class JoinPage implements OnInit {
  joinForm = this.fb.group({
    name:['', Validators.required],
    email:['', [Validators.email, Validators.required]],
    bio:['', Validators.required]
  });
  loading: any;
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
  join() {
    console.log(this.joinForm.value);
    this.showLoading();
    this.cld.postJoin(this.joinForm.value).subscribe((data: any) => {
      console.log(data);
      alert("Email Sent!");
      if (data.status==='sent') {
        this.presentToast("Email Sent!");
        this.joinForm.reset();
        this.loadingCtrl.dismiss();
      }
    }, (e) => {
      this.presentToast("Error Sending email!"); 
      console.log(e);
      this.loadingCtrl.dismiss();
    });
  }
  async showLoading() {
    this.loading = await this.loadingCtrl.create({
      message: 'Sending message...',
      duration: 30000,
    });

    this.loading.present();
  }
}
