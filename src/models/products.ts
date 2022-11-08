interface Product {
  id: number,
  product_name: string,
  magnified_price: number,
  currency_code: string,
  category_id: number
}

class Products {
  create(arg0: { productName: string; category: string; price: number; currency: string; }): any {
    throw new Error("Method not implemented.");
  }

  show(arg0: number): any {
    throw new Error("Method not implemented.");
  }
  
  index(): any {
    throw new Error("Method not implemented.");
  }
}

export default Products;
export {Product, Products};