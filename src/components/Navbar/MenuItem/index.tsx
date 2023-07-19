import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { HStack, Text, useTheme } from "@chakra-ui/react";
import { MenuItemProps } from "./types";
import Icon from "../../Base/Icon";

export const MenuItem: React.FC<MenuItemProps> = ({
  icon,
  label,
  onClick,
  route,
}) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const isSelected = route && pathname.endsWith(route || "");

  return (
    <HStack
      w="100%"
      p={"12px 16px"}
      cursor={"pointer"}
      position={"relative"}
      borderLeft={"4px solid"}
      transition={"300ms all"}
      alignItems={"flex-start"}
      background={isSelected ? "Primary.$100" : "transparent"}
      borderColor={isSelected ? "Primary.$200" : "transparent"}
      onClick={() => (onClick ? onClick() : navigate(route || ""))}
    >
      <Icon size={24} name={icon} color={isSelected ? "#3373CC" : "#49504C"} />
      <Text
        ml={"12px !important"}
        fontWeight={600}
        fontSize={"L_sm"}
        color={isSelected ? "Primary.$200" : "Gray.$700"}
      >
        {label}
      </Text>
    </HStack>
  );
};
