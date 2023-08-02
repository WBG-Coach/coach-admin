import Loader from "@/components/Base/Loader";
import UserService from "@/services/user";
import { IUser } from "@/types";
import { Center, HStack, Text, VStack } from "@chakra-ui/react";
import React, { useCallback, useEffect, useState } from "react";

const Users = () => {
  const [users, setUsers] = useState({
    isLoading: true,
    data: [] as IUser[],
  });

  const refreshUsers = useCallback(() => {
    UserService.getUsers().then(users => setUsers({ isLoading: false, data: users }))
  }, []);

  useEffect(() => {
    refreshUsers();
  }, [refreshUsers]);

  return <>
    {users.isLoading ?
      <Center minW={"350px"} h={"200px"}>
        <Loader />
      </Center> :
      <VStack w={'100%'}>
        {users.data.map(user =>
          <HStack key={user.id}>
            <Text>{user.name}</Text>
          </HStack>)}
      </VStack>}</>;
};

export default Users;
