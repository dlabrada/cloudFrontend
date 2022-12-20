import { useDispatch, useSelector } from 'react-redux';
import { useEffect,useState } from 'react';
import { Navigate, Outlet, useRoutes } from 'react-router-dom';



// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
import LoginPage from './pages/Auth/LoginPage';
import Page404 from './pages/Page404';
import DashboardAppPage from './pages/Dashboard/DashboardAppPage';
import {TrafficligthPage,
        CreateTrafficligthPage,
        EditTrafficligthPage,
        DeleteTrafficligthPage,
        OrganizationPage,
        CreateOrganizationPage,
        EditOrganizationPage,
        DeleteOrganizationPage,
        UserPage,
        DeleteUserPage,
        CreateUserPage,
        EditUserPage} 
        from './pages';
import LogsPage from './pages/Log/LogsPage';
import DetailsPage from './pages/Log/DetailsPage';
import MapsPage from './pages/Maps/MapsPage';
import ProfilePage from './pages/Profile/ProfilePage';
import { getValidate } from './redux/authDucks';



// ----------------------------------------------------------------------


export default function Router() {

  let validate = useSelector(store=>store.auth.errorA)
  const dispatch = useDispatch()
  const user = JSON.parse(localStorage.getItem('usuario'))

const AuthProvider = ({ children, user, ruta='/login' })=>{
   dispatch(getValidate()) 
  if(localStorage.getItem('authToken') && !validate ){
    return <Outlet/>
 }
   validate=""
   return <Navigate to={ruta}/>
};
const AuthProviderOperator = ({ children, user, ruta='/login' })=>{
  dispatch(getValidate()) 
 if(localStorage.getItem('authToken') && !validate ){
   if(user.roles==="Operator"|| user.roles==="Admin"||user.roles==="SAdmin")
   return <Outlet/>
}
  validate=""
  return <Navigate to={ruta}/>
};


const AuthProviderSAdmin = ({ children, user, ruta='/login' })=>{
  console.log("administrador")
  dispatch(getValidate()) 
 if(localStorage.getItem('authToken') && !validate ){
   if(user.roles==="SAdmin")
   return <Outlet/>
}
  validate=""
  return <Navigate to={ruta} />
};

const AuthProviderAdmin = ({ children, user, ruta='/login' })=>{
  dispatch(getValidate()) 
 if(localStorage.getItem('authToken') && !validate ){
   if(user.roles==="Admin"||user.roles==="SAdmin")
   return <Outlet/>
}
  validate=""
  return <Navigate to={ruta}  />
};

  const routes = useRoutes([
    {
      element:<AuthProvider user={user}/>,
      children:[
        // Usuarios Basicos 
        {
          path: '/',
          element: <DashboardLayout />,
          children: [
            { element: <Navigate to="/dashboard" />, index: true },
            { path: 'dashboard', element: <DashboardAppPage /> },
            { path: 'logs', element: <LogsPage /> },
            { path: 'details', element: <DetailsPage/> },
            { path: 'maps', element: <MapsPage /> },
            { path: 'profile', element: <ProfilePage /> },
            { path: '404', element: <Page404 /> },
            { path:'*', element: <Navigate to="404" replace /> },
          ],
        }
      ]
    }
    ,
    {
      element:<AuthProviderOperator user={user}/>,
      children:[
        // Usuarios Operadores/Admin/SAdmin
        {
          path: '/',
          element: <DashboardLayout  />,
          children: [
            { element: <Navigate to="/user" />, index: true },
            { path: 'user', element: <UserPage /> },
            { path: 'organization', element: <OrganizationPage /> },
            { path: 'trafficligth', element: <TrafficligthPage /> },   
            { path: '404', element: <Page404 /> },
            { path:'*', element: <Navigate to="404" /> },
          ],
        },
      ]
    },
    {
      element:<AuthProviderAdmin user={user}/>,
      children:[
        // Usuarios administradores
        {
          path: '/',
          element: <DashboardLayout  />,
          children: [
            { element: <Navigate to="/user" />, index: true },
            { path: 'user', element: <UserPage /> },
            { path:'usercreate', element:<CreateUserPage user ={user}/>},
            { path:'useredit', element:<EditUserPage />},
            { path: 'organization', element: <OrganizationPage /> },
            { path: 'organizationcreate', element: <CreateOrganizationPage /> },
            { path: 'organizationedit', element: <EditOrganizationPage /> },
            { path: 'trafficligth', element: <TrafficligthPage /> },
            { path: 'trafficligthcreate', element: <CreateTrafficligthPage /> },
            { path: 'trafficligthedit', element: <EditTrafficligthPage /> },
            { path: '404', element: <Page404 /> },
            { path:'*', element: <Navigate to="404" /> },
          ],
        },
      ]
    },
    {
      element:<AuthProviderSAdmin user={user}/>,
      children:[
        // Usuarios administradores
        {
          path: '/',
          element: <DashboardLayout  />,
          children: [
            { element: <Navigate to="/user" />, index: true },
            { path:'userdelete', element:<DeleteUserPage/>},
            { path: 'organizationdelete', element: <DeleteOrganizationPage /> },
            { path: 'trafficligthdelete', element: <DeleteTrafficligthPage /> },       
            { path: '404', element: <Page404 /> },
            { path:'*', element: <Navigate to="404" /> },
          ],
        },
              ]

    },
  
    {
      path: '/login',
      element: <LoginPage />,
    },
    {
   
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/dashboard" />, index: true },
        { path: '404', element: <Page404 /> },
        { path:'*', element: <Navigate to="404" /> },
     
      ],
    },
  ]);

  
  return routes;
}

