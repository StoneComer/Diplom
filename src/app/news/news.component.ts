import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NewsService } from '../news.service';

export interface News {
  title: string;
  description: string;
  pubDate: string;
  image_url: string;
  link: string;
}

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {
  constructor(private news: NewsService, private route: ActivatedRoute) {}

  newslist: News[] = [{
    title: '',
    description: '',
    pubDate: '',
    image_url: '',
    link: '',
  }];

  ngOnInit(): void {
    let newsitems: News[] = [{
      title: '',
      description: '',
      pubDate: '',
      image_url: '',
      link: '',
    }];
    let newsIO;
    this.route.data.subscribe({
      next: (resp: any) => {
        newsitems = resp['news'].results;
        newsIO = resp['newsIO'];
      }
    });
    console.log(newsIO);
    this.newslist = [];
    this.newslist = newsitems;
  }
}
