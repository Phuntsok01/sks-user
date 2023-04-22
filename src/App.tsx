import { Box, ChakraProvider } from '@chakra-ui/react'
import ProductList from './components/ProductList'

import { extendTheme } from '@chakra-ui/react'
import Nav from './components/Nav'
import { useState } from 'react'
import { Provider } from 'react-redux'
import { store } from './app/store'

const theme = extendTheme({
  fonts: {
    heading: `'Nunito', sans-serif`,
    body: `'Nunito', sans-serif`,
  },
})

const App = () => {
  const [searchValue, setSearchValue] = useState('')
  return (
    <ChakraProvider theme={theme}>
      <Provider store={store}>
        <Nav setSearchValue={setSearchValue} />
        <Box maxW={'1440px'} margin={'0 auto'} width={'100%'}>
          <ProductList searchValue={searchValue} />
        </Box>
        </Provider>
    </ChakraProvider>
  )
}

export default App
