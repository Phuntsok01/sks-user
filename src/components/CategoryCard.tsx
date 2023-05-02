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
} from "@chakra-ui/react";
import { FC } from "react";
import { BsEye, BsPencil, BsTrash } from "react-icons/bs";
import { Link } from "react-router-dom";
import { Category } from "../@types";

const CategoryCard: FC<{ category: Category }> = ({ category }) => {
  return (
    // <Box p={"2rem"} backgroundColor={"white"} borderRadius={"md"} boxShadow={"lg"}>
    //   <Heading>{category.name}</Heading>
    // </Box>
    <Center py={12}>
      <Box
        role={"group"}
        p={6}
        maxW={"330px"}
        w={"full"}
        bg={useColorModeValue("white", "gray.800")}
        boxShadow={"2xl"}
        rounded={"lg"}
        pos={"relative"}
        zIndex={1}
      >
        <Box
          position={"relative"}
          rounded={"lg"}
          mt={-12}
          pos={"relative"}
          height={"230px"}
          _after={{
            transition: "all .3s ease",
            content: '""',
            w: "full",
            h: "full",
            pos: "absolute",
            top: 5,
            left: 0,
            backgroundImage: `url(${category.image})`,
            filter: "blur(15px)",
            zIndex: -1,
          }}
          _groupHover={{
            _after: {
              filter: "blur(20px)",
            },
          }}
        >
          <Image
            rounded={"lg"}
            height={230}
            width={282}
            objectFit={"cover"}
            src={category.image}
          />
        </Box>
        <Stack pt={10} align={"center"}>
          <Text color={"gray.500"} fontSize={"sm"} textTransform={"uppercase"}>
            Category Id: {category.id}
          </Text>
          <Heading fontSize={"2xl"} fontFamily={"body"} fontWeight={500}>
            {category.name}
          </Heading>
          <Button
            colorScheme="blue"
            leftIcon={<BsEye />}
            as={Link}
            to={`/category/${category.id}`}
          >
            View
          </Button>
        </Stack>
      </Box>
    </Center>
  );
};

export default CategoryCard;
