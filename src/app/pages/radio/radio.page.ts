import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { RadioService } from 'src/app/services/radio.service';

import { Howl, Howler } from 'howler';
import { AudioService } from 'src/app/services/audio.service';
import { StreamState } from 'src/app/interfaces/stream-state';




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

  //radioURL: string = "https://icecast.bkwsu.eu/radio-awaz-pune.mp3";
  radioURL: string = "https://icecast.bkwsu.eu/pmtv_24k.mp3";

  state: StreamState;
  //@ViewChild('myCanvas');
  //@ViewChild('myCanvas', {static: false}) myCanvas: ElementRef;
  //myCanvas: ElementRef<HTMLCanvasElement>;

  constructor(
    private rs: RadioService,
    public audioService: AudioService
  ) {
    // this.player1 = new Howl({
    //   src: ['https://icecast.bkwsu.eu/radio-awaz-pune.mp3'],
    //   html5: true,
    //   format: ['mp3'],
    //   onplay: this.isPlaying()
    // });

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
      // console.log(this.state);
      this.loader = !this.state.playing;
      if(events.type == 'ended'){
        
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
    
    this.loader = false;

    let ctx = Howler.ctx;
    //this.play('http://stream.zeno.fm/wqceshe7rchvv');
    console.log('init');
  }
  ngAfterViewInit(): void {
   // console.log(this.player1.playing());
  }
  isPlaying(){
    // if(this.player.playing()){
    //    console.log('audio is currently playing...');
    //    this.playState = true;
    //    setTimeout(this.isPlaying, 1000); //adjust timeout to fit your needs
    // }
 }
  // playRadio(isPlaying: boolean) {
  //   if (isPlaying) {
  //     this.stop();
  //   } else {
  //     this.loader = true;
  //     this.play();
  //   }

  //   this.player1.on('end', () => { this.onEnd(); })
  //   this.player1.on('load', () => { this.onLoad(); })
  //   this.player1.on('stop', () => { this.onEnd(); })
  // }

  // onLoad() {
  //   this.playState = true;
  //   console.log("loaded..");
  //   console.log(this.playState);
  //   this.loader = false;

  // }
  // onEnd() {
  //   console.log("ended..");
  //   this.playState = false;
  // }
  // play1() {
  //   if (this.player1) {
  //     this.player1.stop();
  //   }
    
  //   this.player1.play();

  // }

  // stop1() {

  //   if (this.player1) {
  //     this.player1.stop();
  //     //this.player = undefined;
  //   }
  // }
}
