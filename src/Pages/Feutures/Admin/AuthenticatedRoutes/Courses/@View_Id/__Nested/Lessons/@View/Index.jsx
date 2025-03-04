import { Button, Divider, Flex, Heading, Stack } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import {
  SearchField,
  Title,
} from "../../../../../../../../../Components/Common/Index";

export default function Index() {
  return (
    <Stack p="3" bgColor="gray.50">
      <Flex
        alignItems="center"
        p="3"
        bgColor="white"
        justifyContent="space-between"
        wrap="wrap"
        gap="6"
      >
        <Heading size="md">Lessons</Heading>
        <Flex gap="3">
          <Button as={Link} to="add" colorScheme="blue" variant="outline">
            Add A Lesson
          </Button>
          <SearchField>
            <Title>Search For A Lesson</Title>
          </SearchField>
        </Flex>
      </Flex>
      <Divider />
    </Stack>
  );
}
