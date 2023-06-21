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
  news: News[] = [];
  ngOnInit() {
    this.route.data.subscribe({
      next: (resp: any) => {
        this.news = [];
        let newsitems: News = {
          title: '',
          description: '',
          pubDate: '',
          image_url: '',
          link: '',
        };
        if (resp['news'].results.length > 0) {
          newsitems = resp['news'].results[0];
          this.news.push(newsitems);
        }
        this.news.push({
          title: 'Набиуллина рассказала о работе ЦБ над схемой выкупа замороженных активов',
          description: 'Накануне о варианте разблокировки с использованием денег иностранцев со счетов типа С рассказал первый зампред ЦБ Владимир Чистюхин.',
          pubDate: '21.06.23 13:07',
          image_url: 'https://s0.rbk.ru/v6_top_pics/resized/1200xH/media/img/1/03/346873412966031.webp',
          link: 'https://quote.ru/news/article/6492c4979a79474af1098fe3',
        },
        {
          title: 'Курс юаня к доллару упал до самых низких значений с ноября 2022 года',
          description: 'Курс юаня снизился по отношению к доллару США до минимума с 29 ноября 2022 года. Юань упал более чем на 4% за последние три месяца',
          pubDate: '21.06.23 12:47',
          image_url: 'https://s0.rbk.ru/v6_top_pics/resized/1200xH/media/img/1/77/346873375145771.webp',
          link: 'https://quote.ru/news/article/6492b36c9a794715010af030',
        },
        {
          title: 'Аналитики дали прогноз превращения NVIDIA в самую дорогую компанию мира',
          description: 'В Evercore подняли целевую цену для акций компании до $550. Обновленный прогноз предполагает потенциал роста свыше 20% по сравнению с ценой закрытия торгов 20 июня. При этом NVIDIA уже торгуется на рекордных уровнях',
          pubDate: '21.06.23 12:37',
          image_url: 'https://s0.rbk.ru/v6_top_pics/resized/1200xH/media/img/5/15/346873355872155.webp',
          link: 'https://quote.ru/news/article/6492a5349a79476038d094bc',
        });
        this.valutes = resp['valutes'];
      }
    });
  }


}
