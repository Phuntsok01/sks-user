import {
  HStack,
  IconButton,
  VStack,
  chakra,
  Box,
  Image,
} from "@chakra-ui/react";
import { Additem, ArrowDown3, ArrowUp3, Box2 } from "iconsax-react";
import { useMemo, useState } from "react";
import { Product } from "../@types";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/store";
import { addProduct, removeProduct, selectCartState } from "../app/cartSlice";

const Updator = ({ product }: { product: Product }) => {
  const [count, setCount] = useState(0);
  const dispatch = useAppDispatch();
  const cartState = useAppSelector(selectCartState);
  const productStatus = useMemo(
    () =>
      cartState.products.find((prod) => prod.product.id === product.id) || {
        product,
        quantity: 0,
        cost: 0,
      },
    [cartState]
  );
  if (productStatus.quantity === 0) {
    return (
      <VStack maxW={"80px"} height={"fit-content"}>
        <IconButton
          variant={"ghost"}
          aria-label="Search"
          color={"green"}
          _focus={{ backgroundColor: "transparent" }}
          icon={<Additem size="24" />}
          transition="0.2s ease-out"
          height={"fit-content"}
          onClick={() => dispatch(addProduct({ product, quantity: 1 }))}
          _active={{
            transform: "translateY(-3px)",
            textShadow: "1px 0px 10px rgba(0, 0, 0, 0.2)",
          }}
        />
      </VStack>
    );
  }
  return (
    <VStack maxW={"80px"} height={"fit-content"}>
      <IconButton
        variant={"ghost"}
        aria-label="Search"
        color={"green"}
        _focus={{ backgroundColor: "transparent" }}
        icon={<ArrowUp3 size="24" />}
        transition="0.2s ease-out"
        height={"fit-content"}
        _active={{
          transform: "translateY(-3px)",
          textShadow: "1px 0px 10px rgba(0, 0, 0, 0.2)",
        }}
        onClick={() => dispatch(addProduct({ product, quantity: 1 }))}
      />
      <chakra.span mt={"0 !important"}>{productStatus.quantity}</chakra.span>
      <IconButton
        variant={"ghost"}
        aria-label="Search"
        color={"red"}
        mt={"0 !important"}
        height={"fit-content"}
        _focus={{ backgroundColor: "transparent" }}
        icon={<ArrowDown3 size="24" />}
        transition="0.2s ease-out"
        _active={{
          transform: "translateY(3px)",
        }}
        onClick={() => dispatch(removeProduct({ product, quantity: 1 }))}
      />
    </VStack>
  );
};

export const ProductDetails = ({ product }: { product: Product }) => {
  return (
    <HStack
      width={"full"}
      align={"center"}
      justify={"start"}
      backgroundColor={"white"}
      p={"1rem"}
      borderRadius={"16px"}
      gap={"6px"}
      boxShadow={"0px 2px 15px rgba(0, 0, 0, 0.05)"}
    >
      <Box
        height={"50px"}
        width={"100%"}
        maxW={"50px"}
        borderRadius={"6px"}
        overflow={"hidden"}
      >
        <Image
          src={product.image}
          alt={"Yomari"}
          objectFit={"cover"}
          width={"100%"}
          height={"100%"}
        />
      </Box>
      <VStack width={"100%"} align={"flex-start"}>
        <HStack width={"full"} justify={"space-between"} align={"center"}>
          <Link to={`/product/${product.id}`}>
            <chakra.h1 fontSize={"md"} fontWeight={"bold"}>
              {product.name}
            </chakra.h1>
          </Link>
          <Box color={"green.500"}>
            <Box2 size={"20px"} />
          </Box>
        </HStack>
        <HStack w={"100%"}>
          <chakra.p
            marginTop={"-15px"}
            lineHeight={"0.9rem"}
            fontSize={"xs"}
            w={"100%"}
            noOfLines={1}
          >
            {product.description}
          </chakra.p>
          <chakra.span
            w={"100%"}
            maxW={"fit-content"}
            fontWeight={"semibold"}
            fontSize={"md"}
            textAlign={"right"}
          >
            Rs. {product.price}
          </chakra.span>
        </HStack>
      </VStack>
    </HStack>
  );
};

export const ProductCard = ({ product }: { product: Product }) => {
  return (
    <HStack width={"100%"} maxW={"800px"} alignItems={"center"}>
      <ProductDetails product={product} />
      <Updator product={product} />
    </HStack>
  );
};
