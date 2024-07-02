import { createBrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import Home from './components/Home.jsx'
import About from './components/About.jsx'
import Challenges from './components/Challenges.jsx'
import Profile from './components/Profile.jsx'
import ErrorPage from './ErrorPage.jsx'
//import Friends from './Components/Friends.jsx'

///dummy data for profile///
import profileImg from './assets/images/ProfilePlaceholder.jpg'
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
        path: '/profile',
        element: <Profile name={name} title={title} profileImg={profileImg}/>
      },
    //   {
    //     path: '/friends',
    //     element: <Friends/>
    //   }
    ]
  }
])

export default router;