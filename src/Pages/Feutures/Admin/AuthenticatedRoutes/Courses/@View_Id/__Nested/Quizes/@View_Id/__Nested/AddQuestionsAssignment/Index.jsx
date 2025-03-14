import {
  Button,
  Checkbox,
  Divider,
  Flex,
  Heading,
  IconButton,
  Stack,
  Textarea,
  Tooltip,
  useToast,
  Text,
} from "@chakra-ui/react";
import React, { useCallback, useState } from "react";
import { InputElement } from "../../../../../../../../../../../Components/Common/InputElement/InputElement";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { Pagination } from "../../../../../../../../../../../Components/Common/Pagination/Pagination";
import { zodResolver } from "@hookform/resolvers/zod";
import { schema } from "./schema";
import { MdCancel } from "react-icons/md";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../../../../../../../../../../axiosConfig/axiosInstance";
import { useAuth } from "../../../../../../../../../../../Context/UserDataProvider/UserDataProvider";
import { ImageUploader } from "../../../../../../../../../../../Components/Common/ImageDragAndDropUploader/ImageUploader";
import { FaUpload } from "react-icons/fa";
import { Admin } from "../../../../../../../../../../../$Models/Admin";
import { useFetch } from "../../../../../../../../../../../Hooks/Index";
const QuestionAnswerField = ({
  containerStyles,
  onChoose,
  isChosen,
  ...params
}) => {
  return (
    <Tooltip label="Click on the rightmost side if you want this to be the correct answer">
      <Flex
        borderRadius="lg"
        alignItems="center"
        bgColor="gray.100"
        p="3"
        gap="3"
        w="100%"
        {...containerStyles}
      >
        <Checkbox
          isChecked={isChosen}
          onChange={(e) => e.target.checked && onChoose()}
          colorScheme="blue"
          size="lg"
          bgColor="white"
        />
        <InputElement size="lg" {...params} />
      </Flex>
    </Tooltip>
  );
};

const suffix = ["First", "Second", "Third", "Fourth"];

export default function Index() {
  const { quizId, id } = useParams();
  const navigate = useNavigate();
  const toast = useToast({
    position: "top-right",
    duration: 3000,
    isClosable: true,
  });
  const { user } = useAuth();
  const { courseId } = useParams();
  const [currentQuestion, setCurrentQuestion] = useState(1);

  const {
    register,
    control,
    setValue,
    trigger,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: async () => ({
      questions: [
        {
          question: "",
          options: [
            { key: "a", value: "" },
            { key: "b", value: "" },
            { key: "c", value: "" },
            { key: "d", value: "" },
          ],
          correctAnswer: "a",
        },
      ],
    }),
    resolver: zodResolver(schema),
  });

  const {
    fields: questions,
    append,
    replace,
    remove,
  } = useFieldArray({
    control,
    name: "questions",
  });

  const addMoreQuestion = async () => {
    const isValid = await trigger(["questions"]);
    if (isValid) {
      append({
        question: "",
        options: [
          { key: "a", value: "" },
          { key: "b", value: "" },
          { key: "c", value: "" },
          { key: "d", value: "" },
        ],
        correctAnswer: "a",
      });
      setCurrentQuestion((prev) => prev + 1);
    }
  };

  const chooseCorrectAnswer = (index, chosenAnswer) => {
    const { questions } = getValues();
    const newQuestions = [...questions];
    newQuestions[index] = {
      ...newQuestions[index],
      correctAnswer: chosenAnswer,
    };
    replace(newQuestions);
  };

  const onDelete = () => {
    remove(currentQuestion - 1);
    if (currentQuestion !== 1) {
      setCurrentQuestion((prev) => prev - 1);
    } else {
      setCurrentQuestion((prev) => prev + 1);
    }
  };

  const error = errors?.questions?.[currentQuestion - 1];

  const onSubmit = useCallback(async (data) => {
    const { error, data: Responce } = await Admin.Assigment.AddQuestions({
      questions: data.questions,
      id: quizId,
    });
    if (error) {
      toast({
        title: "Error creating quiz",
        description: error.message,
        status: "error",
      });
      return;
    }
    toast({ status: "success", title: "Questions created successfully" });
    navigate(`/courses/${id}/quizes/${quizId}/questions`);
  }, []);

  return (
    <Stack gap="4">
      <Heading size="md">Assignment Questions</Heading>
      <Divider />
      <React.Fragment key={currentQuestion}>
        <Controller
          name={`questions.${currentQuestion - 1}.attachment`}
          control={control}
          render={({ field }) => {
            return (
              <ImageUploader
                onChangeImage={(img) => field.onChange(img)}
                onRemoveImage={() => field.onChange()}
                img={field.value}
                label={
                  <Stack p="4" alignItems="center">
                    <FaUpload />
                    <Text>Upload Question Image</Text>
                  </Stack>
                }
              />
            );
          }}
        />
        <InputElement
          name={`questions.${currentQuestion - 1}.question`}
          errorRef="question"
          errors={error}
          register={register}
          noIcon={true}
          placeholder="Question"
          as={Textarea}
        />
        <Flex justifyContent="center" wrap="wrap" gap="3">
          {questions[currentQuestion - 1]?.options?.map((option, index) => {
            const isChosen =
              questions[currentQuestion - 1].correctAnswer === option.key;
            const answerError = error?.options?.[index];
            return (
              <QuestionAnswerField
                errorRef="value"
                errors={answerError}
                key={option.key}
                placeholder={`Answer ${suffix[index]}`}
                register={register}
                name={`questions.${currentQuestion - 1}.options.${index}.value`}
                containerStyles={{
                  w: "500px",
                  flexGrow: "1",
                  bgColor: isChosen ? "blue.100" : "gray.100",
                  transition: "0.3s",
                }}
                isChosen={isChosen}
                onChoose={() =>
                  chooseCorrectAnswer(currentQuestion - 1, option.key)
                }
              />
            );
          })}
        </Flex>
        {questions.length > 1 && (
          <Button
            onClick={onDelete}
            mr="auto"
            w="fit-content"
            colorScheme="red"
          >
            Delete Question
          </Button>
        )}
      </React.Fragment>
      <Pagination
        totalPages={questions.length}
        onPageChange={async (page) => {
          if (page > currentQuestion) {
            const isValid = await trigger([`questions.${currentQuestion - 1}`]);
            if (isValid) {
              setCurrentQuestion(page);
            }
          } else {
            setCurrentQuestion(page);
          }
        }}
        currentPage={currentQuestion}
      />
      <Button
        isDisabled={currentQuestion < questions.length}
        variant="outline"
        onClick={addMoreQuestion}
        colorScheme="blue"
      >
        Add Another Question
      </Button>
      <Button
        isLoading={isSubmitting}
        colorScheme="green"
        onClick={handleSubmit(onSubmit)}
      >
        Set Questions
      </Button>
    </Stack>
  );
}
