import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product, ProductService } from 'src/app/libs/products';
import { tap } from 'rxjs/operators';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  @ViewChild('productForm', { static: false }) productForm: NgForm;

  product: Product;
  action: string;
  id: number;

  constructor(
    private productService: ProductService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    
  }

  addProduct() {
    this.product = new Product();
    this.product.id = 0;
  }

  backToList() {
    this.product = null;
    this.router.navigate(['product-list'])
  }

  async deleteProductAsync(product: Product) {
    try {
      const response = await this.productService.deleteProductAsync(product);
      if (!response.success) {
        alert(response.message);
        return;
      }
      this.router.navigate(['product-list']);
    } catch (error) {
      alert(error.message);
    }
  }

  async findProductById(id: number) {
    try {
      const response = await this.productService.FindProductById(id);
      if (!response.success) {
        alert(response.message);
        return null;
      }
      return response.obj;
    } catch (error) {
      alert(error.message);
      return null;
    }
  }

  saveProductButton_Click() {
    this.validateProduct(this.product);
    switch (this.action) {
      case 'create':
          if (!confirm('¿Desea guardar la información?')) {
            return;
          }
          this.saveProductAsync(this.product);
        break;
      case 'update':
        if (!confirm('¿Desea guardar la información?')) {
          return;
        }
        this.updateProductAsync(this.product);
        break;
      case 'delete':
          if (!confirm('¿Desea eliminar el producto?')) {
            return;
          }
          this.deleteProductAsync(this.product);
          break;
      default:
        break;
    }
  }

  async saveProductAsync(product: Product) {
    try {
      const response = await this.productService.saveProductAsync(product);
      if (!response.success) {
        alert(response.message);
        return;
      }
      this.router.navigate(['product-list']);
    } catch (error) {
      alert(error.message);
    }
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams
      .pipe(
        tap(m => this.setOperation(m.action, m.id))
        )
      .subscribe();
  }

  setOperation(action: string, id: number) {
    this.action = action;
    this.id = id;
    switch (action) {
      case 'create':
        this.addProduct();
        break;
      case 'update':
        this.updateProduct(id);
        break;
        case 'delete':
          this.updateProduct(id);
          break;
      default:
        break;
    }
  }

  async updateProduct(id: number) {
    const existingProduct = await this.findProductById(id);
    this.product = existingProduct;
  }

  async updateProductAsync(product: Product) {
    try {
      const response = await this.productService.updateProductAsync(product);
      if (!response.success) {
        alert(response.message);
        return;
      }
      this.router.navigate(['product-list']);
    } catch (error) {
      alert(error.message);
    }
  }

  validateProduct(product: Product) {
    if (!product) {
      alert('El producto está vacío.');
      return;
    }
    if (product.name) {
      if (product.name.length > 50) {
        alert('El nombre del producto debe contener entre 1 y 50 caracteres.');
        return;
      }
    } else {
      alert('El nombre del producto es requerido.');
      return;
    }
    if (product.description) {
      if (product.description.length > 100) {
        alert('La descripción del producto debe contener entre 1 y 100 caracteres.');
        return;
      }
    }
    if (product.minimumAge) {
      if (!(product.minimumAge > -1 && product.minimumAge < 101)) {
        alert('La restricción de edad debe estar entre 0 y 100.');
        return;
      }
    }
    if (product.company) {
      if (product.company.length > 50) {
        alert('La compañía del producto debe contener entre 1 y 50 caracteres.');
        return;
      }
    } else {
      alert('La compañia del producto es requerida.');
      return;
    }
    if (product.price) {
      if (!(product.price > 0 && product.price < 1001)) {
        alert('El precio del producto debe estar entre 1 y 1000.');
        return;
      }
    } else {
      alert('El precio del producto es requerido.');
      return;
    }
  }
}
