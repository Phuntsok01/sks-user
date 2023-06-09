import {
  chakra,
  Box,
  Button,
  IconButton,
  useDisclosure,
} from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../app/store";
import { selectCartItemsCount } from "../../app/cartSlice";
import CartDrawer from "../CartDrawer";
import { Footer } from "./Footer";
import { logoutSelf } from "../../app/authSlice";
import { useLogoutTableMutation } from "../../app/tableApiSlice";

const MainLayout = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cartBtnRef = useRef<HTMLButtonElement>(null);
  const cartItemsCount = useAppSelector(selectCartItemsCount);
  const dispatch = useAppDispatch();
  const [logout, { isLoading }] = useLogoutTableMutation();

  const handleLogout = () => {
    logout(null)
      .unwrap()
      .then(() => {
        dispatch(logoutSelf());
      })
      .catch((e) => console.log(e));
  };

  return (
    <Box position={"relative"}>
      <Button
        colorScheme="red"
        variant={"outline"}
        float={"right"}
        m={"1rem"}
        size={"sm"}
        onClick={handleLogout}
        isLoading={isLoading}
      >
        Logout
      </Button>
      <Button
        position={"fixed"}
        bottom={"90px"}
        zIndex={10}
        right={"5%"}
        height={"fit-content"}
        width={"fit-content"}
        rounded={"full"}
        size={"lg"}
        backgroundColor={"white"}
        color={"whatsapp.500"}
        aria-label="Your cart"
        boxShadow={"lg"}
        onClick={onOpen}
        p={0}
      >
        <Box
          height={"60px"}
          width={"60px"}
          position={"relative"}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <FaShoppingCart size={24} />
          <chakra.span position={"absolute"} right={"1"} top={"2"}>
            {cartItemsCount}
          </chakra.span>
        </Box>
      </Button>
      <Outlet />
      <CartDrawer
        isOpen={isOpen}
        onClose={onClose}
        onOpen={onOpen}
        cartBtnRef={cartBtnRef}
      />
      <Footer />
    </Box>
  );
};

export default MainLayout;
