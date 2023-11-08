import { Box, Flex, HStack, useBreakpointValue } from '@chakra-ui/react';
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

  const flexDir = useBreakpointValue({ base: 'column', md: 'row' }) as 'column' | 'row';
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <Flex w="100%" flexDir={flexDir}>
      <Navbar />
      <Box maxH="100vh" w="100%" overflow="scroll" mt={isMobile ? '100px' : '0'}>
        <Outlet />
      </Box>
    </Flex>
  );
};
