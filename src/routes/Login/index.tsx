import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, Image, Text } from "../../components";
import WorldBank from "../../assets/images/world-bank.png";
import { useDispatch, useSelector } from "react-redux";
import {
  decremented,
  incremented,
  selectCounterValue,
} from "../../store/counter";

const Login: React.FC<{}> = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const value = useSelector(selectCounterValue);

  return (
    <Container
      width="100%"
      background="#333"
      minHeight="100vh"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
    >
      <Text fontSize={32} mt={24} color="#fff">
        Admin - Login
      </Text>
      <Image height={300} src={WorldBank} />
      <Container flexDirection="row" mb={3}>
        <Button value="-" onClick={() => dispatch(decremented())} />
        <Text fontSize={32} mx={12} color="#fff">
          {value}
        </Text>
        <Button value="+" onClick={() => dispatch(incremented())} />
      </Container>
      <Button value="Go to home" onClick={() => navigate("/")} />
    </Container>
  );
};

export default Login;
