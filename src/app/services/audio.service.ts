import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import * as moment from "moment";
import { StreamState } from '../interfaces/stream-state';

@Injectable({
  providedIn: 'root'
})
export class AudioService {
  private state: StreamState = {
    playing: false,
    readableCurrentTime: '',
    readableDuration: '',
    duration: undefined,
    currentTime: undefined,
    volume: 0.5,
    canplay: false,
    error: false,
  };
  private stop$ = new Subject();
  private audioObj = new Audio();
  audioEvents = [
    "ended",
    "error",
    "play",
    "playing",
    "pause",
    "timeupdate",
    "canplay",
    "loadedmetadata",
    "loadstart"
  ];
  private stateChange: BehaviorSubject<StreamState> = new BehaviorSubject(
    this.state
  );

  constructor() {
  }

  public static _audioContext: any = null;
//......
public static getAudioContext(): any {
  if (!AudioService._audioContext) {
    try {
      if (typeof AudioContext !== "undefined") {
        // We have an AudioContext type, so use it.
        AudioService._audioContext = new AudioContext();
      } else if (window['webkitAudioContext'] !== "undefined") {
        // We don't have AudioContext, but we do have webkitAudioContext,
        // so attempt to use that.
        AudioService._audioContext = new ((<any>window).AudioContext || (<any>window).webkitAudioContext)();
      } else {
        throw new Error('AudioContext not supported. :(');
      }
    } catch (err) {
      console.log(err.message);
      alert('Cannot create audio context.');
      throw err;
    }
  }
  return AudioService._audioContext;
}

  private updateStateEvents(event: Event): void {
    switch (event.type) {
      case "canplay":
        this.state.duration = this.audioObj.duration;
        this.state.readableDuration = this.formatTime(this.state.duration);
        this.state.canplay = true;
        break;
      case "playing":
        this.state.playing = true;
        break;
      case "pause":
        this.state.playing = false;
        break;
      case "timeupdate":
        this.state.currentTime = this.audioObj.currentTime;
        this.state.readableCurrentTime = this.formatTime(
          this.state.currentTime
        );
        break;
      case "error":
        this.resetState();
        this.state.error = true;
        break;
    }
    this.stateChange.next(this.state);
  }

  private resetState() {
    this.state = {
      playing: false,
      readableCurrentTime: '',
      readableDuration: '',
      duration: undefined,
      currentTime: undefined,
      volume: 0.5,
      canplay: false,
      error: false
    };
  }

  getState(): Observable<StreamState> {
    return this.stateChange.asObservable();
  }
  
  private streamObservable(url) {
    return new Observable(observer => {
      // Play audio
      this.audioObj.src = url;
      this.audioObj.load();
      this.audioObj.play();

      //let context = new AudioContext();
      //let src = context.createMediaElementSource(this.audioObj);
      // let analyser = context.createAnalyser();

      // let canvas = document.getElementById("canvas");
      // canvas.style.width = window.innerWidth + "px";
      // canvas.style.height = window.innerHeight + "px";
      //var ctx = canvas.getContext("2d");
  
    //   var bufferLength = analyser.frequencyBinCount;
    // console.log(bufferLength);

    //   src.connect(analyser);
    //   analyser.connect(context.destination);
  
    //   analyser.fftSize = 256;

      const handler = (event: Event) => {
        this.updateStateEvents(event);
        observer.next(event);
      };

      this.addEvents(this.audioObj, this.audioEvents, handler);
      return () => {
        // Stop Playing
        this.audioObj.pause();
        this.audioObj.currentTime = 0;
        // remove event listeners
        this.removeEvents(this.audioObj, this.audioEvents, handler);
        // reset state
        this.resetState();
      };
    });
  }

  private addEvents(obj, events, handler) {
    events.forEach(event => {
      obj.addEventListener(event, handler);
    });
  }

  private removeEvents(obj, events, handler) {
    events.forEach(event => {
      obj.removeEventListener(event, handler);
    });
  }

  playStream(url) {
    return this.streamObservable(url).pipe(takeUntil(this.stop$));
  }

  play() {
    this.audioObj.play();
  }

  pause() {
    this.audioObj.pause();
  }

  stop() {
    this.stop$.next();
  }

  seekTo(seconds) {
    this.audioObj.currentTime = seconds;
  }

  setVolume(volume) {
    this.audioObj.volume = volume;
  }

  formatTime(time: number, format: string = "HH:mm:ss") {
    const momentTime = time * 1000;
    return moment.utc(momentTime).format(format);
  }
}