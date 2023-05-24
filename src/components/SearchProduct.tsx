import {
  Box,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Skeleton,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useGetAllProductQuery } from "../app/productApiSlice";
import { ProductCard } from "./ProductCard";
import { SearchNormal1 } from "iconsax-react";
import { useState, useMemo } from "react";

const SearchProduct = () => {
  const { data, isLoading } = useGetAllProductQuery(null);
  const [searchValue, setSearchValue] = useState("");
  const filteredData = useMemo(() => {
    if (!searchValue) {
      return data;
    }
    return data?.filter((order) =>
      order.name.toLowerCase().includes(searchValue.toLowerCase())
    );
  }, [searchValue, data]);

  return (
    <Box p={"1.5rem"} backgroundColor={"gray.50"} minH={"100vh"}>
      <Text fontWeight={600}>Welcome to SKS</Text>
      <Heading>Search Products</Heading>
      <InputGroup
        maxW="md"
        mt="2rem"
        boxShadow={"md"}
        borderRadius={"lg"}
        overflow={"hidden"}
      >
        <InputLeftElement pointerEvents="none">
          <Icon as={SearchNormal1} color="gray.300" />
        </InputLeftElement>
        <Input
          variant={"solid"}
          bgColor={"white"}
          type="text"
          placeholder="Search"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </InputGroup>
      {filteredData?.length === 0 && !isLoading && <Text>No products</Text>}
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
        {filteredData?.slice(0, 3).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </VStack>
    </Box>
  );
};

export default SearchProduct;
