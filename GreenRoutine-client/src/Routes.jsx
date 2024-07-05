import { createBrowserRouter } from 'react-router-dom'
import App from './App.jsx'


import DataComponent from './components/ExternalApiTester/Data.jsx'

import Home from './Components/Home.jsx'
import About from './Components/About.jsx'
import Challenges from './Components/Challenges.jsx'
import CreateChallenge from './Components/CreateChallenge.jsx'
import Profile from './Components/Profile.jsx'
import ErrorPage from './ErrorPage.jsx'
import Leaves from './Components/Leaves.jsx'
import DeleteChallenge from './Components/DeleteChallenge.jsx'
import RegisterForm from './Components/RegisterForm.jsx'
import LoginForm from './Components/LoginForm.jsx'


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage/>,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/about',
        element: <About />
      },
      {
        path: '/challenges',
        element: <Challenges />
      },
      {
        path: '/challenges/create',
        element: <CreateChallenge/>
      },
      {
        path: '/challenges/delete',
        element: <DeleteChallenge/>
      },
      {
        path: '/data',
        element: <DataComponent/>
      },
      {
        path: '/profile',
        element: <Profile/>
      },
      {
        path: '/register',
        element: <RegisterForm/>
      },
      {
        path: '/login',
        element: <LoginForm/>
      },
      {
        path: '/leaves',
        element: <Leaves />
      }
    ]
  }
])

export default router;