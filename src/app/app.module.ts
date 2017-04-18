import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { SearchInjectables } from './youtube-search/search.injectable';
import { SearchBoxComponent } from './youtube-search/search-box/search-box.component';
import { SearchResultComponent } from './youtube-search/search-result/search-result.component';
import { YoutubeSearchComponent } from './youtube-search/youtube-search.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchBoxComponent,
    SearchResultComponent,
    YoutubeSearchComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [ SearchInjectables ],
  bootstrap: [AppComponent]
})
export class AppModule { }
