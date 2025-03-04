import React from "react";
import { useFetch } from "../../../../../../../../../Hooks/Index";
import { Button, Divider, Flex, Heading, Stack } from "@chakra-ui/react";
import {
  SearchField,
  Title,
} from "../../../../../../../../../Components/Common/Index";
import { Link } from "react-router-dom";

export default function Index() {
  const { loading, error, data } = useFetch({
    endpoint: "assignments",
  });
  return (
    <Stack>
      <Flex
        alignItems="center"
        p="3"
        bgColor="white"
        justifyContent="space-between"
        wrap="wrap"
        gap="6"
      >
        <Heading size="md">Quizes</Heading>
        <Flex gap="3">
          <Button as={Link} to="add" colorScheme="blue">
            Add A Quiz
          </Button>
          <SearchField>
            <Title>Search For A Quiz</Title>
          </SearchField>
        </Flex>
      </Flex>
      <Divider />
    </Stack>
  );
}
