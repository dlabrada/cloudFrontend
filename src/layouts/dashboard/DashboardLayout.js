import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import {useDispatch,useSelector} from 'react-redux'
// @mui
import { styled } from '@mui/material/styles';
//
import Header from './header';
import Nav from './nav';


// ----------------------------------------------------------------------

// import{get, postUserCode} from '../../redux/authDucks'

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 92;

const StyledRoot = styled('div')({
  display: 'flex',
  minHeight: '100%',
  overflow: 'hidden',
});

const Main = styled('div')(({ theme }) => ({
  flexGrow: 1,
  overflow: 'auto',
  minHeight: '100%',
  paddingTop: APP_BAR_MOBILE + 24,
  paddingBottom: theme.spacing(10),
  [theme.breakpoints.up('lg')]: {
    paddingTop: APP_BAR_DESKTOP + 24,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}));

// ----------------------------------------------------------------------

export default function DashboardLayout() {

  const user = useSelector(store=>store.auth.userActive)
  const [userLogin,setUserLogin] = useState({
    code: 'user',
    name: 'User User',
    logo: '/assets/images/avatars/avatar_1.jpg',
    email: 'user@user.cl',
    roles:"User",
  }) 

   useEffect(()=>{
    setUserLogin(user)
   },[user])

  const [open, setOpen] = useState(false);

  return (
          <StyledRoot>
           <Header onOpenNav={() => setOpen(true)} user={userLogin}/>
              <Nav openNav={open} onCloseNav={() => setOpen(false)}  user={userLogin} />
              <Main>
                <Outlet />
            </Main>
          </StyledRoot> 
  );
}
