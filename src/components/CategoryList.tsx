import { Box, Button, Heading, HStack, SimpleGrid, Skeleton } from "@chakra-ui/react";
import { Link } from "react-router-dom";

import CategoryCard from "./CategoryCard";
import { useGetAllCategoryQuery } from "../app/categoryApiSlice";


const CategoryList = () => {
  const { data, isLoading } = useGetAllCategoryQuery(null);
  return (
    <Box>
      <SimpleGrid columns={3} spacing={10} mt={"1rem"}>
        {data?.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default CategoryList;
