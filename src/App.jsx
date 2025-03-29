import { createBrowserRouter,Outlet,RouterProvider } from 'react-router-dom'
import HomePage from './components/HomePage'
import './App.css'
import About from './components/About'
import NavBar from './components/NavBar'
import StudentLogin from './components/StudentLogin'
import StudentRegister from './components/StudentRegister'


function App() {

  const Layout = ()=>{
    return(

      <>
      <NavBar/>
      <div className="main-content"></div>
      <Outlet/>
    </>
)
  }
  
const router = createBrowserRouter([
  {
    path:'/',
    element:<Layout/>,
    children:[
      {
        path:'/',
        element:<HomePage/>
      },
      {
        path:'/About',
        element:<About/>
      },
      {
        path:'/StudentLogin',
        element:<StudentLogin/>
      },
      {
        path:"/StudentRegister",
        element:<StudentRegister/>
      }
    ],
  }
])

  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App
