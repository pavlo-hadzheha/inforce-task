import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IProductRequest } from 'src/app/shared/interfaces/product.interface';
import { ImageService } from 'src/app/shared/services/image/image.service';
import { ModalService } from 'src/app/shared/services/modal/modal.service';
import { ProductService } from 'src/app/shared/services/product/product.service';
import { getDownloadURL } from "@angular/fire/storage";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public addProductForm!: FormGroup;
  public imageUrl!: string;
  private imageFile!: File;

  constructor(
    private modalService: ModalService,
    private fb: FormBuilder,
    private productService: ProductService,
    private imageService: ImageService
  ) { }

  ngOnInit(): void {
    this.initAddProductForm();
    this.addProductForm.valueChanges.subscribe(d => console.log(d));
  }

  initAddProductForm() {
    this.addProductForm = this.fb.group({
      name: [null, Validators.required],
      size: this.fb.group({
        width: [null, Validators.required],
        height: [null, Validators.required],
      }),
      count: [null, Validators.required],
      weight: [null, Validators.required],
      weight_unit: ["g", Validators.required],
    })
  }

  addProduct(): void {
    this.modalService.open("addProductModal");
  }

  createProduct(): void {
    let p = this.extractProductData();
    this.imageService.uploadImage("images/products", this.imageFile).then(url => {
      p.imageUrl = url;
      this.productService.create(p).subscribe({
        next: () => {
          this.modalService.close('addProductModal');
          this.initAddProductForm();
          this.productService.onChange.next(true);
          this.imageUrl = '';
        }, 
        error: (err) => {
          console.log(err);
        }
      });
    })
  }

  extractProductData(): IProductRequest {
    let product: IProductRequest = {
      ... this.addProductForm.value as IProductRequest,
      comments: []
    };
    return product;
  }


  closeModal(id: string): void {
    this.modalService.close(id);
    console.log(this.addProductForm.value);
  }

  handleFileInput(event: Event) {
    let file: File = (event.target as HTMLInputElement).files![0];
    this.imageFile = file;
    this.imageService.toDataURL(file, imageUrl => {
      this.imageUrl = imageUrl;
    });
  }
}
