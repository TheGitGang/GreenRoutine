import { createBrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import Home from './components/Home.jsx'
import About from './components/About.jsx'
import Challenges from './components/Challenges.jsx'
//import CreateChallenge from './Components/CreateChallenge.jsx'
import Profile from './components/Profile.jsx'
import ErrorPage from './ErrorPage.jsx'
//import Fetch from './Components/Fetch.jsx'
//import Friends from './Components/Friends.jsx'

///dummy data for profile///
import profileImg from './assets/images/ProfilePlaceholder.jpg'
import CreateChallenge from './components/CreateChallenge.jsx'
import RegisterForm from './components/RegisterForm.jsx'
import LoginForm from './components/LoginForm.jsx'

import DataComponent from './components/ExternalApiTester/Data.jsx'

const name = 'Kevin Baranowski';
const title = 'Lead Developer';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App name={name}/>,
    errorElement: <ErrorPage name={name}/>,
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
        element: <CreateChallenge/>
      },
      {
        path: '/data',
        element: <DataComponent/>
      },
      {
        path: '/profile',
        element: <Profile name={name} title={title} profileImg={profileImg}/>
      },
      {
        path: '/register',
        element: <RegisterForm/>
      },
      {
        path: '/login',
        element: <LoginForm/>
      }
    ]
  }
])

export default router;