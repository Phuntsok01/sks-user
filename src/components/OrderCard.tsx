import {
  HStack,
  IconButton,
  VStack,
  chakra,
  Box,
  Image,
  Tag,
} from "@chakra-ui/react";
import { Box2, Clock, Trash } from "iconsax-react";
import { OrderData } from "../@types";
import { Link } from "react-router-dom";
import { BsCheck } from "react-icons/bs";
import {
  useAcceptOrderMutation,
  useDeleteOrderMutation,
} from "../app/orderApiSlice";
import { getTimeDifferenceInMinutes } from "../utils/timeHelpers";
import useTimeTickerHook from "../hooks/useTimeTicker";
import { useEffect } from "react";

export const OrderDetails = ({ order }: { order: OrderData }) => {
  const timeAlreadyElapsed = getTimeDifferenceInMinutes(order.updatedAt);
  const { timeRemaining } = useTimeTickerHook(
    order.status === "confirmed",
    order.time ? Math.max(0, order.time - timeAlreadyElapsed) : 0
  );
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
          src={order.product.image}
          alt={"Yomari"}
          objectFit={"cover"}
          width={"100%"}
          height={"100%"}
        />
      </Box>
      <VStack width={"100%"} align={"flex-start"}>
        <HStack width={"full"} justify={"space-between"} align={"center"}>
          <Link to={`/product/${order.product.id}`}>
            <chakra.h1 fontSize={"md"} fontWeight={"bold"}>
              {order.product.name}
            </chakra.h1>
          </Link>
          <HStack>
            <Box color={"green.500"}>
              <Box2 size={"20px"} />
            </Box>
            <Tag
              size={"sm"}
              fontWeight={"bold"}
              colorScheme={
                order.status === "pending"
                  ? "orange"
                  : order.status === "acknowledged"
                  ? "blue"
                  : order.status === "confirmed"
                  ? "gray"
                  : "green"
              }
            >
              {order.status.toUpperCase()}
            </Tag>
          </HStack>
        </HStack>
        <HStack w={"100%"}>
          <chakra.p
            marginTop={"-15px"}
            lineHeight={"0.9rem"}
            fontSize={"xs"}
            w={"100%"}
          >
            Quantity: {order.quantity}
          </chakra.p>
          {order.status !== "pending" && order.status !== "completed" && (
            <chakra.span
              w={"100%"}
              maxW={"fit-content"}
              fontWeight={"semibold"}
              fontSize={"md"}
              textAlign={"right"}
            >
              <Tag colorScheme="purple" alignItems={"center"} gap={"2px"}>
                <Clock size={16} />
                <chakra.span mt={"2px"}>{`${
                  order.status === "acknowledged" ? order.time : timeRemaining
                }m`}</chakra.span>
              </Tag>
            </chakra.span>
          )}
        </HStack>
      </VStack>
    </HStack>
  );
};

export const OrderCard = ({ order }: { order: OrderData }) => {
  const [acceptOrder, { isLoading: isAccepting }] = useAcceptOrderMutation();
  const [deleteOrder, { isLoading: isDeleting }] = useDeleteOrderMutation();
  return (
    <HStack width={"100%"} maxW={"800px"} alignItems={"center"} px={"0.5rem"}>
      <OrderDetails order={order} />
      {order.status === "acknowledged" && (
        <VStack>
          <IconButton
            aria-label="Confirm"
            size={"sm"}
            colorScheme="green"
            icon={<BsCheck size={24} />}
            isLoading={isAccepting}
            onClick={() => {
              acceptOrder({ id: order.id });
            }}
          />
          <IconButton
            aria-label="Delete"
            colorScheme="red"
            size={"sm"}
            isLoading={isDeleting}
            icon={<Trash size={16} />}
            onClick={() => {
              deleteOrder({ id: order.id });
            }}
          />
        </VStack>
      )}
    </HStack>
  );
};
