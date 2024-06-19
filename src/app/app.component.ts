import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductService } from './services/product.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Product } from './models/product';
import { ModeEnum } from './models/mode.enum';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent implements OnInit {
  private ProductService = inject(ProductService);
  private fb = inject(FormBuilder);

  form = this.fb.group({
    id: [0],
    name: ['', Validators.required],
    inStock: [true, Validators.required],
  });

  ModeEnum = ModeEnum;
  products!: Product[];
  mode = ModeEnum.NON;

  ngOnInit(): void {
    this.setProducts();
  }

  private setProducts() {
    this.products = this.ProductService.getAllProducts();
  }

  addNewProduct() {
    this.mode = ModeEnum.ADD;
  }

  editProduct(product: Product) {
    this.mode = ModeEnum.EDIT;
    this.form.setValue(product);
  }

  saveProduct() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const product = this.form.value as Product;

    if (this.mode === ModeEnum.ADD) {
      this.ProductService.addProduct(product);
    } else {
      this.ProductService.updateProduct(product);
    }

    this.setProducts();
    this.cancel();
  }

  removeProduct(product: Product) {
    this.ProductService.deleteProduct(product);
    this.setProducts();
  }

  cancel() {
    this.form.reset();
    this.mode = ModeEnum.NON;
  }
}
