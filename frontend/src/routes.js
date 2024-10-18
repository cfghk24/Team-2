// import
import Home from "views/Pages/Dashboard";
import FindEvents from "views/Pages/FindEvents";
import ManageRSVP from "views/Pages/ManageRSVP";
import RTLPage from "views/Pages/RTL";
import Profile from "views/Pages/Profile";
import SignIn from "views/Auth/SignIn.js";
import SignUp from "views/Auth/SignUp.js";

import {
  HomeIcon,
  StatsIcon,
  CreditIcon,
  PersonIcon,
  DocumentIcon,
  RocketIcon,
  ClockIcon,
  SettingsIcon,
  SupportIcon
} from "components/Icons/Icons";

var dashRoutes = [
  {
    path: "/home",
    name: "Home",
    icon: <HomeIcon color="inherit" />,
    component: Home,
    layout: "/admin",
  },
  {
    path: "/find-events",
    name: "Find Events",
    icon: <ClockIcon color="inherit" />,
    component: FindEvents,
    layout: "/admin",
  },
  {
    path: "/manage-rsvp",
    name: "Manage RSVP",
    icon: <SettingsIcon color="inherit" />,
    component: ManageRSVP,
    layout: "/admin",
  },
  // {
  //   name: "Admin Panel",
  //   category: "account",
  //   state: "pageCollapse",
  //   views: [
  //     {
  //       path: "/admin-add-events",
  //       name: "Add Events",
  //       icon: <DocumentIcon color="inherit" />,
  //       component: Profile,
  //       layout: "/admin",
  //     },
  //     {
  //       path: "/admin-manage-events",
  //       name: "Moderate Events",
  //       icon: <SupportIcon color="inherit" />,
  //       component: Profile,  // you can replace Profile with the actual admin component
  //       layout: "/admin",
  //     },
  //   ],
  // },
  // Hidden routes for Sign In and Sign Up (not part of dashboard menu)
  {
    path: "/signin",  // sign in route
    component: SignIn,
    layout: "/auth",
    hidden: true,  // This will not be displayed in the dashboard
  },
  {
    path: "/signup",  // sign up route
    component: SignUp,
    layout: "/auth",
    hidden: true,  // This will not be displayed in the dashboard
  },
];

export default dashRoutes;
