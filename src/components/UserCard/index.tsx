import React, { useMemo } from "react";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Center,
  HStack,
  VStack,
  Text,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import Icon from "../Base/Icon";
import { useTranslation } from "react-i18next";

type Props = { name: string; email: string; logout: () => void };

const UserCard: React.FC<Props> = ({ name, email, logout }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const initials = useMemo(() => {
    const splinted = name.split(" ");
    return splinted.length > 1
      ? `${splinted[0][0]}${splinted[1][0]}`
      : `${splinted[0][0]}${splinted[0][1]}`;
  }, [name]);

  const handleSettings = () => {
    navigate("/sl/admin/settings");
  };

  return (
    <Menu>
      <MenuButton>
        <HStack
          w="224px"
          p="10px"
          boxShadow="0px 1px 6px 0px rgba(0, 0, 0, 0.08)"
          borderRadius="16px"
        >
          <Center
            borderRadius="50%"
            w="40px"
            h="40px"
            bg="#EBF1FF"
            color="#264673"
            fontWeight={700}
            fontSize={"16px"}
            textTransform="uppercase"
          >
            {initials}
          </Center>
          <VStack
            maxW="calc(100% - 80px)"
            alignItems="start"
            justifyContent="center"
          >
            <Text
              isTruncated
              maxWidth="100%"
              fontSize={"14px"}
              fontWeight={500}
              color="#111417"
              lineHeight={1}
            >
              {name}
            </Text>
            <Text
              isTruncated
              lineHeight={1}
              maxWidth="100%"
              fontSize={"12px"}
              fontWeight={500}
              color="#576375"
            >
              {email}
            </Text>
          </VStack>
          <Icon size={24} name="angle-down" />
        </HStack>
      </MenuButton>

      <MenuList>
        <MenuItem
          onClick={handleSettings}
          color="#111417"
          fontSize={"16px"}
          fontWeight={500}
        >
          <Icon name="setting" color="#111417" mr="8px" size={24} />
          {t("Navbar.settings")}
        </MenuItem>
        <MenuItem
          onClick={logout}
          color="#F11D0E"
          fontSize={"16px"}
          fontWeight={500}
        >
          <Icon name="signout" color="#F11D0E" mr="8px" size={24} />
          {t("Navbar.logout")}
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default UserCard;
