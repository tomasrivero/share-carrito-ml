import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { map } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, HttpClientModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ml-share';

  constructor(private http: HttpClient, private toastr: ToastrService) {}

  private apiUrl = '/api/product-fe-recommendations/recommendations?site_id=MLA&client=pdp_comparator';
  productLink = '';
  productList: any[] = [];

  ngOnInit() {
    this.loadProductsFromUrl();
  }

  addProductLink() {
    if (!this.productLink) {
      return;
    }
  
    try {
      let productId = this.extractProductId(this.productLink);
      this.fetchProductData(productId).subscribe(
        (productObject) => {
          this.productList.push(productObject);
          this.updateUrlWithProductIds();
          this.productLink = '';
          this.toastr.success('Producto agregado con éxito');
        },
        () => {
          this.toastr.error('Link invalido! (Estás logeado en ML?)');
        }
      );
    } catch (error) {
      this.toastr.error('Link invalido! (Estás logeado en ML?)');
    }
  }

  private fetchProductData(productId: string) {
    return this.http.get(`${this.apiUrl}&product_id=${productId}`).pipe(
      map((data: any) => {
        const product = data.recommended_products[0];
        return {
          name: product.name,
          price: product.price.value,
          priceFormatted: this.formatPrice(product.price.value, product.price.currency_id),
          img: product.img_url,
          link: this.toMlLink(productId),
          currency: product.price.currency_id
        };
      })
    );
  }

  formatPrice(value: number, currency: string): string {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(value);
  }

  toMlLink(productId: string) {
    return `https://www.mercadolibre.com.ar/p/${productId}`;
  }

  deleteEntry(index: number) {
    this.productList.splice(index, 1);
    this.updateUrlWithProductIds();
  }

  getTotal() {
    return this.productList.reduce((acc, product) => acc + product.price, 0);
  }

  private extractProductId(productLink: string): string {
    return productLink.split('p/')[1].split('?')[0].split('#')[0];
  }

  private updateUrlWithProductIds() {
    const productIds = this.productList.map(product => this.extractProductId(product.link));
    const url = new URL(window.location.href);
    url.searchParams.set('products', productIds.join(','));
    window.history.replaceState({}, '', url.toString());
  }


  private loadProductsFromUrl() {
    const url = new URL(window.location.href);
    const productIds = url.searchParams.get('products');
    if (productIds) {
      const idsArray = productIds.split(',');
      idsArray.forEach(productId => {
        this.fetchProductData(productId).subscribe((productObject) => {
          this.productList.push(productObject);
        });
      });
    }
  }

  getTotalCurrency(){
    if(this.productList.length > 0){
      return this.productList[0].currency;
    }
  }

  copyLink(){
    this.toastr.success('Link copiado al portapapeles');
    navigator.clipboard.writeText(window.location.href)
  }

  
}
