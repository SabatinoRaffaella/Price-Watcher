import type { Product } from "./Product";

export class Watchlist {
  private products: Product[] = [];

  add (product: Product): void{
    this.products.push(product);
  }

  remove (productId: string): void{
    this.products = this.products.filter(
      product => product.id!==productId 
    );
  }

  get(productId: string): Product | undefined{
    return this.products.find(
      product => product.id===productId
    )
  };

  getAll(): Product[]{
    return this.products;
  }

  clear(): void{
    this.products = [];
  }

  getSize(): number{
    return this.products.length;
  }

}