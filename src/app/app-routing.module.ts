import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductDetailsComponent } from './views/product-details/product-details.component';
import { ProductsComponent } from './views/products/products.component';

const routes: Routes = [
  { path: "products", component: ProductsComponent },
  { path: "product-details/:id", component: ProductDetailsComponent },
  { path: "", pathMatch: "full", redirectTo: "products" },
  { path: "**", pathMatch: "full", redirectTo: "products" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
