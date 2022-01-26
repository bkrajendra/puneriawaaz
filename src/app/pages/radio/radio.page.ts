import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { RadioService } from 'src/app/services/radio.service';

import { AudioService } from 'src/app/services/audio.service';
import { StreamState } from 'src/app/interfaces/stream-state';
import { CloudService } from 'src/app/services/cloud.service';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-radio',
  templateUrl: './radio.page.html',
  styleUrls: ['./radio.page.scss'],
})
export class RadioPage implements OnInit, AfterViewInit {

  player1: any;
  public loader: boolean;

  public playState: boolean = false;

  bufferLengthAlt;
  dataArrayAlt;

  radioURL: string = "https://icecast.bkwsu.eu/radio-awaz-pune.mp3";
  //radioURL: string = "https://icecast.bkwsu.eu/pmtv_24k.mp3";

  state: StreamState;
  listeners: number;
  //@ViewChild('myCanvas');
  //@ViewChild('myCanvas', {static: false}) myCanvas: ElementRef;
  //myCanvas: ElementRef<HTMLCanvasElement>;

  constructor(
    private rs: RadioService,
    public audioService: AudioService,
    private cloud: CloudService,
    private alertController: AlertController
  ) {

    // listen to stream state
    this.audioService.getState().subscribe(state => {
      this.state = state;
    });
   }



  onSliderChangeEnd(change) {
    this.audioService.seekTo(change.value);
  }

  onVolumeChange(volume){
    this.audioService.setVolume(volume.value);
  }

  playStream(url) {
    this.audioService.playStream(url).subscribe( (events: any) => {
      // listening for fun here
      console.log(events);

      if(events.type == 'playing'){
        this.loader = false;
      }
      if(events.type == 'loadstart'){
        this.loader = true;
      }
      if(events.type == 'error'){
        this.loader = false;
        this.presentAlert();
      }
    });
  }

  openFile(url) {
    this.audioService.stop();
    this.playStream(url);
  }

  pause() {
    this.audioService.pause();
  }

  play(pState) {        
    
    if (pState) {
      this.pause();
      this.loader = false;
    }else{
      this.loader = true;
      this.openFile(this.radioURL);
      this.audioService.play();
    }
    
  }

  stop() {
    this.audioService.stop();
  }

 

  ngOnInit(): void {
    //this.playState = this.player.pla
    this.getListeners();
    this.loader = false;

    console.log('init');
  }
  ngAfterViewInit(): void {
   // console.log(this.player1.playing());
  }
  getListeners(){
    this.cloud.geListeners().subscribe((listeners: any)=>{
      this.listeners = listeners.icestats.source[6].listeners;
      console.log(listeners);
      console.log(listeners.icestats.source[6].listeners);
    });
  }
  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'success',
      header: 'Error',
      subHeader: 'Stream Error!',
      message: 'Unable to fetch the stream. Retry after some time.',
      buttons: ['OK']
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }
}
