import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../../shared/services/data.service';
import { Book } from '../../shared/models/book.model';
import { ToasterService, Toast } from 'angular2-toaster';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.scss']
})
export class OrderFormComponent implements OnInit {
  @Input() symbols: string[];
  types: string[] = ['Bid', 'Ask'];
  book: Book;
  selectedType: string;
  bestPrice: number;
  badPrice: number;

  isSubmitted = false;
  orderForm: FormGroup;

  constructor(private fb: FormBuilder, private dataService: DataService, private toasterService: ToasterService) {
  }

  ngOnInit() {
    this.createForm();
    this.type.valueChanges.forEach(value => {
      this.selectedType = value;
      if (this.pair.value) {
        this.getPrice(this.pair.value);
      }
    });
    this.pair.valueChanges.forEach(value => {
        if (value && this.type.value) {
          this.getPrice(value);
        } else {
          this.bestPrice = null;
          this.badPrice = null;
        }
      }
    );
    this.price.valueChanges.forEach(value => {
        if (value && (value < this.badPrice || value > this.bestPrice)) {
          const toast: Toast = {
            type: 'warning',
            title: 'Warning',
            body: 'Not the best price',
            showCloseButton: true
          };
          this.toasterService.pop(toast);
        }
      }
    );
  }

  createForm() {
    this.orderForm = this.fb.group({
      type: ['', Validators.required],
      pair: ['', Validators.required],
      count: ['', Validators.required],
      price: ['', Validators.required]
    });
  }


  onSubmit() {
    this.isSubmitted = true;
    if (this.orderForm.valid) {
      const toast: Toast = {
        type: 'success',
        title: 'Success',
        body: 'The order has been sent. { Type: ' + this.type.value + '; Pair: ' + this.pair.value + ' Count: ' + this.count.value +
        '; Price: ' + this.price.value + '; }',
        showCloseButton: true
      };
      this.toasterService.pop(toast);
      console.log('Form Submitted!');
    } else {
      const toast: Toast = {
        type: 'error',
        title: 'Fail',
        body: 'Form is invalid',
        showCloseButton: true
      };
      this.toasterService.pop(toast);
      console.log('invalid');
    }
  }

  get type() {
    return this.orderForm.get('type');
  }

  get pair() {
    return this.orderForm.get('pair');
  }

  get count() {
    return this.orderForm.get('count');
  }

  get price() {
    return this.orderForm.get('price');
  }

  getPrice(pair: string) {
    this.dataService.getAsksBidsBySymbol(pair).subscribe(book => {
        this.book = book;
        if (this.selectedType === this.types[0]) {
          this.bestPrice = book.bids[0].price;
          this.badPrice = book.bids[24].price;
        } else {
          this.bestPrice = book.asks[0].price;
          this.badPrice = book.asks[24].price;
        }
      }
    );
  }

}
