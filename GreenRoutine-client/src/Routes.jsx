import { createBrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import Home from './Components/Home.jsx'
import About from './Components/About.jsx'
import Challenges from './Components/Challenges.jsx'
import Profile from './Components/Profile.jsx'
import ErrorPage from './ErrorPage.jsx'
import Fetch from './components/Fetch.jsx'
//import Friends from './Components/Friends.jsx'

///dummy data for profile///
import profileImg from './assets/images/ProfilePlaceholder.jpg'
<<<<<<< HEAD
import RegisterForm from './Components/RegisterForm.jsx'
=======
import CreateChallenge from './components/CreateChallenge.jsx'
>>>>>>> f87920ae9cdc5de85b33a0c8dbaf95197eb15d10
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
        path: '/createchallenge',
        element: <CreateChallenge/>
      },
      {
        path: '/profile',
        element: <Profile name={name} title={title} profileImg={profileImg}/>
      },
      {
<<<<<<< HEAD
        path: '/register',
        element: <RegisterForm/>
      },
=======
        path: '/fetch',
        element: <Fetch />
      },
    //   {
    //     path: '/friends',
    //     element: <Friends/>
    //   }
>>>>>>> f87920ae9cdc5de85b33a0c8dbaf95197eb15d10
    ]
  }
])

export default router;