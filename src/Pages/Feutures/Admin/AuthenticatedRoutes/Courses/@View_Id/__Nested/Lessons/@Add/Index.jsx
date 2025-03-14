import {
  Button,
  Divider,
  Heading,
  Stack,
  Textarea,
  useToast,
  Text,
  Checkbox,
} from "@chakra-ui/react";
import React, { useCallback, useState } from "react";
import { InputElement } from "../../../../../../../../../Components/Common/InputElement/InputElement";
import { MdLockClock, MdOutlineSubtitles } from "react-icons/md";
import { VideoUploader } from "../../../../../../../../../Components/Common/VideoUploader/VideoUploader";
import { ImageUploader } from "../../../../../../../../../Components/Common/ImageDragAndDropUploader/ImageUploader";
import { PDFUploader } from "../../../../../../../../../Components/Common/PdfUploader/PdfUploader";
import { useForm, Controller, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LessonCreationSchema } from "./schema";
import { ErrorText } from "../../../../../../../../../Components/Common/ErrorText/ErrorText";
import axiosInstance from "../../../../../../../../../axiosConfig/axiosInstance";
import { useAuth } from "../../../../../../../../../Context/UserDataProvider/UserDataProvider";
import { uploadToVimeoWithTus } from "../../../../../../../../../Utils/VimeoVideoUploader/VimeoVideoUploader";
import { UploadProgressModal } from "../../../../../../../../../Components/Common/UploadingPercentageModal/UploadingPercentageModal";
import { useNavigate, useParams } from "react-router-dom";
import { FaClock, FaEye, FaUpload } from "react-icons/fa";
import axios from "axios";
import { uploadToBunnyWithTus } from "../../../../../../../../../Utils/BunnyVideoUploader/BunnyVideoUploader";

import { v4 } from "uuid";

export default function Index() {
  const navigate = useNavigate();
  const { courseId } = useParams();
  const { user } = useAuth();
  const [uploadingPercent, setUploadingPercent] = useState(0);
  const toast = useToast({
    position: "top-right",
    duration: 3000,
    isClosable: true,
  });
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    register,
  } = useForm({
    resolver: zodResolver(LessonCreationSchema),
    mode: "onBlur",
  });

  const video = useWatch({ control, name: "video" });

  const uploadVideoHelper = useCallback(
    async ({ signedURL, video, onError, videoId, libraryId }) => {
      await uploadToBunnyWithTus({
        signedUrl: signedURL,
        file: video,
        fileSize: video.size,
        videoId: videoId,
        libraryId: libraryId,
        onProgress: (data) => {
          setUploadingPercent(data);
        },
        onSuccess: () => {
          setUploadingPercent(0);
        },
        onError: onError,
      });
    },
    []
  );
  const createSignedUrlHelper = useCallback(async ({ videoId }) => {
    const res = await axios.get(
      `http://74.48.196.51:8877/bunnycdn/signed-url/${videoId}/`,
      {
        headers: {
          Authorization: `Bearer ${user.data.token.access}`,
        },
      }
    );
    console.log(res);
    return res.data.signed_url;
  }, []);

  const createVideoInBunny = async ({ title }) => {
    const res = await axios.post(
      `http://74.48.196.51:8877/bunnycdn/create-video/`,
      {
        title,
      },
      {
        headers: {
          Authorization: `Bearer ${user.data.token.access}`,
        },
      }
    );
    return res;
  };

  const createLessonHelper = useCallback(async (data) => {
    const req = await axiosInstance.post("/lessons", data, {
      headers: {
        Authorization: `Bearer ${user.data.token}`,
      },
    });
    return req;
  }, []);

  const onSubmit = async (data) => {
    const videoCreateRequest = await createVideoInBunny({
      title: data?.title,
    });
    const videoId = videoCreateRequest?.data?.guid;
    const libraryId = videoCreateRequest?.data?.videoLibraryId;

    const signedURL = await createSignedUrlHelper({
      videoId,
    });
    await uploadVideoHelper({
      signedURL,
      video: data.video,
      videoId,
      libraryId,
      onError: (error) => {
        console.log(error);
      },
    });
    // const DataSend = new FormData();
    // DataSend.append("title", data.title);
    // DataSend.append("course", courseId);

    // DataSend.append("vimeo_video_Url", videoLink);
    // await createLessonHelper(DataSend);

    // toast({
    //   title: "Lesson created successfully",
    //   status: "success",
    // });
    // navigate(`/courses/${courseId}/lessons`);
  };

  return (
    <>
      <UploadProgressModal
        isOpen={uploadingPercent}
        uploadProgress={uploadingPercent}
        fileName={video?.name}
        fileSize={video?.size}
      />
      <Stack as="form" onSubmit={handleSubmit(onSubmit)} spacing={4}>
        <Heading size="md">Create Lesson</Heading>
        <Divider />

        <InputElement
          Icon={MdOutlineSubtitles}
          placeholder="Title"
          register={register}
          name="title"
          errors={errors}
          size="lg"
        />

        <InputElement
          size="lg"
          Icon={MdOutlineSubtitles}
          placeholder="Description"
          register={register}
          as={Textarea}
          name="description"
          errors={errors}
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

        <InputElement
          size="lg"
          Icon={FaClock}
          placeholder="days limit"
          register={register}
          type="number"
          name="day_limit"
          errors={errors}
        />

        <InputElement
          size="lg"
          Icon={FaEye}
          placeholder="views limit"
          register={register}
          type="number"
          name="views_limit"
          errors={errors}
        />

        <Controller
          name="video"
          control={control}
          render={({ field }) => (
            <VideoUploader
              video={field.value}
              onChange={(file) => field.onChange(file)}
            />
          )}
        />
        <ErrorText>{errors.video?.message}</ErrorText>

        <Button
          size="lg"
          isLoading={isSubmitting}
          colorScheme="blue"
          type="submit"
        >
          Upload Lesson
        </Button>
      </Stack>
    </>
  );
}
