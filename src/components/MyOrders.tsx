import {
  Box,
  Button,
  Heading,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Tr,
  Td,
  TableContainer,
  Table,
  TableCaption,
  Thead,
  Th,
  Tbody,
  HStack,
} from "@chakra-ui/react";
import { useGetMyOrdersQuery } from "../app/orderApiSlice";
import { OrderCard } from "./OrderCard";
import { useMemo } from "react";
const MyOrders = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data } = useGetMyOrdersQuery(null, {
    pollingInterval: 10000,
  });
  const totalCost = useMemo(() => {
    let cost = 0;
    if (!data) {
      return 0;
    }
    data.forEach((element) => {
      if (element.status !== "pending" && element.status !== "acknowledged")
        cost += element.quantity * element.product.price;
    });
    return cost;
  }, [data]);
  return (
    <Box p={"1.5rem"}>
      <Text fontWeight={600}>Welcome to SKS</Text>
      <Heading mb={"1rem"}>Order List ({data?.length})</Heading>
      <Box height={"350px"} mb={"1rem"} overflowY={"scroll"} width={"100%"}>
        {data?.map((order) => (
          <OrderCard order={order} key={order.id} />
        ))}
      </Box>
      <Button width={"full"} onClick={onOpen} colorScheme="green">
        View my bill
      </Button>
      <Modal size={"full"} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Your bill</ModalHeader>
          <ModalCloseButton />
          <ModalBody maxHeight={"500px"} overflowY={"scroll"}>
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
                  {data
                    ?.filter(
                      (d) =>
                        d.status !== "pending" && d.status !== "acknowledged"
                    )
                    .map((order) => (
                      <Tr key={order.id}>
                        <Td>{order.product.name}</Td>
                        <Td>{order.quantity}</Td>
                        <Td>{order.product.price}</Td>
                        <Td>{order.quantity * order.product.price}</Td>
                      </Tr>
                    ))}
                </Tbody>
              </Table>
            </TableContainer>
            <HStack justifyContent={"space-between"}>
              <Text fontSize={"xl"}>Total amount:</Text>
              <Text fontWeight={"bold"}>Rs. {totalCost}</Text>
            </HStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default MyOrders;
