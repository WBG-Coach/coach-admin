import React, { useContext } from "react";
import { Image, Stack, Text, VStack } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { MenuItems } from "./common";
import { MenuItem } from "./MenuItem";
import { CoachLogo } from "@/assets/images/logos";
import { UserContext } from "@/contexts/UserContext";
import UserCard from "../UserCard";

const Navbar: React.FC = () => {
  const { logout, user } = useContext(UserContext);
  const { t } = useTranslation();

  return (
    <VStack
      minH={"100vh"}
      w="240px !important"
      display={"flex"}
      alignItems="center"
      borderRight="1px solid #DCE0E5"
    >
      <Image src={CoachLogo} alt={"Logo do coach"} m="24px 12px" mb="16px" />

      <UserCard
        logout={logout}
        name={user?.name || ""}
        email={user?.email || ""}
      />

      <VStack w={"100%"} alignItems={"flex-start"} mt="16px !important">
        {MenuItems.map((item, index) =>
          item.subItems ? (
            <Stack key={index} w={"100%"}>
              <Text
                m="16px"
                mb="8px"
                fontSize="12px"
                color="#9AA2AC"
                fontWeight={700}
              >
                {t(`Navbar.${item.label}`)}
              </Text>
              {item.subItems.map((subItem, sIndex) => (
                <MenuItem
                  key={index + sIndex}
                  icon={subItem.icon}
                  label={t(`Navbar.${subItem.label}`)}
                  route={subItem.route}
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
