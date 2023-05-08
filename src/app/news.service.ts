import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class NewsService {
    constructor(private http: HttpClient) {}
    url = 'https://newsdata.io/api/1/news?apikey=pub_21798a9416c44810c7d150eeb02fb0438cff0&q=finances&language=ru';
    keyNewsApi = '&sortBy=popularity&apiKey=f21b9f91e1ec4efbb910101d2e5638a0';
    urlNewsApi = 'https://newsapi.org/v2/top-headlines?q=finances&country=ru'
    //url1 = 'https://lenta.ru/rss';
    getNewsIo() {
        return this.http.get(this.url);
    }
    getNewsApi(year: number, month: number, day: number) {
      return this.http.get(this.urlNewsApi + '&from=' + year + '-' + month + '-' + day + '&to=' + year + '-' + (month + 1) + '-' + day + this.keyNewsApi);
    }
    // getNewsLenta() {
    //   return this.http.get(this.url1);
    // }
}
