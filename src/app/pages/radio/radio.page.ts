import {
  AfterContentChecked,
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { RadioService } from 'src/app/services/radio.service';

import { AudioService } from 'src/app/services/audio.service';
import { StreamState } from 'src/app/interfaces/stream-state';
import { CloudService } from 'src/app/services/cloud.service';
import { AlertController } from '@ionic/angular';
import { MusicControls } from '@awesome-cordova-plugins/music-controls/ngx';

@Component({
  selector: 'app-radio',
  templateUrl: './radio.page.html',
  styleUrls: ['./radio.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush 
})
export class RadioPage implements OnInit, AfterViewInit, AfterContentChecked {
  @ViewChild('myCanvas', { static: false }) myCanvas: ElementRef;
  player1: any;
  public loader: boolean;

  public playState: boolean = false;

  bufferLengthAlt;
  dataArrayAlt;

  radioURL: string = 'https://icecast.bkwsu.eu/radio-awaz-pune.mp3';
  //radioURL: string = "https://icecast.bkwsu.eu/pmtv_24k.mp3";

  state: StreamState;
  listeners: number;
  equilizerState: boolean = false;
  //@ViewChild('myCanvas');
  //@ViewChild('myCanvas', { static: false }) myCanvas: ElementRef;
  //myCanvas: ElementRef<HTMLCanvasElement>;
  //wave;

  constructor(
    private rs: RadioService,
    public audioService: AudioService,
    private cloud: CloudService,
    private alertController: AlertController,
    private cdref: ChangeDetectorRef,
    private musicControls: MusicControls
  ) {
    // listen to stream state
    this.audioService.getState().subscribe((state) => {
      this.state = state;
    });
  }

  onSliderChangeEnd(change) {
    this.audioService.seekTo(change.value);
  }

  onVolumeChange(volume) {
    this.audioService.setVolume(volume.value);
  }

  playStream(url) {
    this.audioService.playStream(url).subscribe((events: any) => {
      // listening for fun here
      //console.log(events);

      if (events.type == 'playing') {
        this.loader = false;
      }
      if (events.type == 'loadstart') {
        this.loader = true;
      }
      if (events.type == 'error') {
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
    } else {
      this.loader = true;
      this.openFile(this.radioURL);
      this.audioService.play();
    }
  }

  stop() {
    this.audioService.stop();
  }

  ngOnInit(): void {
    //this.navigator = navigator;
    //this.playState = this.player.pla
    this.getListeners();
    this.loader = false;

    console.log('init');
    this.audioService.getState().subscribe(d=>{
      //console.log(d.playing);
      this.equilizerState = d.playing;
      this.musicControls.updateIsPlaying(d.playing);
    });
    this.showMusicControl();
  }

  ngAfterViewInit(): void {
    // console.log(this.player1.playing());
  }
  getListeners() {
    this.cloud.geListeners().subscribe((listeners: any) => {
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
      message: 'Unable to fetch the stream. Retry after some time or contact us on +91 8888058766.',
      buttons: ['OK'],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }
  setEqualizer() {
    // for (let i = 0; i < lines.length; i += 1) {
    //   let line = lines[i];
    //   line.style.animation = `equalizer ${Math.random() * (3 - 0.3) + 0.3}s ease infinite`;
    //   line.style.animationDirection = 'alternate-reverse'
    // }
  }
  range(n):number[]{
    return Array.from(Array(n).keys());
  }
  rnd(): number{
    return Math.random() * (3 - 0.3) + 0.3;
  }
  ngAfterContentChecked() {

    this.cdref.detectChanges();

  }

  showMusicControl(){
    this.musicControls.create({
      track       : 'Puneri Awaz 107.8 FM',        // optional, default : ''
      artist      : 'Khush Raho Khushiyan Banto!',               // optional, default : ''
      cover       : 'assets/album-art.png',     // optional, default : nothing
      // cover can be a local path (use fullpath 'file:///storage/emulated/...', or only 'my_image.jpg' if my_image.jpg is in the www folder of your app)
      // or a remote url ('http://...', 'https://...', 'ftp://...')
      isPlaying   : true,                         // optional, default : true
      dismissable : false,                         // optional, default : false
    
      // hide previous/next/close buttons:
      hasPrev   : false,      // show previous button, optional, default: true
      hasNext   : false,      // show next button, optional, default: true
      hasClose  : true,       // show close button, optional, default: false
    
    // iOS only, optional
      album       : 'Puneri Awaz',     // optional, default: ''
      duration : 0, // optional, default: 0
      elapsed : 0, // optional, default: 0
      //hasSkipForward : true,  // show skip forward button, optional, default: false
      //hasSkipBackward : true, // show skip backward button, optional, default: false
      //skipForwardInterval: 15, // display number for skip forward, optional, default: 0
      //skipBackwardInterval: 15, // display number for skip backward, optional, default: 0
      //hasScrubbing: false, // enable scrubbing from control center and lockscreen progress bar, optional
    
      // Android only, optional
      // text displayed in the status bar when the notification (and the ticker) are updated, optional
      ticker    : 'Now playing "Puneri Awaz 107.8 FM"',
      // All icons default to their built-in android equivalents
      playIcon: 'media_play',
      pauseIcon: 'media_pause',
      prevIcon: 'media_prev',
      nextIcon: 'media_next',
      closeIcon: 'media_close',
      notificationIcon: 'notification'
     });
    
     this.musicControls.subscribe().subscribe(action => {
    
       function events(action) {
         const message = JSON.parse(action).message;
            switch(message) {
                case 'music-controls-next':
                    // Do something
                    break;
                case 'music-controls-previous':
                    // Do something
                    break;
                case 'music-controls-pause':
                    this.pause();
                    break;
                case 'music-controls-play':
                    this.play(this.state.playing);
                    break;
                case 'music-controls-destroy':
                    // Do something
                    break;
    
             // External controls (iOS only)
             case 'music-controls-toggle-play-pause' :
                    this.play(this.state.playing);
                    break;
             case 'music-controls-seek-to':
               const seekToInSeconds = JSON.parse(action).position;
               this.musicControls.updateElapsed({
                 elapsed: seekToInSeconds,
                 isPlaying: true
               });
               // Do something
               break;
             case 'music-controls-skip-forward':
               // Do something
               break;
             case 'music-controls-skip-backward':
               // Do something
               break;
    
                // Headset events (Android only)
                // All media button events are listed below
                case 'music-controls-media-button' :
                    this.play(this.state.playing);
                    break;
                case 'music-controls-headset-unplugged':
                    this.pause();
                    break;
                case 'music-controls-headset-plugged':
                    this.play(this.state.playing);
                    break;
                default:
                    break;
            }
         }
        });
    
     this.musicControls.listen(); // activates the observable above
  }
}
