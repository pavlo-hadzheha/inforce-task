import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IProductResponse } from '../../interfaces/product.interface';
import { ModalService } from '../../services/modal/modal.service';
import { ProductService } from '../../services/product/product.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {

  @Input('productData') data!: IProductResponse;

  background!: string;
  private deleteId: number = 0;

  constructor(
    private router: Router,
    private spaceService: ProductService,
    private modalService: ModalService,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.background = `background-position: center;
                      background-repeat: no-repeat;
                      background-blend-mode: hard-light;
                      background-size: cover;
                      background: linear-gradient(to bottom, #666 40%, #000 100%), url("${this.data.imageUrl}");`;
  }

  openDeleteModal(id: number, event: Event) {
    event?.stopPropagation();
    this.deleteId = id;
    this.modalService.open('confirmDeleteModal');
  }

  closeDeleteModal() {
    this.deleteId = 0;
    this.modalService.close('confirmDeleteModal');
  }

  deleteProduct(): void {
    this.productService.delete(this.deleteId).subscribe(() => {
      this.modalService.close("confirmDeleteModal");
      this.productService.onChange.next(true);
    })
  }
}
