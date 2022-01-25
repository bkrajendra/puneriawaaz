import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { LoadingController } from '@ionic/angular';
import { CloudService } from 'src/app/services/cloud.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ContactPage implements OnInit, AfterViewInit {
  @ViewChild('mapCanvas', { static: true }) mapElement: ElementRef;

  settingsData: any = {};
  map:any;

  constructor(
    private cloud: CloudService,
    private loader: LoadingController,
    public sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.getSettings();
    //this.presentLoading();
  }
  async ngAfterViewInit() {
    //const mapEle = this.mapElement.nativeElement;
    let latitude = 18.6032531;
    let longitude = 73.7869188;
 
    
    const googleMaps = await this.getGoogleMaps(
      'AIzaSyAu5RrNdxPdf1XXTopOB-aZhx_4pFyoxeU'
    );
    let latLng = { lat: latitude, lng: longitude };
    let map;
    map = new googleMaps.Map(this.mapElement.nativeElement, {
      center: latLng,
      zoom: 14
    });

    const infoWindow = new googleMaps.InfoWindow({
      content: `<div>

      <p style="text-align: justify;"><span style="color: rgb(184, 49, 47);"><strong>Radio Puneri Awaz<br></strong></span>Might House, Near Metro Hospital,</p>
      
      <p style="text-align: justify;">Nakhate Vasti, Rahatani
        <br>Pimpri-Chinchwad-411017
        <br>Phone: <a href="tel:7588099185">7588099185</a>, <a href="tel:7219190005">7219190005</a></p>
      
      <h4 class="oc-text-spaced" style="text-align: justify;">Email: &nbsp;<a class="oc-link-strong" href="mailto:puneriawazfm@gmail.com">puneriawazfm@gmail.com</a></h4>
      
      <h4 class="oc-text-spaced" style="text-align: justify;">Website: <a class="oc-link-strong" href="https://puneriawaz.in/">https://puneriawaz.in</a></h4></div>`
    });

    const marker = new googleMaps.Marker({
      position: latLng, map,
      title: "Puneri Awaz"
    });
    infoWindow.open(map, marker);
    marker.addListener('click', () => {
      infoWindow.open(map, marker);
    });
    googleMaps.event.addListenerOnce(map, 'idle', () => {
      this.mapElement.nativeElement.classList.add('show-map');
    });

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
  getGoogleMaps(apiKey: string): Promise<any> {
    const win = window as any;
    const googleModule = win.google;
    if (googleModule && googleModule.maps) {
      return Promise.resolve(googleModule.maps);
    }
  
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&v=weekly`;
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
      script.onload = () => {
        const googleModule2 = win.google;
        if (googleModule2 && googleModule2.maps) {
          resolve(googleModule2.maps);
        } else {
          reject('google maps not available');
        }
      };
    });
  }
}
