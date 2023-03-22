import React, { useContext } from "react";
import { Image, Stack, Text, VStack } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { MenuItems } from "./common";
import { MenuItem } from "./MenuItem";
import { CoachLogo } from "@/assets/images/logos";
import { UserContext } from "@/contexts/UserContext";

const Navbar: React.FC = () => {
  const { logout } = useContext(UserContext);
  const { t } = useTranslation();

  return (
    <VStack
      minH={"100vh"}
      p={"8px 16px"}
      background={"Gray.$200"}
      boxShadow={"0px 0px 10.0408px rgba(0, 0, 0, 0.1);"}
    >
      <Image src={CoachLogo} alt={"Logo do coach"} />

      <VStack w={"100%"} alignItems={"flex-start"} mt={"40px !important"}>
        {MenuItems.map((item, index) =>
          item.subItems ? (
            <Stack key={index}>
              <Text py="8px" px="16px" fontSize="12px" color="#7D827F">
                {t(`Navbar.${item.label}`)}
              </Text>
              {item.subItems.map((subItem, sIndex) => (
                <MenuItem
                  key={index + sIndex}
                  icon={subItem.icon}
                  label={t(`Navbar.${subItem.label}`)}
                  route={subItem.route}
                  onClick={!subItem.route ? logout : undefined}
                />
              ))}
            </Stack>
          ) : (
            <MenuItem
              key={index}
              icon={item.icon}
              label={t(`Navbar.${item.label}`)}
              route={item.route}
            />
          )
        )}
      </VStack>
    </VStack>
  );
};

export default Navbar;
