import { HStack } from "@chakra-ui/react";
import { Outlet, Navigate, useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import { UserContext } from "../../../contexts/UserContext";
import Navbar from "@/components/Navbar";

export const ProtectedLayout = () => {
  const { user, userAlredyLoaded } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (userAlredyLoaded) {
      console.log("here");
      navigate("/login");
    }
  }, [user, navigate, userAlredyLoaded]);

  return (
    <HStack w="100%">
      <Navbar />
      <Outlet />
    </HStack>
  );
};
