import { 
  Component, 
  OnInit, 
  Output, 
  EventEmitter, 
  ElementRef } from '@angular/core';
import { SearchResult } from '../search-result/search-result.model';
import { SearchService } from '../search.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/switch';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent implements OnInit {
  @Output() loading: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() results: EventEmitter<SearchResult[]> = new EventEmitter<SearchResult[]>();
  constructor(
    private searchService: SearchService,
    private el: ElementRef
  ) { }

  ngOnInit(): void {
    Observable.fromEvent(this.el.nativeElement, 'keyup')
      .map((e: any) => e.target.value)
      .filter((text: string) => text.length > 1)
      .debounceTime(250)
      .do(() => this.loading.next(true))
      .map((query: string) => this.searchService.search(query))
      .switch()
      .subscribe( (results: SearchResult[]) => {
        this.loading.next(false);
        this.results.next(results);
      },
      (err: any) => {
        console.log(err);
        this.loading.next(false);
      }
      ,
      () => {
        this.loading.next(false);
      });
  }

}
