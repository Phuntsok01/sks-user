import { ChakraProvider } from '@chakra-ui/react'

import { extendTheme } from '@chakra-ui/react'
import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'
import { store } from './app/store'
import router from './router'

const theme = extendTheme({
  fonts: {
    heading: `'Nunito', sans-serif`,
    body: `'Nunito', sans-serif`,
  },
})

const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <Provider store={store}>
        <RouterProvider router={router}/>
      </Provider>
    </ChakraProvider>
  )
}

export default App
