import { Injectable } from '@angular/core';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root',
})

export class ProductService {
  private readonly products = [
    {
      id: 1,
      name: 'Keyboard',
      inStock: true
    },
    {
      id: 2,
      name: 'Mouse',
      inStock: false
    }
  ];

  getAllProducts(): Product[] {
    return this.products;
  }

  addProduct(product: Product) {
    product.id = this.products.length + 1;
    this.products.push(product);
  }

  updateProduct(product: Product) {
    const index = this.products.findIndex((u) => product.id === u.id);
    this.products[index] = product;
  }

  deleteProduct(product: Product) {
    this.products.splice(this.products.indexOf(product), 1);
  }
}
