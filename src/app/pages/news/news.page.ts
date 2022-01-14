import { Component, OnInit } from '@angular/core';
import { CloudService } from 'src/app/services/cloud.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.page.html',
  styleUrls: ['./news.page.scss'],
})
export class NewsPage implements OnInit {

  news: any;

  constructor(
    private cloud: CloudService
  ) { }

  ngOnInit(): void {
    this.getNews();
  }
  getNews(): void {
    this.cloud.getNews().subscribe(data => {
      console.log(data);
      this.news = data;
    })
  }

}
