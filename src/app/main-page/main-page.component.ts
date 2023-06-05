import { Component, OnInit } from '@angular/core';
import { TablesService } from '../tables.service';
import { NewsService } from '../news.service';
import { News } from '../news/news.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {
  constructor(private tableService: TablesService, private newsService: NewsService, private route: ActivatedRoute) {}
  valutes: any = '';
  news: News = {
    title: '',
    description: '',
    pubDate: '',
    image_url: '',
    link: '',
  };
  ngOnInit() {
    this.route.data.subscribe({
      next: (resp: any) => {
        if (resp['news'].results.length > 0) {
          let newsitems: News = {
            title: '',
            description: '',
            pubDate: '',
            image_url: '',
            link: '',
          };
          newsitems = resp['news'].results[0];
          this.news = newsitems;
          this.valutes = resp['valutes'];
        }
      }
    });
  }


}
