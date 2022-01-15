import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-share',
  templateUrl: './share.page.html',
  styleUrls: ['./share.page.scss'],
})
export class SharePage implements OnInit {

  usr: string = '';
  constructor() { }

  ngOnInit() {
    let num = Math.random().toString().split('.')[1];
    this.usr = 'usr#' + num.split('')[0].toString() + num.split('')[1].toString() +
      num.split('')[3].toString() + num.split('')[4].toString() + num.split('')[5].toString();
  }

}
