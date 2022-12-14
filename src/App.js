import { Provider } from "react-redux";
import { Navigate, redirect,Routes,Route } from "react-router-dom";
// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import ScrollToTop from './components/scroll-to-top';
import { StyledChart } from './components/chart';

import generateStore from "./redux/store";

// ----------------------------------------------------------------------

export default function App() {
  const store = generateStore();
  const user = true
  return (
    <Provider store={store}>
      <ThemeProvider>
        <ScrollToTop />
        <StyledChart />
            <Router />   
      </ThemeProvider>
    </Provider>

  );
}


function AuthProvider ({ children, user }){
  console.log(user)
  if(user)  {
    return children
  }
    return <Navigate to='/login'/>
  
};