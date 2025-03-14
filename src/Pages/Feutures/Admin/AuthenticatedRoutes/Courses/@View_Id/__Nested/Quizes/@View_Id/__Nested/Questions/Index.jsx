import {
  Alert,
  AlertIcon,
  Button,
  Flex,
  Skeleton,
  Stack,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useFetch } from "../../../../../../../../../../../Hooks/useFetch/useFetch";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../../../../../../../../../../../Context/UserDataProvider/UserDataProvider";
import { Pagination } from "../../../../../../../../../../../Components/Common/Pagination/Pagination";
import { formatRelativeTime } from "../../../../../../../../../../../Utils/GetRelativeTime/GetRelativeTime";
import { LazyLoadedImage } from "../../../../../../../../../../../Components/Common/Index";

const Field = ({ label, value, ...rest }) => {
  return (
    <Flex
      alignItems="center"
      gap="4"
      p="3"
      borderRadius="lg"
      bgColor="gray.50"
      {...rest}
    >
      <Button colorScheme="blue">{label}</Button>
      <Text fontSize="lg">{value}</Text>
    </Flex>
  );
};

const ordinalSuffix = ["First", "Second", "Third", "Fourth"];

export default function Index() {
  const { quizId } = useParams();
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const { data, loading, error } = useFetch({
    endpoint: `/assignment-details/${quizId}/`,
  });
  console.log(data);
  const {
    questions: { questions },
    _id,
    created_at,
    updatedAt,
  } = data || { questions: {} };
  if (questions?.length === 0 && !loading) {
    return (
      <Alert size="lg" status="warning">
        <AlertIcon />
        No Questions Found
      </Alert>
    );
  }
  return (
    <Stack overflow="hidden" as={Skeleton} isLoaded={!loading}>
      <Flex gap="3">
        <Button>
          Created On: {created_at && formatRelativeTime(created_at)}
        </Button>
        {updatedAt && (
          <Button>
            Updated On: {new Date(updatedAt).toLocaleString("en-US")}
          </Button>
        )}
      </Flex>
      <Stack key={currentQuestion} className="show-opacity-animation">
        {questions?.[currentQuestion - 1]?.attachments.length >= 1 && (
          <LazyLoadedImage
            src={questions?.[currentQuestion - 1]?.attachments[0].url}
            w="100%"
            minH="300px"
            borderRadius="lg"
          />
        )}
        <Field
          value={questions?.[currentQuestion - 1]?.question}
          label="Question"
        />
        <Flex justifyContent="center" wrap="wrap" gap="3">
          {questions?.[currentQuestion - 1]?.choices?.map((option, index) => {
            return (
              <Field
                key={option.key}
                value={option.title}
                label={`Answer ${ordinalSuffix[index]}`}
                w="500px"
                flexGrow="1"
                bgColor={option.is_correct ? "green.100" : "gray.100"}
                transition="0.3s"
              />
            );
          })}
        </Flex>
      </Stack>
      <Pagination
        onPageChange={setCurrentQuestion}
        totalPages={questions?.length}
        size={questions?.length}
        currentPage={currentQuestion}
      />
    </Stack>
  );
}
