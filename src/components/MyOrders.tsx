import React from "react";
import { useGetMyOrdersQuery } from "../app/orderApiSlice";

const MyOrders = () => {
  const { data } = useGetMyOrdersQuery(null);
  return (
    <ul>
      {data?.map((order) => (
        <li key={order.id}>
          {order.product.name} - {order.quantity}
        </li>
      ))}
    </ul>
  );
};

export default MyOrders;
