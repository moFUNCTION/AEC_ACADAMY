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
import {
  getUserData,
  useAuth,
} from "../../../../Context/UserDataProvider/UserDataProvider";
import { LazyPageWrapper } from "../../../../Components/Common/Index";
import { FaUser, FaUsers, FaVideoSlash } from "react-icons/fa";
import { CiUser } from "react-icons/ci";
import { CiVideoOn } from "react-icons/ci";
import { IoAnalyticsOutline } from "react-icons/io5";
import { MdOutlineAssignment } from "react-icons/md";
import { MdOutlinePlayLesson } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import { TfiVideoCamera } from "react-icons/tfi";
import { BiSolidCategory } from "react-icons/bi";
import { FaRegNoteSticky } from "react-icons/fa6";
const TabsMenuValues = [
  {
    title: <Text>Hi {getUserData().name} In The Dashboard</Text>,
    Icon: FaUserCircle,
  },
  {
    title: "Admin Profile",
    Icon: CiUser,
    href: "/user",
  },
  {
    title: "Instructor Applications",
    Icon: FaUsers,
    childsLinks: [
      {
        title: "Pending Applications",
        href: "applications?status=in review",
      },
      {
        title: "Accepted Applications",
        href: "applications?status=accepted",
      },
      {
        title: "Rejected Applications",
        href: "applications?status=rejected",
      },
    ],
  },
  {
    title: "Users",
    Icon: FaUsers,
    childsLinks: [
      {
        title: "Students",
        href: "Users?Role=students",
      },
      {
        title: "Instructors",
        href: "Users?Role=instructors",
      },
      {
        title: "Admins",
        href: "Users?Role=admins",
      },
    ],
  },
  {
    title: "Courses",
    Icon: CiVideoOn,
    href: "courses",
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
  {
    title: "Categories",
    Icon: BiSolidCategory,
    href: "categories",
  },
  {
    title: "Sub Categories",
    Icon: BiSolidCategory,
    href: "sub-categories",
  },
  {
    title: "Assigments Types",
    Icon: FaRegNoteSticky,
    href: "assigments-types",
  },
];

export default function Index() {
  const { user } = useAuth();
  const [isPhoneQuery] = useMediaQuery("(max-width: 900px)");

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

          <Stack w="100%" h="100%">
            <LazyPageWrapper>
              <Outlet />
            </LazyPageWrapper>
          </Stack>
        </Flex>
      </Stack>
    </TabsMenuExpandProvider>
  );
}
