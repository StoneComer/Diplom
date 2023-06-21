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
    this.newslist = [];
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
        if (newsitems.length > 0){
          this.newslist = newsitems;
        }
        this.newslist.push({
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
        },
        {
          title: 'Мосбиржа допустила к торгам акции владельца финтеха CarMoney',
          description: 'Мосбиржа допустила к торгам акции владельца финтех-сервиса CarMoney с 3 июля. Объем размещения бумаг «СмартТехГрупп» — ₽600 млн. Компания выбрала процедуру прямого листинга. Акции будут торговаться под тикером CARM',
          pubDate: '21.06.23 11:21',
          image_url: 'https://s0.rbk.ru/v6_top_pics/resized/1200xH/media/img/5/84/346873349276845.webp',
          link: 'https://quote.ru/news/article/6492a6389a7947a1bbf3bbc8',
        },
        {
          title: 'Индекс Мосбиржи, прогнозы НОВАТЭКа, выступление Пауэлла: дайджест',
          description: 'Индекс Мосбиржи закрылся в минусе, возможно развитие коррекции. Акции НОВАТЭКа упали после прогнозов по прибыли и EBITDA. Глава ФРС выступит с полугодовым отчетом в Конгрессе. События, которые влияют на рынок',
          pubDate: '21.06.23 09:25',
          image_url: 'https://s0.rbk.ru/v6_top_pics/resized/1200xH/media/img/8/76/346873264684768.webp',
          link: 'https://quote.ru/news/article/6491e1829a79471659c5a64c',
        },
        {
          title: 'Акции НОВАТЭКа подешевели на 2,5% на прогнозе главы компании',
          description: 'Компания НОВАТЭК сообщила, что из-за падения цен на сжиженный природный газ ждет снижения чистой прибыли в 2023 году на 30%, а показателя EBIDTA — на 25%. Акции компании отреагировали снижением',
          pubDate: '21.06.23 11:21',
          image_url: 'https://s0.rbk.ru/v6_top_pics/resized/1200xH/media/img/9/12/756753434890129.webp',
          link: 'https://quote.ru/news/article/6491b83d9a794762afeb0171',
        },
        {
          title: 'Брокер «Тинькофф» из-за сбоя направил уведомления о закрытии плечей',
          description: 'Пользователям «Тинькофф» пришло требование довнести средства или частично закрыть маржинальные позиции, иначе брокер сделает это принудительно. Позднее в компании опровергли принудительное закрытие, но признали факт сбоя',
          pubDate: '20.06.23 17:37',
          image_url: 'https://s0.rbk.ru/v6_top_pics/resized/1200xH/media/img/8/40/756798957594408.webp',
          link: 'https://quote.ru/news/article/6491b5c69a79473175ac09ff',
        },
        {
          title: 'Глава НАУФОР назвал полезным «справедливое» удержание НДФЛ с дивидендов',
          description: 'Ранее Ассоциация владельцев облигаций предложила удерживать налог с дивидендов в конце года или при выводе средств с брокерского на банковский счет, а не в момент поступления дивидендов на счет инвестора',
          pubDate: '20.06.23 16:44',
          image_url: 'https://s0.rbk.ru/v6_top_pics/resized/1200xH/media/img/8/60/346872661069608.webp',
          link: 'https://quote.ru/news/article/6491a1c09a79473e5f16ed41',
        },
        {
          title: 'Газпромбанк повысил целевые цены по бумагам российских техкомпаний',
          description: 'Однако рейтинг «покупать» получили лишь расписки двух компаний. Потенциал роста их котировок оценивается более чем в 15%',
          pubDate: '20.06.23 15:52',
          image_url: 'https://s0.rbk.ru/v6_top_pics/resized/1200xH/media/img/5/36/346872629492365.webp',
          link: 'https://quote.ru/news/article/649184cf9a794769ce48529b',
        },
        {
          title: 'ЦБ предупредил о рисках остановки торгов БПИФов с иностранными активами',
          description: 'Риски остановки торгов возникают из-за проблем с расчетом индикативной стоимости чистых активов БПИФов с иностранными активами. Если до конца года не найдется решение, торги этими фондами могут остановить, заявили в ЦБ',
          pubDate: '20.06.23 15:06',
          image_url: 'https://s0.rbk.ru/v6_top_pics/resized/1200xH/media/img/9/13/346872613210139.webp',
          link: 'https://quote.ru/news/article/6491889d9a79475fcd9a5ca2',
        },
        {
          title: 'Заблокированные ПИФы с иностранными активами практически не сократились',
          description: 'Денежная оценка замороженных активов пайщиков инвестиционных фондов незначительно сократилась за месяц — до ₽154,19 млрд. В 113 фондах заморожены средства 1,6 млн пайщиков',
          pubDate: '20.06.23 12:49',
          image_url: 'https://s0.rbk.ru/v6_top_pics/resized/1200xH/media/img/7/81/756546124852817.jpg',
          link: 'https://quote.ru/news/article/6490deec9a7947d88a487d6d',
        });
      }
    });
    console.log(newsIO);
  }
}
