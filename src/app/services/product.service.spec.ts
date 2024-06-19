import { TestBed } from '@angular/core/testing';
import { ProductService } from './product.service';
import { Product } from '../models/product';

describe('ProductService', () => {
  let service: ProductService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [ProductService],
    }).compileComponents();

    service = TestBed.inject(ProductService);
  });

  it('Init service', () => {
    expect(service).toBeTruthy();
  });

  it('returns all products', () => {
    const products: Product[] = service.getAllProducts();
    expect(products.length).toBe(2);
    expect(products[0].id).toBe(1);
    expect(products[0].name).toBe('Keyboard');
    expect(products[0].inStock).toBe(true);
    expect(products[1].id).toBe(2);
    expect(products[1].name).toBe('Mouse');
    expect(products[1].inStock).toBe(false);
  });

  it('add a new product', () => {
    const product: Product = {
      id: 3,
      name: 'Mouse Pad',
      inStock: true,
    };
    service.addProduct(product);
    const products: Product[] = service.getAllProducts();
    expect(products.length).toBe(3);
    expect(products[2]).toEqual(product);
  });

  it('update a product', () => {
    const product: Product = {
      id: 1,
      name: 'Keyboard',
      inStock: false,
    };
    service.updateProduct(product);
    const products: Product[] = service.getAllProducts();
    expect(products[0]).toEqual(product);
  });

  it('delete a existing product', () => {
    const product: Product = {
      id: 1,
      name: 'Keyboard',
      inStock: true,
    };
    service.deleteProduct(product);
    const products: Product[] = service.getAllProducts();
    expect(products.length).toBe(1);
    expect(products[0].id).toBe(1);
    expect(products[0].name).toBe('Keyboard');
    expect(products[0].inStock).toBe(true);
  });
});
