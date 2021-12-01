import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { CommentUID, ICommentRequest, ICommentResponse } from 'src/app/shared/interfaces/comment.interface';
import { IProductRequest, IProductResponse } from 'src/app/shared/interfaces/product.interface';
import { CommentService } from 'src/app/shared/services/comment/comment.service';
import { ImageService } from 'src/app/shared/services/image/image.service';
import { ModalService } from 'src/app/shared/services/modal/modal.service';
import { ProductService } from 'src/app/shared/services/product/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  product!: IProductResponse;
  commentForm!: FormGroup
  comments!: Array<ICommentResponse>;
  productId: number = 0;
  subs: Subscription[] = [];
  imageUrl: string = '';
  editProductForm!: FormGroup;

  constructor(
    private productService: ProductService,
    private comment: CommentService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private modalService: ModalService,
    private imageService: ImageService
  ) { }

  ngOnInit(): void {
    this.subs.push(this.comment.onChange.subscribe(this.getComments.bind(this)));
    this.subs.push(this.productService.onChange.subscribe(this.getProduct.bind(this)));
    this.initCommentForm();
  }

  ngOnDestroy(): void {
    this.subs.forEach(e => e.unsubscribe());
  }

  getComments(): void {
    this.productId = (this.route.snapshot.params['id'] as unknown) as number;
    this.comment.get(this.productId).subscribe((data) => {
      this.comments = data;
    });
  }

  getProduct() {
    this.productId = (this.route.snapshot.params['id'] as unknown) as number;
    this.productService.getOne(this.productId).subscribe((data) => {
      this.product = data;
      this.initEditProductForm();
    });
  }

  initCommentForm(): void {
    this.commentForm = this.fb.group({
      description: [null, Validators.required]
    })
  }

  createComment(): void {
    let comment: ICommentRequest = {
      ... this.commentForm.value,
      date: Date.now(),
      productId: Number(this.productId)
    }
    this.comment.create(comment).subscribe(() => {
      this.initCommentForm();
      this.comment.onChange.next(true);
    });
  }

  deleteComment(id: CommentUID) {
    this.comment.delete(id).subscribe(() => {
      this.comment.onChange.next(true);
    });
  }

  openEditModal(): void {
    this.modalService.open("editProductModal");
  }

  updateProduct(): void {
    this.product.name = this.editProductForm.value.name;
    this.product.name = this.editProductForm.value.name;
    this.product.size.height = this.editProductForm.value.size.height;
    this.product.size.width = this.editProductForm.value.size.width;
    this.product.weight = this.editProductForm.value.weight;
    this.product.weight_unit = this.editProductForm.value.weight_unit;
    this.productService.update(this.product).subscribe({
      next: () => {
        this.modalService.close('editProductModal');
        this.initEditProductForm();
        this.productService.onChange.next(true);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  extractProductData(): IProductRequest {
    let product: IProductRequest = {
      ... this.editProductForm.value as IProductRequest,
    };
    return product;
  }

  closeModal(id: string): void {
    this.modalService.close(id);
  }

  handleFileInput(event: Event) {
    let file: File = (event.target as HTMLInputElement).files![0];
    this.imageService.toDataURL(file, imageUrl => {
      this.imageUrl = imageUrl;
    });
    this.imageService.uploadImage('images/products', file).then(url => {
      this.product.imageUrl = url;
      this.productService.update(this.product).subscribe(() => {
        this.productService.onChange.next(true);
      })
    })
  }

  initEditProductForm() {
    this.editProductForm = this.fb.group({
      name: [this.product.name, Validators.required],
      size: this.fb.group({
        width: [this.product.size.width, Validators.required],
        height: [this.product.size.height, Validators.required],
      }),
      count: [this.product.count, Validators.required],
      weight: [this.product.weight, Validators.required],
      weight_unit: [this.product.weight_unit, Validators.required],
    });
  }

}
