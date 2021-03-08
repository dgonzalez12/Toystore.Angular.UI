import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { Product } from './product';
import { ProductResponse } from './product.response';

@Injectable({ providedIn: 'root' })
export class ProductService {

    readonly baseUrl: string = 'http://localhost:2272/api/products';

    constructor(private httpClient: HttpClient) {

    }

    async deleteProductAsync(product: Product) {
        return this.httpClient.delete<ProductResponse<boolean>>(
            `${this.baseUrl}/${ product.id }`,
            {
                headers: new HttpHeaders({
                    'Content-Type': 'application/json'
                })
            }
        )
        .toPromise();
    }

    findAllProducts(): Observable<ProductResponse<Product[]>> {
        return this.httpClient.get<ProductResponse<Product[]>>(
            `${ this.baseUrl }`,
            {
                headers: new HttpHeaders ({
                    'Content-Type': 'application/json'
                })
            }
        );
    }

    async FindProductById(id: number) {
        return this.httpClient.get<ProductResponse<Product>>(
            `${this.baseUrl}/${ id }`,
            {
                headers: new HttpHeaders({
                    'Content-Type': 'application/json'
                })
            }
        )
        .toPromise();
    }

    async saveProductAsync(product: Product) {
        return this.httpClient.post<ProductResponse<Product>>(
            `${this.baseUrl}`,
            JSON.stringify(product),
            {
                headers: new HttpHeaders({
                    'Content-Type': 'application/json'
                })
            }
        )
        .toPromise();
    }

    async updateProductAsync(product: Product) {
        return this.httpClient.put<ProductResponse<Product>>(
            `${this.baseUrl}`,
            JSON.stringify(product),
            {
                headers: new HttpHeaders({
                    'Content-Type': 'application/json'
                })
            }
        )
        .toPromise();
    }
}