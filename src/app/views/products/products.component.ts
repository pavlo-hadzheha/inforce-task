import { Component, OnInit } from '@angular/core';
import { IProductResponse } from 'src/app/shared/interfaces/product.interface';
import { ProductService } from 'src/app/shared/services/product/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  products!: IProductResponse[];

  constructor(
    private productService: ProductService,
  ) { }

  ngOnInit(): void { 
    this.productService.onChange.subscribe(() => {
      this.getProducts();
    })
  }

  getProducts() {
    this.productService.getAll().subscribe(data => {
      this.products = data;
    });
  }
}
