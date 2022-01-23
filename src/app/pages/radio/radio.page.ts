import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { RadioService } from 'src/app/services/radio.service';

import { Howl, Howler } from 'howler';




@Component({
  selector: 'app-radio',
  templateUrl: './radio.page.html',
  styleUrls: ['./radio.page.scss'],
})
export class RadioPage implements OnInit {
  player: any;
  public loader: boolean;

  public playState: boolean = false;

  bufferLengthAlt;
  dataArrayAlt;

  //@ViewChild('myCanvas');
  //@ViewChild('myCanvas', {static: false}) myCanvas: ElementRef;
  //myCanvas: ElementRef<HTMLCanvasElement>;

  constructor(
    private rs: RadioService
  ) { }

  ngOnInit(): void {
    console.log(this.playState);
    this.loader = false;

    let ctx = Howler.ctx;
    //this.play('http://stream.zeno.fm/wqceshe7rchvv');

  }


  playRadio(isPlaying: boolean) {
    if (isPlaying) {
      this.stop();
    } else {
      this.loader = true;
      this.play('http://stream.zeno.fm/wqceshe7rchvv');
    }

    this.player.on('end', () => { this.onEnd(); })
    this.player.on('load', () => { this.onLoad(); })
    this.player.on('stop', () => { this.onEnd(); })
  }

  onLoad() {
    this.playState = true;
    console.log("loaded..");
    console.log(this.playState);
    this.loader = false;

  }
  onEnd() {
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
