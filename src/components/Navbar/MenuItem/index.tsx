import { HStack, Stack, Text, useTheme } from "@chakra-ui/react";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Icon from "../../Base/Icon";
import { MenuItemProps } from "./types";

export const MenuItem: React.FC<MenuItemProps> = ({
  icon,
  label,
  onClick,
  route,
}) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { theme } = useTheme();

  const isSelected = route && pathname.endsWith(route || "");

  return (
    <HStack
      onClick={() => (onClick ? onClick : navigate(route || ""))}
      p={"8px 16px"}
      alignItems={"flex-start"}
      w={"100%"}
      cursor={"pointer"}
      background={isSelected ? "Primary.$100" : "transparent"}
      spacing={"0px"}
      transition={"300ms all"}
      borderRadius={"4px"}
      position={"relative"}
    >
      {isSelected && (
        <Stack
          position={"absolute"}
          left={"0px"}
          borderRadius={"4px"}
          w={"4px"}
          h={"60%"}
          background={"Primary.$200"}
          zIndex={"2"}
        />
      )}

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
