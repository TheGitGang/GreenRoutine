import { createBrowserRouter } from 'react-router-dom'
import App from './App.jsx'


import DataComponent from './Components/ExternalApiTester/Data.jsx'

import Home from './Components/Home.jsx'
import About from './Components/About.jsx'
import About2 from './Components/About2.jsx'
import Challenges from './Components/Challenges.jsx'
import CreateChallenge from './Components/CreateChallenge.jsx'
import Profile from './Components/Profile.jsx'
import ErrorPage from './ErrorPage.jsx'
import Leaves from './Components/Leaves.jsx'
import DeleteChallenge from './Components/DeleteChallenge.jsx'
import RegisterForm from './Components/RegisterForm.jsx'
import LoginForm from './Components/LoginForm.jsx'
import Leaderboard from './Components/Leaderboard.jsx'


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
        path: '/about2/2b1d0cd5-59be-4010-83b3-b60c5e5342da',
        element: <About2 />
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
        path: '/leaderboard',
        element: <Leaderboard />
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