import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from "react";
import Layout from "./Pages/Layout/Layout";
// import LayoutSinglePage from "./Pages/Layout/LayoutSinglePage";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import Protected from "./Pages/Protected/Protected";
import { PageLoader } from "./Components/Loader/PageLoader";
import { Suspense } from 'react';

const LayoutForOnePageScreens = React.lazy(() => import('./Pages/Layout/LayoutSinglePage'));
const Signup = React.lazy(() => import('./Pages/Signup/Signup'));
const OTP = React.lazy(() => import('./Pages/OTP/OTP'));
const SetPassword = React.lazy(() => import('./Pages/SetPassword/SetPassword'));

function App() {
  return (

    <BrowserRouter>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path='/' element={<LayoutForOnePageScreens />}>
                <Route path='' element={<Login />} />
                 <Route path='signup' element={<Signup/>} />
                 <Route path='otp' element={<OTP/>} />
                 <Route path='setpassword' element={<SetPassword/>} />
               {/* <Route path='changePassword' element={<ProtectedRoute><ChangePassword /></ProtectedRoute>} />
                <Route path='forgotPassword' element={<ForgotPassword />} /> */}
                {/* <Route path='*' element={<NotFound />} /> */}
              </Route>

              {/* <Route path='/dashboard' element={<ProtectedRoute><DefaultLayout /></ProtectedRoute>}>
                <Route path='' element={<Progress />} />
                <Route path='profile' element={<Profile />} />
                <Route path='admin' element={<ProtectedAdmin><Employee /></ProtectedAdmin>} />
                <Route path='admin/attendance/:id' element={<ProtectedAdmin><Attendance /></ProtectedAdmin>} />
                <Route path='admin/register' element={<ProtectedAdmin><Register /></ProtectedAdmin>} />
                <Route path='admin/viewInformation/:id' element={<ProtectedAdmin><ViewInformation /></ProtectedAdmin>} />
              </Route> */}
            </Routes>
          </Suspense>
        </BrowserRouter>




    // <BrowserRouter>
    // <Routes>
    //   <Route path="/" element={<Layout/>}>
    //     <Route index element={<Login/>}/>
    //     <Route path="text-analyze" element={<Protected children={<Home />} />}/>
    //   </Route>
    // </Routes>
    // </BrowserRouter>
  );
}

export default App;
