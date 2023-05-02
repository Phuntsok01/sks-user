import { Box, HStack, chakra, Button } from "@chakra-ui/react";
import {
    Box1,
  Category,
  Hashtag,
  Home2,
  SearchNormal1,
  ShoppingCart,
} from "iconsax-react";
import { PropsWithChildren, ReactElement } from "react";
import { Link, useLocation } from "react-router-dom";
import { MoneyChange } from "iconsax-react";
const navItems: INavItemProps[] = [
  {
    label: "Categories",
    href: "/",
    icon: <Category />,
  },
  {
    label: "Products",
    href: "/product",
    icon: <Box1/>,
  },
  {
    label: "Search",
    href: "/search",
    icon: <SearchNormal1 />,
  },
  {
    label: "Orders",
    href: "/orders",
    icon: <MoneyChange />,
  },
];

interface INavItemProps extends PropsWithChildren {
  label: string;
  href: string;
  icon: ReactElement<any>;
  hasChildren?: boolean;
  isActive?: boolean;
}

const NavItem: React.FC<INavItemProps> = ({
  label,
  href,
  icon,
  isActive,
  hasChildren,
  children,
}) => {
  return (
    <Box>
      <Link to={href}>
        <Button
          variant={"ghost"}
          aria-label={label}
          _focus={{
            backgroundColor: isActive ? "black" : "transparent",
          }}
          leftIcon={icon}
          fontWeight={"light"}
          marginInlineEnd={"0 !important"}
          marginInlineStart={"0 !important"}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          backgroundColor={isActive ? "black" : "transparent"}
          color={isActive ? "white" : "black"}
          borderRadius={"16px"}
          padding={"0.5rem 0.7rem"}
          fontSize={"sm"}
          transition={"all 0.2s ease-in-out"}
          boxShadow={isActive ? "0px 2px 2px rgba(0,0,0,0.1)" : "none"}
        >
          {hasChildren && children}
          {isActive && label}
        </Button>
      </Link>
    </Box>
  );
};
export const Footer = () => {
  const location = useLocation();
  return (
    <HStack
      position={"fixed"}
      bottom={"20px"}
      zIndex={20}
      transform={"translateX(5%)"}
      width={"90vw"}
      height={"60px"}
      color={"black"}
      boxShadow={
        "0px -2px 8px rgba(0 0 0 / 0.2), 0px 2px 8px rgba(0 0 0 / 0.2)"
      }
      margin={`0 auto`}
      borderRadius={"2xl"}
      padding={"0.5rem 0.8rem"}
      bg={"white"}
    >
      <HStack width={"100%"} justifyContent={"space-between"}>
        {navItems.map((item, index) => {
          const isActive = location.pathname === item.href;
          if (item.label === "Cart") {
            return (
              <NavItem
                {...item}
                key={index}
                hasChildren={true}
                isActive={isActive}
              >
                <chakra.span
                  display={"flex"}
                  position={"absolute"}
                  alignItems={"center"}
                  justifyContent={"center"}
                  top={"0"}
                  right={"0"}
                  backgroundColor={isActive ? "white" : "brand.500"}
                  padding={"0.1rem 0.2rem"}
                  zIndex={20}
                  height={"16px"}
                  width={"16px"}
                  rounded={"full"}
                  fontSize={"xs"}
                  boxShadow={"0px 2px 10px rgba(0, 0, 0, 0.2)"}
                  color={isActive ? "black" : "white"}
                >
                  3
                </chakra.span>
              </NavItem>
            );
          }
          return <NavItem {...item} isActive={isActive} key={index} />;
        })}
      </HStack>
    </HStack>
  );
};
