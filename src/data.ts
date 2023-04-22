import { IProduct } from './@types'

export const products: IProduct[] = [
  {
    id: 1,
    name: 'Chicken Chowmin',
    description: 'Chicken Chowmin that will make you cry!',
    imageSrc:
      'https://i0.wp.com/recipenp.com/wp-content/uploads/2020/03/Chicken-Chowmein-1.jpg?resize=676%2C1014&ssl=1',
    price: 210,
  },
  {
    id: 2,
    name: 'Product 2',
    description: 'This is product 2',
    imageSrc: 'https://picsum.photos/200/300',
    price: 20,
  },
  {
    id: 3,
    name: 'Product 3',
    description: 'This is product 3',
    imageSrc: 'https://picsum.photos/200/300',
    price: 30,
  },
]
