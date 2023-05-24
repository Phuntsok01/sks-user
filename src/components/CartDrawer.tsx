import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Box,
  VStack,
  chakra,
  Heading,
  TableContainer,
  Table,
  TableCaption,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Button,
  HStack,
  Input,
  useToast,
} from "@chakra-ui/react";
import { ChangeEvent, useMemo, useState } from "react";
import { AiOutlineDelete, AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import BillSplit from "./BillSplit";
import { AnimatePresence, motion } from "framer-motion";
import NoOfPeopleSelector from "./NoOfPeopleSelector";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../app/store";
import {
  addProduct,
  clearCart,
  removeProduct,
  selectCartItems,
} from "../app/cartSlice";
import { useRequestOrderMutation } from "../app/orderApiSlice";

type CartDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
  cartBtnRef: React.RefObject<HTMLButtonElement>;
};

export type orderDto = {
  product: number;
  quantity: number;
};

const CartDrawer = ({
  isOpen,
  onOpen,
  onClose,
  cartBtnRef,
}: CartDrawerProps) => {
  const dispatch = useDispatch();
  const cartState = useAppSelector(selectCartItems);
  const [noOfPeople, setNoOfPeople] = useState(1);
  const totalCost = useMemo(() => {
    let cost = 0;
    cartState.forEach((prod) => {
      cost += prod.cost;
    });
    return cost;
  }, [cartState]);

  const [requestOrder, { isLoading }] = useRequestOrderMutation();

  const toast = useToast();
  const handleOrderRequest = () => {
    console.log(cartState);
    const orders: orderDto[] = [];
    cartState.forEach((cartItem) => {
      orders.push({
        quantity: cartItem.quantity,
        product: cartItem.product.id,
      });
    });
    console.log(orders);
    requestOrder(orders)
      .unwrap()
      .then((res) => {
        console.log(res);
        toast({
          title: "Sucess",
          description: "Order Request Send Successfully",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top-right",
        });

        dispatch(clearCart());
      })
      .catch((err) => {
        console.log(err);
        toast({
          title: "Error",
          description: "Order Request  Failed",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top-right",
        });
      });
  };

  return (
    <Box width={"100%"}>
      <Drawer
        autoFocus={true}
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        size={["full", "full", "md", "lg", "lg"]}
      >
        <DrawerOverlay />
        <DrawerContent width={"100%"}>
          <HStack
            alignItems={"center"}
            justifyContent={"center"}
            width={"100%"}
          >
            <DrawerHeader flex={1} display={"block"} width={"100%"}>
              My Cart
            </DrawerHeader>
            <DrawerCloseButton position={"relative"} />
          </HStack>

          <DrawerBody pb={"3rem"}>
            <Box padding={["0.5", "1rem"]} width={`100%`}>
              <VStack width={"100%"} margin={"0 auto"}>
                <TableContainer>
                  <Table fontFamily={`'Nunito', sans-serif`}>
                    <TableCaption>All cost totaled!</TableCaption>
                    <Thead>
                      <Tr>
                        <Th>Name</Th>
                        <Th>Price</Th>
                        <Th>Quantity</Th>
                        <Th>Total Cost</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      <AnimatePresence initial={false}>
                        {cartState.length === 0 && (
                          <motion.tr
                            initial={{
                              x: 50,
                              opacity: 0,
                            }}
                            animate={{
                              x: 0,
                              opacity: 1,
                            }}
                            transition={{
                              duration: 0.5,
                              delay: 0.1,
                            }}
                          >
                            <Td></Td>
                            <Td></Td>
                            <Td>No products in cart</Td>
                            <Td></Td>
                          </motion.tr>
                        )}
                      </AnimatePresence>
                      <AnimatePresence>
                        {cartState.map((prod) => (
                          <motion.tr
                            key={prod.product.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                              duration: 0.5,
                            }}
                            exit={{ opacity: 0, x: -20 }}
                          >
                            <Td>{prod.product.name}</Td>
                            <Td>{prod.product.price}</Td>
                            <Td
                              display={"flex"}
                              alignItems={"center"}
                              gap={"5px"}
                            >
                              <Button
                                onClick={() =>
                                  dispatch(
                                    removeProduct({
                                      product: prod.product,
                                      quantity: 1,
                                    })
                                  )
                                }
                                variant={"outline"}
                                colorScheme={"red"}
                                size={"xs"}
                                fill={"transparent"}
                                aria-label="Decrement"
                              >
                                {prod.quantity === 1 ? (
                                  <AiOutlineDelete />
                                ) : (
                                  <AiOutlineMinus />
                                )}
                              </Button>

                              <chakra.p>{prod.quantity}</chakra.p>
                              <Button
                                onClick={() =>
                                  dispatch(
                                    removeProduct({
                                      product: prod.product,
                                      quantity: 1,
                                    })
                                  )
                                }
                                size={"xs"}
                                variant={"outline"}
                                colorScheme={"green"}
                                aria-label="Increment"
                              >
                                <AiOutlinePlus />
                              </Button>
                            </Td>
                            <Td>{prod.cost}</Td>
                          </motion.tr>
                        ))}
                      </AnimatePresence>
                    </Tbody>
                    <AnimatePresence>
                      {cartState.length > 0 && (
                        <motion.tfoot
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{
                            duration: 0.5,
                          }}
                          exit={{ opacity: 0, x: -20 }}
                        >
                          <Tr>
                            <Th>Grand Total</Th>
                            <Th></Th>
                            <Th></Th>
                            <Th fontSize={"1rem"}>Rs. {totalCost}</Th>
                          </Tr>
                        </motion.tfoot>
                      )}
                    </AnimatePresence>
                  </Table>
                </TableContainer>
                {cartState.length > 0 && (
                  <VStack width={`full`} gap={"0.5rem"}>
                    <Heading as={"h2"} fontWeight={"300"} marginTop={"1rem"}>
                      Split Your Bills
                    </Heading>
                    <NoOfPeopleSelector
                      noOfPeople={noOfPeople}
                      setNoOfPeople={setNoOfPeople}
                    />
                    <HStack gap={"0.5rem"}>
                      <chakra.label htmlFor={"noOfPeople"}>
                        No. of People:
                      </chakra.label>
                      <Input
                        id={"noOfPeople"}
                        name={"noOfPeople"}
                        value={noOfPeople}
                        width={`65px`}
                        type={"number"}
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                          setNoOfPeople(parseInt(e.target.value))
                        }
                      />
                    </HStack>
                    <BillSplit grandTotal={totalCost} noOfPeople={noOfPeople} />
                  </VStack>
                )}
              </VStack>
            </Box>
            <Button
              marginTop={"30px"}
              display={"flex"}
              alignItems={"center"}
              justifyContent={"center"}
              padding={["0.5rem 1rem", "1.5rem"]}
              width={"100%"}
              fontSize={"1.2rem"}
              borderRadius={"6px"}
              fontWeight={"bold"}
              colorScheme={"whatsapp"}
              isLoading={isLoading}
              loadingText={"Placing your order request"}
              onClick={handleOrderRequest}
            >
              Place Order
            </Button>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};
export default CartDrawer;
