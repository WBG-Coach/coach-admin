import { AnimatePresence } from "framer-motion";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import React, { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { ProtectedLayout } from "../components/Layouts/ProtectedLayout";
import { Center, Text } from "@chakra-ui/react";
import Login from "@/pages/Login";

export const Router = () => {
  const { user } = useContext(UserContext);

  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        {!user && <Route path="/login" element={<Login />} />}

        <Route path="/" element={<ProtectedLayout />}>
          <Route
            index
            element={
              <Center flex={1}>
                <Text fontWeight={600} fontSize={"D_sm"}>
                  Hello world
                </Text>
              </Center>
            }
          />
        </Route>
      </Routes>
    </AnimatePresence>
  );
};
