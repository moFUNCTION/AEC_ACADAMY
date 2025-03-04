import {
  Button,
  Divider,
  Heading,
  Select,
  Skeleton,
  Stack,
  Textarea,
  Text,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import { InputElement } from "../../../../../../Components/Common/Index";
import { MdPriceChange, MdStar } from "react-icons/md";
import { CiDollar } from "react-icons/ci";
import { FaPuzzlePiece, FaUpload } from "react-icons/fa";
import { Controller, useForm } from "react-hook-form";
import { useFetch } from "../../../../../../Hooks/useFetch/useFetch";
import { languages } from "../../../../../../~Data/Languages";
import { LanguageSelect } from "../../../../../../Components/Common/LanguageSelect/LanguageSelect";
import { Levels } from "../../../../../../~Data/Levels";
import { zodResolver } from "@hookform/resolvers/zod";
import { schema } from "./schema";
import { ImageUploader } from "../../../../../../Components/Common/ImageDragAndDropUploader/ImageUploader";
import { ErrorText } from "../../../../../../Components/Common/ErrorText/ErrorText";
import { Admin } from "../../../../../../$Models/Admin";
import { useAuth } from "../../../../../../Context/UserDataProvider/UserDataProvider";
import { useNavigate } from "react-router-dom";

export default function Index() {
  const toast = useToast({
    position: "top-right",
    duration: 3000,
    isClosable: true,
  });
  const Navigate = useNavigate();
  const { user } = useAuth();
  const {
    register,
    formState: { errors, isSubmitting },
    control,
    handleSubmit,
  } = useForm({
    resolver: zodResolver(schema),
    mode: "onBlur",
  });
  const {
    data: Categories,
    loading: CatogiriesLoading,
    error: CategoriesError,
  } = useFetch({
    endpoint: "categories",
  });
  const {
    data: SubCategories,
    loading: SubCatogiriesLoading,
    error: SubCategoriesError,
  } = useFetch({
    endpoint: "sub-categories",
  });

  const onSubmit = async (data) => {
    const course_init = new Admin.Course({ ...data, userId: user.data?.id });
    const { data: CourseResponce, error } = await course_init.Add();
    if (error) {
      toast({
        title: "Error in Creating Course",
        status: "error",
      });
      console.log(error);
      return;
    }
    Navigate("/courses");
  };
  return (
    <Stack p="5" minH="100vh" w="100%">
      <Heading mb="2" size="md">
        Add A Course
      </Heading>
      <Divider />
      <Controller
        control={control}
        name="image"
        render={({ field }) => {
          return (
            <>
              <ImageUploader
                img={field.value}
                onChangeImage={(file) => field.onChange(file)}
                onRemoveImage={() => field.onChange()}
                isInvalid={errors.image}
                label={
                  <Stack p="4" alignItems="center">
                    <FaUpload />
                    {!errors?.image && <Text>Upload Course Image</Text>}

                    <ErrorText>{errors?.image?.message}</ErrorText>
                  </Stack>
                }
              />
            </>
          );
        }}
      />

      <InputElement
        name="title"
        register={register}
        errors={errors}
        placeholder="Title"
        size="lg"
      />
      <InputElement
        name="description"
        register={register}
        errors={errors}
        placeholder="Description"
        as={Textarea}
        size="lg"
      />
      <InputElement
        name="price"
        register={register}
        errors={errors}
        placeholder="Price"
        size="lg"
        type="number"
        Icon={CiDollar}
      />
      <Skeleton minH="50px" isLoaded={!CatogiriesLoading}>
        <InputElement
          register={register}
          name="category"
          as={Select}
          Icon={FaPuzzlePiece}
          placeholder="Category"
          size="lg"
          errors={errors}
          cursor="pointer"
        >
          {Categories?.map((category) => {
            return (
              <option value={category.id} key={category.id}>
                {category.title}
              </option>
            );
          })}
        </InputElement>
      </Skeleton>
      <Skeleton minH="50px" isLoaded={!SubCatogiriesLoading}>
        <InputElement
          register={register}
          name="subCategory"
          as={Select}
          Icon={FaPuzzlePiece}
          placeholder="sub category"
          size="lg"
          errors={errors}
          cursor="pointer"
        >
          {SubCategories?.map((category) => {
            return (
              <option value={category.id} key={category.id}>
                {category.title}
              </option>
            );
          })}
        </InputElement>
      </Skeleton>

      <InputElement
        name="level"
        register={register}
        errors={errors}
        cursor="pointer"
        Icon={MdStar}
        placeholder="Level"
        size="lg"
        as={Select}
      >
        {Levels.map((level) => {
          return <option key={level.title}>{level.title}</option>;
        })}
      </InputElement>

      <LanguageSelect
        error={errors.language?.message}
        control={control}
        name="language"
      />

      <Button
        isLoading={isSubmitting}
        onClick={handleSubmit(onSubmit)}
        size="lg"
        colorScheme="blue"
      >
        Add The Course
      </Button>
    </Stack>
  );
}
