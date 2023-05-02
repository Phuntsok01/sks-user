import { Box, Button, Heading, HStack, SimpleGrid, Skeleton } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useGetProductByCategoryIdQuery } from "../app/productApiSlice";
import ProductCard from "./ProductCard";

const ProductByCategory = () => {
  const { id } = useParams();
  const { data,isLoading } = useGetProductByCategoryIdQuery({ categoryId: id });
  console.log(data);
  return (
    <Box>
      {isLoading && (
        <SimpleGrid columns={3} spacing={10}>
          <Skeleton height="250px" />
          <Skeleton height="250px" />
          <Skeleton height="250px" />
          <Skeleton height="250px" />
        </SimpleGrid>
      )}
      <SimpleGrid
        columns={[1, 2, 2, 3, 4]}
        spacing={10}
        mt={"2rem"}
        placeItems={"flex-start"}
      >
        {data?.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </SimpleGrid>
    </Box>
  )
};

export default ProductByCategory;
