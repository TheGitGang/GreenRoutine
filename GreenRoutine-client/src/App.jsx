import Navigation from './Components/Navigation';
import { Outlet, useLocation } from 'react-router-dom';
import "./App.css"
// import { AuthProvider } from './AuthContext';

function App() {
  const location = useLocation();
  const isHomePage = location.pathname === '/'
  return (
      // <AuthProvider>
      <>
        <div className={isHomePage? 'home-layout': 'app-layout'}>
          <Navigation />
          <Outlet />
        </div>
      </>
      // </AuthProvider>
  )
}






export default App
