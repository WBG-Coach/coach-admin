import { CoachLogo } from '@/assets/images/logos';
import Loader from '@/components/Base/Loader';
import { UserContext } from '@/contexts/UserContext';
import {
  Alert,
  AlertIcon,
  AlertTitle,
  Button,
  Center,
  HStack,
  Image,
  Input,
  PinInput,
  PinInputField,
  Text,
  VStack,
} from '@chakra-ui/react';
import React, { useContext, useState } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { CloseButton } from 'react-toastify/dist/components';

const defaultValues = {
  email: '',
};

const Login: React.FC = () => {
  const { sendOTPCode, login } = useContext(UserContext);
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({ defaultValues });
  const [error, setError] = useState('');
  const [showOTP, setShowOTP] = useState(false);
  const [code, setCode] = useState('');

  const handleLogin: SubmitHandler<typeof defaultValues> = async ({ email }) => {
    try {
      setError('');
      if (showOTP) {
        await login({ email, code });
      } else {
        await sendOTPCode(email);
        setShowOTP(true);
      }
    } catch (err: any) {
      if (showOTP) {
        setError('Invalid code');
      } else {
        setError('Invalid email');
      }
      setCode('');
    }
    return;
  };

  return (
    <Center w={'100vw'} h={'100vh'}>
      <VStack
        p={'24px'}
        background={'Gray.$200'}
        borderRadius={'16px'}
        boxShadow={'0px 0px 10.0408px rgba(0, 0, 0, 0.1);'}
      >
        <Image src={CoachLogo} maxH="100px" />
        {isSubmitting ? (
          <Center minW={'350px'} h={'200px'}>
            <Loader />
          </Center>
        ) : (
          <>
            <VStack minW={'350px'} mt={'28px !important'} spacing={'16px'}>
              <Controller
                control={control}
                rules={{ required: true }}
                name="email"
                render={({ field, fieldState: { error } }) => (
                  <Input placeholder="E-mail" {...field} isInvalid={!!error} h={'48px'} disabled={showOTP} />
                )}
              />
              {error && (
                <Alert status="error">
                  <AlertIcon />
                  <AlertTitle>{error}</AlertTitle>
                </Alert>
              )}
              {showOTP && (
                <VStack my={10}>
                  <Text>Enter the code we sent to your email</Text>
                  <HStack>
                    <PinInput otp onComplete={setCode}>
                      <PinInputField />
                      <PinInputField />
                      <PinInputField />
                      <PinInputField />
                      <PinInputField />
                      <PinInputField />
                      <PinInputField />
                      <PinInputField />
                    </PinInput>
                  </HStack>
                </VStack>
              )}
            </VStack>
            <Button
              mt={'32px !important'}
              w={'100%'}
              onClick={handleSubmit(handleLogin)}
              isDisabled={showOTP && code.length < 4}
            >
              {showOTP ? 'Verify code' : 'Send OTP code'}
            </Button>
          </>
        )}
      </VStack>
    </Center>
  );
};

export default Login;
