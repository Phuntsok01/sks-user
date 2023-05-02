import { Box } from "@chakra-ui/react";
import { useState } from "react";
import ProductList from "./ProductList";

const ProductPage = () => {
  const [searchValue, setSearchValue] = useState("");
  return (
    <>
      <Box maxW={"1440px"} margin={"0 auto"} width={"100%"}>
        <ProductList searchValue={searchValue} />
      </Box>
    </>
  );
};

export default ProductPage;
