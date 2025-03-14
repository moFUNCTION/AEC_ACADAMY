import {
  Button,
  Checkbox,
  Divider,
  Heading,
  Select,
  Stack,
  Textarea,
  Text,
  Flex,
  useToast,
  Skeleton,
} from "@chakra-ui/react";
import { InputElement } from "../../../../../../../../../Components/Common/Index";
import { Controller, useForm } from "react-hook-form";
import { useFetch } from "../../../../../../../../../Hooks/Index";
import { FaRegNoteSticky } from "react-icons/fa6";
import { FaClock } from "react-icons/fa";
import { ChakraDatePicker } from "../../../../../../../../../Components/Common/ChakraDatePicker/ChakraDatePicker";
import { zodResolver } from "@hookform/resolvers/zod";
import { schema } from "./schema";
import { ErrorText } from "../../../../../../../../../Components/Common/ErrorText/ErrorText";
import { tryCatch } from "../../../../../../../../../Utils/TryAndCatchHandler/TryAndCatchHandler";
import { Admin } from "../../../../../../../../../$Models/Admin";
import { useNavigate, useParams } from "react-router-dom";
export default function Index() {
  const Navigate = useNavigate();
  const { id } = useParams();
  const toast = useToast();
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    control,
  } = useForm({
    mode: "onBlur",
    resolver: zodResolver(schema),
  });

  const {
    loading: AssigmentTypeLoading,
    error: AssigmentsTypesError,
    data: AssigmentTypes,
  } = useFetch({
    endpoint: "assignment-types",
  });

  const onSubmit = async (data) => {
    console.log(data);
    const assignment_init = new Admin.Assigment({
      ...data,
      order_id: 1,
      course: id,
      unlocks_at: new Date(data.unlocks_at).toISOString(),
      time_tracker: new Date(data.time_tracker).toISOString(),
    });
    const { data: Responce, error } = await assignment_init.Add();
    if (error) {
      toast({
        title: "Error",
        description: error?.message,
        status: "error",
      });
      return;
    }
    toast({
      title: "Assignment Created Successfully",
      status: "success",
    });
    Navigate(`/courses/${id}/quizes`);
  };
  return (
    <Stack gap="4" bgColor="gray.50" borderRadius="lg" p="3">
      <Heading size="md">Add An Assigment</Heading>
      <Divider />
      <InputElement
        register={register}
        name="title"
        errors={errors}
        size="lg"
        placeholder="title"
      />
      <InputElement
        register={register}
        name="description"
        errors={errors}
        size="lg"
        placeholder="description"
        as={Textarea}
      />
      <Skeleton isLoaded={!AssigmentTypeLoading}>
        <InputElement
          as={Select}
          placeholder="assignment type"
          name="type"
          register={register}
          Icon={FaRegNoteSticky}
          size="lg"
          heightAlignedCenter
          errors={errors}
        >
          {AssigmentTypes?.map((item) => {
            return (
              <option value={item.id} key={item?.id}>
                {item?.name}
              </option>
            );
          })}
        </InputElement>
      </Skeleton>

      <Flex alignItems="start" gap="3">
        <InputElement
          register={register}
          name="timer"
          errors={errors}
          size="lg"
          placeholder="Timer"
          Icon={FaClock}
          type="number"
        />
        <Button size="lg" colorScheme="blue">
          Min
        </Button>
      </Flex>

      <Controller
        name="unlocks_at"
        control={control}
        render={({ field }) => {
          return (
            <>
              <ChakraDatePicker
                size="lg"
                variant="filled"
                placeholder="Choose Assigment Unlocks Date"
                onChange={(date) =>
                  field.onChange(new Date(date).toLocaleString())
                }
                minDate={Date.now()}
              />
              <ErrorText>{errors?.unlocks_at?.message}</ErrorText>
            </>
          );
        }}
      />

      <Controller
        name="time_tracker"
        control={control}
        render={({ field }) => {
          return (
            <>
              <ChakraDatePicker
                size="lg"
                variant="filled"
                placeholder="Time Tracker"
                onChange={(date) =>
                  field.onChange(new Date(date).toLocaleString())
                }
                minDate={Date.now()}
              />
              <ErrorText>{errors?.unlocks_at?.message}</ErrorText>
            </>
          );
        }}
      />

      <Checkbox
        {...register("is_done")}
        bgColor="gray.100"
        borderRadius="lg"
        p="3"
        alignItems="center"
        size="lg"
      >
        <Text>is Done</Text>
      </Checkbox>
      <Checkbox
        {...register("is_exam")}
        bgColor="gray.100"
        borderRadius="lg"
        p="3"
        alignItems="center"
        size="lg"
      >
        <Text>is Exam</Text>
      </Checkbox>

      <Button
        isLoading={isSubmitting}
        onClick={handleSubmit(onSubmit)}
        colorScheme="blue"
      >
        Add Assigment
      </Button>
    </Stack>
  );
}
