import { CoachLogo } from "@/assets/images/logos";
import Loader from "@/components/Base/Loader";
import { UserContext } from "@/contexts/UserContext";
import { Button, Center, Image, Input, VStack } from "@chakra-ui/react";
import React, { useContext } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";

const defaultValues = {
  email: "",
  password: "",
};

const Login: React.FC = () => {
  const { login } = useContext(UserContext);
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({ defaultValues });

  const handleLogin: SubmitHandler<typeof defaultValues> = async (values) => {
    await login(values);
  };

  return (
    <Center w={"100vw"} h={"100vh"}>
      <VStack
        p={"24px"}
        background={"Gray.$200"}
        borderRadius={"16px"}
        boxShadow={"0px 0px 10.0408px rgba(0, 0, 0, 0.1);"}
      >
        <Image src={CoachLogo} />
        {isSubmitting ? (
          <Center minW={"350px"} h={"200px"}>
            <Loader />
          </Center>
        ) : (
          <>
            <VStack minW={"350px"} mt={"28px !important"} spacing={"16px"}>
              <Controller
                control={control}
                rules={{ required: true }}
                name="email"
                render={({ field, fieldState: { error } }) => (
                  <Input
                    placeholder="E-mail"
                    {...field}
                    isInvalid={!!error}
                    h={"48px"}
                  />
                )}
              />

              <Controller
                control={control}
                rules={{ required: true }}
                name="password"
                render={({ field, fieldState: { error } }) => (
                  <Input
                    placeholder="Password"
                    {...field}
                    isInvalid={!!error}
                    h={"48px"}
                  />
                )}
              />
            </VStack>
            <Button
              mt={"32px !important"}
              w={"100%"}
              onClick={handleSubmit(handleLogin)}
            >
              SignIn
            </Button>
          </>
        )}
      </VStack>
    </Center>
  );
};

export default Login;
