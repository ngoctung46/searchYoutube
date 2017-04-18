import { Injectable, Inject } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SearchResult } from './search-result/search-result.model';
import 'rxjs/add/operator/map';

export const API_KEY = 'AIzaSyAQYcT8jl58fTaT_--Ij_3WaUksuIte8bU';
export const API_URL = 'https://www.googleapis.com/youtube/v3/search';
@Injectable()
export class SearchService {

  constructor(
    private http: Http,
    @Inject(API_KEY) private apiKey: string,
    @Inject(API_URL) private apiUrl: string
  ) { }

  search(query: string): Observable<SearchResult[]> {
    const params: string = [
      `q=${query}`,
      `key=${this.apiKey}`,
      `part=snippet`,
      `type=video`,
      `maxResults=10`
    ].join('&');

    const queryUrl = `${this.apiUrl}?${params}`;
    return this.http.get(queryUrl)
      .map((response: Response) => {
        return (<any>response.json()).items.map(item => {
          return new SearchResult({
            id: item.id.videoId,
            title: item.snippet.title,
            description: item.snippet.description,
            thumbnailUrl: item.snippet.thumbnails.high.url

          });
        });
      });

  }

}
