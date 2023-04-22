export interface Product {
  id: number
  name: string
  description: string
  imageSrc: string
  price: number
}

export interface ProductStatusAction {
  type: 'INCREMENT_QUANTITY' | 'DECREMENT_QUANTITY'
  payload: {
    product: Product
    quantity?: number
  }
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
