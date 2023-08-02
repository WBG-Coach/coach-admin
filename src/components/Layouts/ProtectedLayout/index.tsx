import { Box, HStack } from '@chakra-ui/react';
import { Outlet, Navigate, useNavigate } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { UserContext } from '../../../contexts/UserContext';
import Navbar from '@/components/Navbar';

export const ProtectedLayout = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate('/login');
  }, [user, navigate]);

  return (
    <HStack w="100%">
      <Box w="240px">
        <Navbar />
      </Box>
      <Box maxH="100vh" w="100%" overflow="scroll">
        <Outlet />
      </Box>
    </HStack>
  );
};
