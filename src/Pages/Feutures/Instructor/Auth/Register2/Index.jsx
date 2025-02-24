import { Button, Flex, Heading, Stack, useToast } from "@chakra-ui/react";
import { useMultipleFormSteps } from "../../../../../Hooks/useMultipleFormSteps/useMultipleFormSteps";
import { UserInformation } from "./Steps/Userinformation/UserInformation";
import { FormWrapper } from "../FormWrapper/FormWrapper";
import { FaArrowRight } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";
import { schema } from "./schema";
import { ProgressBar } from "../../../../../Components/Common/ProgressBar/ProgressBar";
import { UserImage } from "./Steps/UserImage/UserImage";
import { UserPassword } from "./Steps/UserPassword/UserPassword";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Logo } from "../../../../../Components/Common/Logo/Logo";
import { Category } from "./Steps/Category/Category";
import { Nationality } from "./Steps/Nationality/Nationality";
import { Experiance } from "./Steps/Experiance/Experiance";
import { Location } from "./Steps/Location/Location";
import { UserAgeGender } from "./Steps/UserAge&Gender/UserAge&Gender";
import { tryCatch } from "../../../../../Utils/TryAndCatchHandler/TryAndCatchHandler";
import axiosInstance from "../../../../../axiosConfig/axiosInstance";
import { BaseNavigationHandler } from "../../../../../Utils/BaseNavigationHandler/BaseNavigationHandler";
import { useEffect } from "react";
import { ImageUploader } from "../../../../../@Firebase/Utils/Common/ImageUploader/ImageUploader";
import { useAuth } from "../../../../../Context/UserDataProvider/UserDataProvider";
import { ErrorBoundary } from "../../../../../Components/Common/ErrorBoundary/ErrorBoundary";
import { Instructor } from "../../../../../$Models/Instructor";
import { StudentRegisterModal } from "./StudentRegisterModal";

const Steps = ({ isSignedIn } = {}) => {
  const arr = [
    {
      Component: UserInformation,
      fieldsRequired: [
        "first_name",
        "middle_name",
        "last_name",
        "email",
        "phone",
      ],
    },
    {
      Component: Category,
      fieldsRequired: ["category", "subCategory"],
    },
    {
      Component: Nationality,
      fieldsRequired: ["nationality"],
    },
    {
      Component: Experiance,
      fieldsRequired: ["degree", "cv", "certificate"],
    },
    {
      Component: UserImage,
    },
    {
      Component: Location,
      fieldsRequired: ["place"],
    },
    {
      Component: UserAgeGender,
      fieldsRequired: ["age"],
    },
    {
      Component: UserPassword,
      fieldsRequired: ["password", "confirmPassword"],
    },
  ];

  return arr;
};

const ErrorPageWrapper = (errorKey) => {
  const arr = [
    ["first_name", "middle_name", "last_name", "email", "phone"],
    ["category", "subCategory"],
    ["nationality"],
    ["degree", "cv", "certificate"],
    ["place"],
    ["age"],
    ["password", "confirmPassword"],
  ];
  const index = arr.findIndex((item) => {
    return item.includes(errorKey);
  });
  if (index !== -1) {
    return index;
  } else {
    return Steps().length - 1;
  }
};
export default function Index() {
  const Navigate = useNavigate();
  const { onAuth, user } = useAuth();
  const toast = useToast({
    position: "top-right",
    duration: 3000,
    isClosable: true,
  });
  const {
    formState: { errors, isSubmitting, isValidating, isLoading },
    register,
    HandleNext,
    HandlePrev,
    isLastStep,
    isFirstStep,
    handleSubmit,
    CurrentStep,
    currentStepIndex,
    control,
    setValue,
    wrapperTransionStyles,
    watch,
    setError,
    HandleChangeCurrentStepIndex,
  } = useMultipleFormSteps({
    steps: Steps({
      isSignedIn: user.data ? true : false,
    }),
    schema: schema({ isSignedIn: user.data }),
    mode: "onBlur",
    defaultValues: {
      ...user?.data,
      subCategory: user?.data?.sub_category,
    },
  });

  const onSubmit = async (data) => {
    const { error, ApplicationResponce, LoginData } =
      await Instructor.CreateInstructorAccount(
        data,
        {
          errors: {
            errorHandler: (error) => {
              console.log(error);
              if (error.error) {
                const ErrorData = error.error?.originalError?.response?.data;
                for (let key in ErrorData) {
                  setError(key, {
                    message: ErrorData[key].join(`\n`),
                  });
                  console.log(ErrorPageWrapper(key));
                  HandleChangeCurrentStepIndex(ErrorPageWrapper(key));

                  for (let error of ErrorData[key]) {
                    toast({
                      title: "error",
                      status: "error",
                      description: error,
                    });
                  }
                }
                return;
              }
            },
          },
        },
        {
          isSignedIn: user.data ? true : false,
          onAuth,
        }
      );
    if (error) {
      return;
    }
    Navigate("/");
  };

  if (!user.data && !user.loading) {
    return (
      <FormWrapper>
        <StudentRegisterModal isOpen={true} />;
      </FormWrapper>
    );
  }
  return (
    <FormWrapper>
      <Stack
        alignItems="center"
        w="100%"
        maxW="600px"
        bgColor="white"
        p="3"
        borderRadius="lg"
      >
        <ProgressBar
          size="sm"
          steps={Steps().length}
          current={currentStepIndex + 1}
        />
      </Stack>

      <Stack
        justifyContent="center"
        alignItems="center"
        p="3"
        borderRadius="lg"
        bgColor="white"
        w="100%"
        maxW="600px"
        gap="4"
        overflow="hidden"
      >
        <Logo w="100px" mb="3" onClick={() => BaseNavigationHandler("/")} />
        <motion.div
          style={{
            width: "100%",
            gap: "10px",
            display: "flex",
            flexDirection: "column",
          }}
          {...wrapperTransionStyles}
          key={currentStepIndex}
        >
          <ErrorBoundary>
            <CurrentStep
              isSignedIn={user.data ? true : false}
              errors={errors}
              currentStepIndex={currentStepIndex}
              register={register}
              control={control}
              setValue={setValue}
              watch={watch}
            />
          </ErrorBoundary>
        </motion.div>

        <Flex w="100%" justifyContent="start" gap="3">
          <Button
            isDisabled={isFirstStep}
            onClick={HandlePrev}
            gap="3"
            colorScheme="blue"
            variant="outline"
          >
            <FaArrowLeft />
            Prev
          </Button>
          {isLastStep ? (
            <Button
              isLoading={isSubmitting}
              onClick={handleSubmit(onSubmit)}
              gap="3"
              colorScheme="green"
            >
              Create Instructor Account
            </Button>
          ) : (
            <Button
              isLoading={isValidating}
              onClick={HandleNext}
              gap="3"
              colorScheme="blue"
            >
              Next
              <FaArrowRight />
            </Button>
          )}
        </Flex>
        <Button mr="auto" ml="1" variant="link" as={Link} to="/login">
          Have An Account Already ? Please Click Here To Sign In
        </Button>
      </Stack>
    </FormWrapper>
  );
}
