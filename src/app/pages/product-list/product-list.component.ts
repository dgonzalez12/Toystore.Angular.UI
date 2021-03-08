import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product, ProductService } from 'src/app/libs/products';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  products: Product[];
  
  constructor(
    private productService: ProductService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {

  }

  findAllProducts() {
    this.productService.findAllProducts().subscribe(r =>
      {
        if (!r.success) {
          alert(r.message);
        } else {
          this.products = r.obj;
        }
      },
      err =>
      {
        alert(err.message);
      });
  }

  newProductButton_Click() {
    this.router.navigate(['/product-detail'], { relativeTo: this.activatedRoute , queryParams: { action: 'create', id: 0 } });
  }

  ngOnInit(): void {
    this.findAllProducts();
  }

  updateProductButton_Click(id: number) {
    this.router.navigate(['/product-detail'], { relativeTo: this.activatedRoute , queryParams: { action: 'update', id: id } });
  }

  deleteProductButton_Click(id: number) {
    this.router.navigate(['/product-detail'], { relativeTo: this.activatedRoute , queryParams: { action: 'delete', id: id } });
  }
}
