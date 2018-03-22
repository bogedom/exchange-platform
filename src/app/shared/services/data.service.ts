import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Book } from '../models/book.model';

@Injectable()
export class DataService {
  private dataUrl = 'https://api.bitfinex.com/v1/';

  constructor(private httpClient: HttpClient) { }


  getSymbols(): Observable<string[]> {
    return this.httpClient.get<string[]>(this.dataUrl + 'symbols');
  }

  getAsksBidsBySymbol(symbol: string): Observable<Book> {
    return this.httpClient.get<Book>(this.dataUrl + 'book/' + symbol);
  }
}
