
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/Auth/Login'
import ForgotPassword from './pages/Auth/ForgotPassword';
import VerifyOTP from './pages/Auth/VerifyOTP';
import ChangePassword from './pages/Auth/ChangePassword';
import Dashboard from './pages/Main/Dashboard';
import MainLayout from './layouts/MainLayout';
import Referrals from './pages/Main/Referrals';
import Appointments from './pages/Main/Appointments';
import Results from './pages/Main/Result';
import Tests from './pages/Main/Tests';
import Category from './pages/Main/Tests/Category';
import Referrers from './pages/Main/Referrers';
import Rebate from './pages/Main/Rebate'
import Profile from './pages/Main/Profile';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { QueryClient, QueryClientProvider } from 'react-query';
import Report from './pages/Main/Report';
import UserLog from './pages/Main/UserLog';

export const queryClient = new QueryClient();
function App() {

  const mainRoutes = [
    {
      path:'/dashboard',
      Component:Dashboard,
    },
    {
      path:'/referrals',
      Component:Referrals,
    },
    {
      path:'/appointments',
      Component:Appointments,
    },
    {
      path:'/results',
      Component:Results,
    },
    {
      path:'/tests',
      Component:Tests,
    },
    {
      path:'/settings/:test-id',
      Component:Category,
    },
    {
      path:'/referrers',
      Component:Referrers,
    },
    {
      path:'/rebates',
      Component:Rebate,
    },
    {
      path:'/settings',
      Component:Profile,
    },
    {
      path:'/user-log',
      Component:UserLog,
    },
    {
      path:'/report',
      Component:Report,
    },
  ]

  return ( 
    <>
      <ToastContainer
    theme="colored"
    hideProgressBar
    pauseOnHover
    draggable
    autoClose={5000}
    closeOnClick={true}

    stacked={false}
    position="top-right"
  />
    <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <Routes>
        <Route path='/' Component={Login} />
        <Route path='/forgot-password' Component={ForgotPassword} />
        <Route path='/verify-otp' Component={VerifyOTP} />
        <Route path='/change-password' Component={ChangePassword} />
        <Route path='/' Component={MainLayout} >
          {
            mainRoutes.map((item,idx) => (
              <Route key={idx} path={item.path} Component={item.Component} />
              )
            )
          }
        </Route>
      </Routes>

    </BrowserRouter>
  </QueryClientProvider>
    </>
  )
}

export default App
