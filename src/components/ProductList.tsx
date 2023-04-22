import { products as staticProducts } from '../data'
import ProductCard from './ProductCard'
import { Grid } from '@chakra-ui/react'
import { useMemo } from 'react'

type productListProp = {
  searchValue: string
}
const ProductList: React.FC<productListProp> = ({ searchValue }) => {
  const products = useMemo(() => {
    if (searchValue) {
      return staticProducts.filter((product) =>
        product.name.toLowerCase().includes(searchValue.toLowerCase())
      )
    } else {
      return staticProducts
    }
  }, [searchValue])
  return (
    <Grid
      width={`100%`}
      gap={'2rem'}
      padding={'1rem'}
      gridTemplateColumns={[
        'repeat(1,1fr)',
        'repeat(2,1fr)',
        'repeat(3,1fr)',
        'repeat(4,1fr)',
        'repeat(4,1fr)',
      ]}
    >
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </Grid>
  )
}

export default ProductList
