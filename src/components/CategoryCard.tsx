import {
  Box,
  Center,
  useColorModeValue,
  Heading,
  Text,
  Stack,
  Image,
  Button,
  useDisclosure,
  AspectRatio,
  Flex,
} from "@chakra-ui/react";
import { FC } from "react";
import { BsEye, BsPencil, BsTrash } from "react-icons/bs";
import { Link } from "react-router-dom";
import { Category } from "../@types";


export const CategoryCard1 = ({ category }: { category: Category }) => {
  return (
    <AspectRatio
      ratio={1 / 1}
      backgroundImage={`url(${category.image})`}
      backgroundSize={"cover"}
      borderRadius={"md"}
      overflow={"hidden"}
      as={Link}
      to={`category/${category.id}`}
    >
      <Flex
        height={"100%"}
        flexDir={"column"}
        alignItems={"flex-end !important"}
        justifyContent={"flex-end !important"}
        p={"0.5rem"}
        pr={"0.8rem"}
        background={`linear-gradient(
          to bottom,
          rgba(0, 0, 0, 0) 0%,
          rgba(0, 0, 0, 0.85) 100%
          )`}
      >
        <Heading size={"lg"} color={"white"}>
          {category.name}
        </Heading>
      </Flex>
    </AspectRatio>
  );
};
