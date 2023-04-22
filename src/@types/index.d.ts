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
