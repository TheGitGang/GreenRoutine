import { createBrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import Home from './Components/Home.jsx'
import About from './Components/About.jsx'
import Challenges from './Components/Challenges.jsx'
import CreateChallenge from './Components/CreateChallenge.jsx'
import Profile from './Components/Profile.jsx'
import ErrorPage from './ErrorPage.jsx'
//import Fetch from './Components/Fetch.jsx'
//import Friends from './Components/Friends.jsx'
import RegisterForm from './Components/RegisterForm.jsx'
import LoginForm from './Components/LoginForm.jsx'

///dummy data for profile///
import profileImg from './assets/images/ProfilePlaceholder.jpg'
const name = 'Kevin Baranowski';
const title = 'Lead Developer';

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
        element: <CreateChallenge/>
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