import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Book } from '../../../shared/models/book.model';
import { DataService } from '../../../shared/services/data.service';

@Component({
  selector: 'app-book-item',
  templateUrl: './book-item.component.html',
  styleUrls: ['./book-item.component.scss']
})
export class BookItemComponent implements OnInit {
  symbol: string;
  book: Book;

  constructor(private route: ActivatedRoute, private dataService: DataService) { }

  ngOnInit() {
    this.route.params.subscribe(res => {
      this.symbol = res.symbol;
    });
    setInterval(() => {
      this.dataService.getAsksBidsBySymbol(this.symbol).subscribe(book => {
        this.book = book;
      });
    }, 2000);
  }

}
