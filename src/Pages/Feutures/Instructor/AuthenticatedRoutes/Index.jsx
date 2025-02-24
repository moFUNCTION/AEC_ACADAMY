import {
  Flex,
  Skeleton,
  Stack,
  useMediaQuery,
  Text,
  Avatar,
  Heading,
  Button,
} from "@chakra-ui/react";
import { Header } from "../../../../Components/Layout/DashboardHeader/Header";
import { Outlet } from "react-router-dom";
// import AccessDenied from "./AccessDenied/AccessDenied";
import { TabsMenuExpandProvider } from "../../../../Context/TabsMenuExpandProvider/TabsMenuExpandProvider";
import { MobileTabMenu, TabsMenu } from "../../../../Components/Layout/Index";
import { useAuth } from "../../../../Context/UserDataProvider/UserDataProvider";
import { LazyPageWrapper } from "../../../../Components/Common/Index";
import { FaUser, FaVideoSlash } from "react-icons/fa";
import { CiUser } from "react-icons/ci";
import { CiVideoOn } from "react-icons/ci";
import { IoAnalyticsOutline } from "react-icons/io5";
import { MdOutlineAssignment } from "react-icons/md";
import { MdOutlinePlayLesson } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import { TfiVideoCamera } from "react-icons/tfi";
import { useFetch } from "../../../../Hooks/Index";
import AnimationData from "../../../../assets/Application/Animation.json";
import Lottie from "lottie-react";
const TabsMenuValues = [
  {
    title: <Text>Hi Mohamed In The Dashboard</Text>,
    Icon: FaUserCircle,
  },
  {
    title: "Instructor Profile",
    Icon: CiUser,
  },
  {
    title: "Courses",
    Icon: CiVideoOn,
  },
  {
    title: "Analytics",
    Icon: IoAnalyticsOutline,
  },
  {
    title: "Quizes",
    Icon: MdOutlineAssignment,
  },
  {
    title: "Lessons",
    Icon: MdOutlinePlayLesson,
  },
  {
    title: "Sections",
    Icon: TfiVideoCamera,
  },
];

export default function Index() {
  const { user } = useAuth();
  const [isPhoneQuery] = useMediaQuery("(max-width: 900px)");
  const {
    data: ApplicationData,
    loading: ApplicationLoading,
    error: ApplicationError,
    HandleRender,
  } = useFetch({
    endpoint: `/instractor-application/${user?.data?.id}/`,
  });

  return (
    <TabsMenuExpandProvider>
      <Stack gap="0">
        <Header />

        <Flex
          sx={{
            " > div": {
              overflow: "auto",
              height: "100%",
              bgColor: "gray.50",
              borderRadius: "md",
              border: "1px",
              borderColor: "gray.300",
            },
          }}
          h="calc(100vh - 113px)"
          as={Skeleton}
          isLoaded={!user.loading}
          p="3"
          bgColor="blue.white"
          gap="4"
        >
          {isPhoneQuery ? (
            <MobileTabMenu TabsValues={TabsMenuValues} />
          ) : (
            <TabsMenu TabsValues={TabsMenuValues} />
          )}
          <Stack w="100%" h="100%" isLoaded={!ApplicationLoading}>
            <LazyPageWrapper>
              {ApplicationData?.status === "approved" ? (
                <Outlet />
              ) : (
                <>
                  <Stack
                    gap="8"
                    alignItems="center"
                    justifyContent="center"
                    w="100%"
                    h="100%"
                    as={Skeleton}
                    isLoaded={!ApplicationLoading}
                  >
                    {ApplicationData?.status === "in review" ? (
                      <>
                        <Lottie
                          style={{
                            width: "100%",
                            maxWidth: "500px",
                          }}
                          animationData={AnimationData}
                        />
                        <Heading size="md">
                          Your Application is {ApplicationData?.status}
                        </Heading>
                        <Button
                          onClick={HandleRender}
                          colorScheme="blue"
                          w="100%"
                          maxW="300px"
                        >
                          Refresh
                        </Button>
                      </>
                    ) : (
                      <>
                        <Lottie
                          style={{
                            width: "100%",
                            maxWidth: "500px",
                          }}
                          animationData={AnimationData}
                        />
                        <Heading size="md">Your Application is Refused</Heading>
                        <Button colorScheme="blue" w="100%" maxW="300px">
                          Refresh
                        </Button>
                      </>
                    )}
                  </Stack>
                </>
              )}
            </LazyPageWrapper>
          </Stack>
        </Flex>
      </Stack>
    </TabsMenuExpandProvider>
  );
}
