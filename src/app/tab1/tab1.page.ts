import { Component, OnInit } from '@angular/core';
import {Howl, Howler} from 'howler';
import { RadioService } from '../services/radio.service';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  player: any;
  public loader: boolean;

  public playState: boolean = false;
  constructor(
    private rs: RadioService
  ) {}

  ngOnInit(): void {
    console.log( this.playState);
    this.loader = false;


  }
  playRadio(isPlaying){
    if(isPlaying){
      this.stop();
    }else{
      this.loader = true;
      this.play('https://icecast.bkwsu.eu/radio-awaz-pune.mp3');
    }
    
    this.player.on('end', () => {this.onEnd();})
    this.player.on('load', () => {this.onLoad();})
    this.player.on('stop', () => {this.onEnd();})
  }
  
  onLoad(){
    this.playState = true;
    console.log("loaded..");
    console.log( this.playState);
    this.loader = false;
  }
  onEnd(){
    console.log("ended..");
    this.playState = false;
  }
  play(track) {
    if (this.player) {
      this.player.stop();
    }
    this.player = new Howl({
      src: [track],
      html5: true,
      format: ['mp3']
    });
    this.player.play();
  }

  stop() {
    
    if (this.player) {
      this.player.stop();
      //this.player = undefined;
    }
  }
}
