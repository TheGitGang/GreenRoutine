import Navigation from './Components/NavComponents/Navigation';
import { Outlet, useLocation } from 'react-router-dom';
import "./App.css"
import { LeavesProvider } from './Components/NavComponents/LeavesContext';
// import { AuthProvider } from './AuthContext';

function App() {
  const location = useLocation();
  const isHomePage = location.pathname === '/'
  return (
      // <AuthProvider>
      <LeavesProvider>
      <>
        <div className={isHomePage? 'home-layout': 'app-layout'}>
          <Navigation />
          <Outlet />
        </div>
      </>
      </LeavesProvider>
      // </AuthProvider>
  )
}






export default App
