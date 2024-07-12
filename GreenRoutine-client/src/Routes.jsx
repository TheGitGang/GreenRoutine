import { createBrowserRouter } from 'react-router-dom'
import App from './App.jsx'


import DataComponent from './Components/ExternalApiTester/Data.jsx'
import VehicleMake from './Components/Carbonfootprint.jsx'
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
import CarProfile from './Components/CarProfile.jsx'
import Leaderboard from './Components/Leaderboard.jsx'
import FriendProfile from './Components/FriendProfile.jsx'


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
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
        path: '/about2/',
        element: <About2 />
      },
      {
        path: '/challenges',
        element: <Challenges />,
        children: [
          {
            path: 'create',
            element: <CreateChallenge />
          },
          {
            path: 'delete',
            element: <DeleteChallenge />
          }
        ]
      },
      {
        path: '/leaderboard',
        element: <Leaderboard />
      },
      {
        path: '/data',
        element: <DataComponent />
      },
      {
        path: '/profile',
        element: <Profile />
      },
      {
        path: '/register',
        element: <RegisterForm />
      },
      {
        path: '/login',
        element: <LoginForm />
      },
      {
        path: '/leaves',
        element: <Leaves />
      },
      {
        path: '/carprofile',
        element: <CarProfile />
      },
      {
        path: '/test',
        element: <VehicleMake/>
      },
      {
        path: '/friend-profile/:id',
        element: <FriendProfile/>
      }
    ]
  }
])

export default router;