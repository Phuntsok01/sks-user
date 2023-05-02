export interface Table {
  tableNumber: number;
  status: boolean;
  password: string;
}
export interface Product {
  id: number
  name: string
  description: string
  category?:Category
  image: string
  price: number
}

export interface ProductStatus {
  product: Product
  quantity: number
  cost: number
}
export interface CartState {
  products: ProductStatus[]
  itemCount: number
}

export type Category={
  readonly id?:number;
  name:string;
  image:string;
}

export interface OrderData{
  id: number;
  quantity: number;
  product: Product;
  table: Table;
}