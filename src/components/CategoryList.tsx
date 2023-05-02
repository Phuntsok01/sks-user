import {
  Box,
  Text,
  Heading,
  SimpleGrid,
} from "@chakra-ui/react";

import { CategoryCard1 } from "./CategoryCard";
import { useGetAllCategoryQuery } from "../app/categoryApiSlice";

const CategoryList = () => {
  const { data, isLoading } = useGetAllCategoryQuery(null);
  return (
    <Box p={"1.5rem"}>
      <Text fontWeight={600}>Welcome to SKS</Text>
      <Heading mb={"1rem"}>Choose Category</Heading>
      <SimpleGrid columns={2} spacing={"1rem"}>
        {data?.map((category) => (
          <CategoryCard1 key={category.id} category={category} />
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default CategoryList;
