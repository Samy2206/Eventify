import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import HomePage from "./components/HomePage";
import "./App.css";
import About from "./components/About";
import NavBar from "./components/NavBar";
import StudentLogin from "./components/StudentLogin";
import EventPage from "./components/MainPage/EventPage";
import CollegeLogin from "./components/CollegeLogin";
import RegistrationDetails from "./components/RegistrationDetails";
import CollegeDashboard from "./components/CollegeDashboard";
import AddEvent from "./components/CollegeDashboard/AddEvent";
import ViewEvent from "./components/MainPage/ViewEvent";
import RegisterEvent from "./components/MainPage/RegisterEvent";
import VerifyStudent from "./components/CollegeDashboard/VerifyStudent";
import VerifyStudentList from "./components/CollegeDashboard/VerifyStudentList";
import ViewRequest from "./components/CollegeDashboard/ViewRequest";
import RegisteredList from "./components/MainPage/RegisteredList";
import { path } from "framer-motion/client";
import AdminLogin from "./components/AdminLogin";
import Wishlist from "./components/MainPage/Wishlist";

function App() {
  const LayoutUnverified = () => {
    return (
      <>
        <NavBar  user={"User"}/>
        <div className="main-content"></div>
        <Outlet/>
      </>
    );
  };

  const LayoutVerifiedStudent = () => {
    return (
      <>
        <NavBar user={"Student"}/>
        <div className="main-content"></div>
        <Outlet/>
      </>
    );
  };

  const LayoutVerifiedCollege = () =>{
    return(
      <>
        <NavBar user={"College"}/>
        <div className="main-content"></div>
        <Outlet/>
      </>
    )
  }

  const LayoutVerifiedAdmin = () =>{
    return(
      <>
        <NavBar user={"Admin"}/>
        <div className="main-content"></div>
        <Outlet/>
      </>
    )
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: <LayoutUnverified />,
      children: [
        {
          path: "/",
          element: <HomePage />,
        },
        {
          path: "About",
          element: <About />,
        },
        {
          path: "StudentLogin",
          element: <StudentLogin />,
        },
        {
          path: "CollegeLogin",
          element: <CollegeLogin />,
        },
        {
          path: "RegistrationDetails",
          element: <RegistrationDetails />,
        },
        {
          path:'AdminLogin',
          element:<AdminLogin/>
        }
      ],
    },
    {
      path: "/EventPage",
      element: <LayoutVerifiedStudent />,
      children: [
        {
          path:'',
          element:<EventPage/>
        },
        {
          path:'ViewEvent',
          element:<ViewEvent/>,
        },
        {
          path:'RegisterEvent',
          element:<RegisterEvent/>
        },
        {
          path:'RegisteredList',
          element:<RegisteredList/>
        },
        {
          path:'Wishlist',
          element:<Wishlist/>
        },
      ],
    },
    {
      path:"/CollegeDashBoard",
      element:<LayoutVerifiedCollege/>,
      children:[
        {
          path:"",
          element:<CollegeDashboard/>
        },
        {
          path:"AddEvent",
          element:<AddEvent/>
        },
        {
          path:'VerifyStudent',
          element:<VerifyStudent/>,
        },
        {
          path:'VerifyStudentList',
          element:<VerifyStudentList/>
        },
        {
          path:'ViewRequest',
          element:<ViewRequest/>
        }
      ]
    },
    {
      path:'/AdminDashboard',
      element:<LayoutVerifiedAdmin/>,
      children:[
        {
          path:'',
          element:''
        }
      ]
    }
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
