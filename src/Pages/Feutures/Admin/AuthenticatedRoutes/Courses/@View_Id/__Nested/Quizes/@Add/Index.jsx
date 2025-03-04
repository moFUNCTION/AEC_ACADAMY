import {
  Button,
  Checkbox,
  Divider,
  Heading,
  Select,
  Stack,
  Textarea,
  Text,
} from "@chakra-ui/react";
import { InputElement } from "../../../../../../../../../Components/Common/Index";
import { useForm } from "react-hook-form";
import { useFetch } from "../../../../../../../../../Hooks/Index";
import { FaRegNoteSticky } from "react-icons/fa6";
import { FaClock } from "react-icons/fa";
import { ChakraDatePicker } from "../../../../../../../../../Components/Common/ChakraDatePicker/ChakraDatePicker";

export default function Index() {
  const {
    register,
    formState: { errors },
  } = useForm();

  const {
    loading: AssigmentTypeLoading,
    error: AssigmentsTypesError,
    data: AssigmentTypes,
  } = useFetch({
    endpoint: "assignment-types",
  });
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
      <InputElement
        as={Select}
        placeholder="assignment type"
        name="assignment-type"
        register={register}
        Icon={FaRegNoteSticky}
        size="lg"
        heightAlignedCenter
      >
        {AssigmentTypes?.map((item) => {
          return <option key={item?.id}>{item?.name}</option>;
        })}
      </InputElement>
      <InputElement
        register={register}
        name="timer"
        errors={errors}
        size="lg"
        placeholder="Timer"
        Icon={FaClock}
        type="number"
      />

      <ChakraDatePicker
        size="lg"
        variant="filled"
        placeholder="Choose Assigment Unlocks Date"
      />

      <ChakraDatePicker size="lg" variant="filled" placeholder="Time Tracker" />

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

      <Button colorScheme="blue">Add Assigment</Button>
    </Stack>
  );
}
