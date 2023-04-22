import React, { ChangeEvent, useRef } from 'react'
import {
  Button,
  chakra,
  Input,
  InputGroup,
  useDisclosure,
} from '@chakra-ui/react'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import CartDrawer from './CartDrawer'
import { useAppSelector } from '../app/store'
import { selectCartItemsCount } from '../app/cartSlice'
type navProps = {
  setSearchValue: React.Dispatch<React.SetStateAction<string>>
}
const Nav: React.FC<navProps> = ({ setSearchValue }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cartBtnRef = useRef<HTMLButtonElement>(null)
  const cartItemsCount = useAppSelector(selectCartItemsCount);
  return (
    <>
      <chakra.nav
        width={'full'}  
        borderRadius={'10px'}
        minH={'50px'}
        alignItems={'center'}
        boxShadow={'0px 4px 15px rgba(0, 0, 0, 0.2)'}
        maxW={'1400px'}
        margin={'0 auto'}
        display={'flex'}
        justifyContent={'flex-end'}
        p={'0.5rem 1rem'}
        gap={'1rem'}
      >
        <InputGroup maxW={'300px'}>
          <Input
            pr='4.5rem'
            placeholder='Type to search...'
            onChange={(e: ChangeEvent) => {
              if (e.target instanceof HTMLInputElement) {
                setSearchValue(e.target.value)
              }
            }}
          />
          {/* <InputRightElement>
            <IconButton
              colorScheme={'green'}
              aria-label='Search database'
              icon={<AiOutlineSearch />}
            />
          </InputRightElement> */}
        </InputGroup>
        <Button
          display={'flex'}
          ref={cartBtnRef}
          onClick={onOpen}
          alignItems={'center'}
          justifyContent={'center'}
          type={'button'}
          colorScheme={'green'}
          variant={'ghost'}
        >
          <chakra.span
            height={'20px'}
            width={'20px'}
            borderRadius={'50%'}
            background={'green.700'}
            color={'white'}
            display={'flex'}
            alignItems={'center'}
            justifyContent={'center'}
            fontSize={'0.8rem'}
            position={'absolute'}
            top={'-5px'}
            right={'-2px'}
          >
            {cartItemsCount}
          </chakra.span>
          <AiOutlineShoppingCart />
        </Button>
      </chakra.nav>
      <CartDrawer
        cartBtnRef={cartBtnRef}
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
      />
    </>
  )
}

export default Nav
