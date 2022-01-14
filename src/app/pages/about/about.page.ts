import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { CloudService } from 'src/app/services/cloud.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {

  settingsData: any = {};
  constructor(
    private cloud: CloudService,
    private loader: LoadingController
  ) { }

  ngOnInit(): void {
    this.getSettings();
    this.presentLoading();
  }
  getSettings(): void {
    this.cloud.getSettings().subscribe(data => {
      this.settingsData = data;
      console.log(this.settingsData);
      this.loader.dismiss();
    });
  }

  async presentLoading() {
    const loading = await this.loader.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
      duration: 10000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
  }

}
