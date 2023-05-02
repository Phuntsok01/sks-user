import {
    Box,
    Heading,
    SimpleGrid,
    Skeleton,
    Text,
    VStack,
  } from "@chakra-ui/react";
  import { useParams } from "react-router-dom";
  import { useGetAllProductQuery, useGetProductByCategoryIdQuery } from "../app/productApiSlice";
  import { ProductCard } from "./ProductCard";
  
  const ProductList = () => {
    const { data, isLoading } = useGetAllProductQuery(null);
    console.log(data);
    return (
      <Box p={"1.5rem"} backgroundColor={"gray.50"} minH={"100vh"}>
        <Text fontWeight={600}>Welcome to SKS</Text>
        <Heading>Products</Heading>
        {isLoading && (
          <VStack spacing={5}>
            <Skeleton height="250px" />
            <Skeleton height="250px" />
            <Skeleton height="250px" />
            <Skeleton height="250px" />
          </VStack>
        )}
        <VStack
          justifyContent={"flex-start"}
          spacing={"1rem"}
          mt={"1rem"}
          placeItems={"flex-start"}
        >
          {data?.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </VStack>
      </Box>
    );
  };
  
  export default ProductList;
  