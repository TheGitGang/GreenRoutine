import { createBrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import Home from './Components/Home.jsx'
import About from './Components/About.jsx'
import Challenges from './Components/Challenges.jsx'
import Profile from './Components/Profile.jsx'
import ErrorPage from './ErrorPage.jsx'
import Fetch from './Components/Fetch.jsx'
//import Friends from './Components/Friends.jsx'

///dummy data for profile///
import profileImg from './assets/images/ProfilePlaceholder.jpg'
import CreateChallenge from './Components/CreateChallenge.jsx'
import RegisterForm from './Components/RegisterForm.jsx'

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
        path: '/profile',
        element: <Profile name={name} title={title} profileImg={profileImg}/>
      },
      {
        path: '/register',
        element: <RegisterForm/>
      },
    ]
  }
])

export default router;