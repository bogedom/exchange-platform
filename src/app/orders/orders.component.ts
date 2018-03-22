import { Component, OnInit } from '@angular/core';
import { DataService } from '../shared/services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  symbols: string[];

  constructor(private router: Router, private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getSymbols().subscribe(symbols => this.symbols = symbols);
    setInterval(() => {
      this.dataService.getSymbols().subscribe(symbols => this.symbols = symbols);
    }, 25000);
  }

}
