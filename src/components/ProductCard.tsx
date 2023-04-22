import { ChangeEvent, useMemo, useState } from "react";
import { Product } from "../@types";
import { AiOutlineClose, AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import {
  chakra,
  Box,
  Heading,
  VStack,
  HStack,
  Button,
  Divider,
  Image,
  useDisclosure,
  Input,
} from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "../app/store";
import { addProduct, removeProduct, selectCartState } from "../app/cartSlice";

const ProductCard = ({ product }: { product: Product }) => {
  const { isOpen, onToggle } = useDisclosure();
  const dispatch = useAppDispatch();
  const cartState = useAppSelector(selectCartState);
  const [amountToManipulate, setAmountToManipulate] = useState(1);

  const productStatus = useMemo(
    () =>
      cartState.products.find((prod) => prod.product.id === product.id) || {
        product,
        quantity: 0,
        cost: 0,
      },
    [cartState]
  );

  return (
    <VStack
      borderRadius={"15px"}
      alignItems={"baseline"}
      width={"100%"}
      overflow={"hidden"}
      boxShadow={"0px 4px 15px rgba(71,71,71,0.26)"}
      height={"500px"}
    >
      <Box width={"100%"} height={"300px"} overflow={"hidden"}>
        <Image
          src={product.image}
          width={"100%"}
          height={"100%"}
          objectFit={"cover"}
          alt={product.name}
        />
      </Box>

      <VStack
        height={"100%"}
        width={"100%"}
        justifyContent={"space-between"}
        padding={"1.4rem"}
        pt={"0.25rem"}
        alignItems={"baseline"}
      >
        <VStack width={"100%"} justifyContent={"space-between"}>
          <VStack
            width={"100%"}
            zIndex={isOpen ? 3 : 0}
            alignItems={"flex-start"}
          >
            <Heading fontSize={"xl"}>{product.name}</Heading>
            <chakra.p maxW={"80%"}>{product.description}</chakra.p>
          </VStack>
          <HStack
            width={"100%"}
            alignItems={"center"}
            my={"0.5rem"}
            justifyContent={"flex-end"}
          >
            <HStack alignItems={"baseline"}>
              <chakra.span
                color={"green.600"}
                fontWeight={"800"}
                opacity={"0.7"}
                className="currency"
              >
                Rs.{" "}
              </chakra.span>
              <chakra.span
                color={"green.600"}
                fontWeight={"800"}
                fontSize={"2rem"}
              >
                {product.price}
              </chakra.span>
            </HStack>
          </HStack>{" "}
        </VStack>
        {isOpen && (
          <Button
            position={"absolute"}
            zIndex={4}
            right={"1rem"}
            top={"1rem"}
            variant={"link"}
            colorScheme={"blue"}
            onClick={onToggle}
          >
            <AiOutlineClose color={"white"} />
          </Button>
        )}
        <Divider my={"0.5rem"} />
        <VStack width={"100%"} alignItems={"baseline"}>
          <HStack
            width={"100%"}
            alignItems={"baseline"}
            justifyContent={"space-between"}
          >
            <chakra.span opacity={0.8}>Quantity</chakra.span>
            <chakra.span fontWeight={700} fontSize={"1.2rem"}>
              {productStatus.quantity}
            </chakra.span>
          </HStack>

          <HStack
            width={"100%"}
            alignItems={"baseline"}
            justifyContent={"space-between"}
          >
            <chakra.span opacity={0.8}>Cost</chakra.span>
            <chakra.span fontWeight={700} fontSize={"1.2rem"}>
              {productStatus.cost}
            </chakra.span>
          </HStack>

          <HStack
            mt={"auto"}
            width={"100%"}
            justifyContent={"space-around"}
            alignItems={"center"}
            gap={"0.5rem"}
          >
            <Button
              type={"button"}
              colorScheme={"red"}
              variant={"outline"}
              width={"full"}
              borderRadius={"30px"}
              onClick={() =>
                dispatch(
                  removeProduct({ product, quantity: amountToManipulate || 1 })
                )
              }
            >
              <AiOutlineMinus size={"24"} />
            </Button>
            <Input
              type={"number"}
              variant={"flushed"}
              value={amountToManipulate}
              textAlign={"center"}
              min={0}
              onChange={(e: ChangeEvent) => {
                if (e.target instanceof HTMLInputElement) {
                  const newValue = parseInt(e.target.value);
                  if (newValue) {
                    setAmountToManipulate(Math.abs(newValue));
                  } else {
                    setAmountToManipulate(0);
                  }
                }
              }}
            />
            <Button
              colorScheme={"green"}
              width={"full"}
              borderRadius={"30px"}
              onClick={() =>
                dispatch(
                  addProduct({ product, quantity: amountToManipulate || 1 })
                )
              }
            >
              <AiOutlinePlus size={"24"} />
            </Button>
          </HStack>
        </VStack>
      </VStack>
    </VStack>
  );
};
export default ProductCard;
