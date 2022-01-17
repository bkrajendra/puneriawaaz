import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { CloudService } from 'src/app/services/cloud.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
})
export class ContactPage implements OnInit {
  settingsData: any = {};

  constructor(
    private cloud: CloudService,
    private loader: LoadingController
  ) { }

  ngOnInit() {
    this.getSettings();
    //this.presentLoading();
  }
  getSettings(): void {
    this.cloud.getSettings().subscribe(data => {
      this.settingsData = data;
      console.log(this.settingsData);
    });
  }

  async presentLoading() {
    const loading = await this.loader.create({
      message: 'Please wait...',
      duration: 1000,
      spinner: 'circular',
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
  }
}
