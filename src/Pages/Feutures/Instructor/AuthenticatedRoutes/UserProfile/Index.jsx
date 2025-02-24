import { Stack } from "@chakra-ui/react";
import React from "react";
import { useAuth } from "../../../../../Context/UserDataProvider/UserDataProvider";
export default function Index() {
  const { user } = useAuth();
  console.log(user);
  return <Stack></Stack>;
}
