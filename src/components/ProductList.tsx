import { useGetAllProductQuery } from "../app/productApiSlice";
import { products as staticProducts } from "../data";
import ProductCard from "./ProductCard";
import { Grid, Skeleton } from "@chakra-ui/react";
import { useMemo } from "react";

type productListProp = {
  searchValue: string;
};
const ProductList: React.FC<productListProp> = ({ searchValue }) => {
  const { data, isLoading } = useGetAllProductQuery(null);
  const products = useMemo(() => {
    if (!data) {
      return [];
    }
    if (searchValue) {
      return data.filter((product) =>
        product.name.toLowerCase().includes(searchValue.toLowerCase())
      );
    } else {
      return data;
    }
  }, [searchValue]);
  return (
    <Grid
      width={`100%`}
      gap={"2rem"}
      padding={"1rem"}
      gridTemplateColumns={[
        "repeat(1,1fr)",
        "repeat(2,1fr)",
        "repeat(3,1fr)",
        "repeat(4,1fr)",
        "repeat(4,1fr)",
      ]}
    >
      {isLoading && <Skeleton width={"200px"} />}
      {data?.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </Grid>
  );
};

export default ProductList;
