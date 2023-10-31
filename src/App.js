import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';

import Home from 'pages/Home';
import PageNotFound from 'pages/PageNotFound';
import Login from 'pages/Login';
import Signup from 'pages/Signup';
import ForgotPassword from 'pages/ForgotPassword';
import UpdatePassword from 'pages/UpdatePassword';
import VerifyEmail from 'pages/VerifyEmail';
import About from 'pages/About';
import Dashboard from 'pages/Dashboard';
import ContactUs from 'pages/ContactUs';
import Navbar from 'components/common/Navbar';
import OpenRoute from 'components/core/auth/OpenRoute';
import PrivateRoute from 'components/core/auth/PrivateRoute';
import StudentRoute from 'components/core/auth/StudentRoute';
import InstructorRoute from "components/core/auth/InstructorRoute";
import MyProfile from 'components/core/dashboard/MyProfile';
import Settings from 'components/core/dashboard/settings';
import EnrolledCourses from 'components/core/dashboard/EnrolledCourses';
import Cart from "components/core/dashboard/cart";
import AddCourse from 'components/core/dashboard/addCourse';
import { MyCourses } from 'components/core/dashboard/MyCourses'
import { EditCourse } from 'components/core/dashboard/EditCourse';
import { store } from 'redux/store';

const App = () => {
  return (
    <div className='w-screen min-h-screen bg-richblack-900 flex flex-col font-inter'>
      <Provider store={store}>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route
              path="/"
              element={<Home />}
            />

            <Route
              path="/login"
              element={
                <OpenRoute>
                  <Login />
                </OpenRoute>
              }
            />

            <Route
              path="/signup"
              element={
                <OpenRoute>
                  <Signup />
                </OpenRoute>
              }
            />

            <Route
              path="/verify-email"
              element={
                <OpenRoute>
                  <VerifyEmail />
                </OpenRoute>
              }
            />

            <Route
              path="/forgot-password"
              element={
                <OpenRoute>
                  <ForgotPassword />
                </OpenRoute>
              }
            />

            <Route
              path="/update-password/:token"
              element={
                <OpenRoute>
                  <UpdatePassword />
                </OpenRoute>
              }
            />

            <Route
              path="/about"
              element={<About />}
            />

            <Route
              path="/contact"
              element={<ContactUs />}
            />

            <Route
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            >
              <Route path="dashboard/my-profile" element={<MyProfile />} />
              <Route path="dashboard/settings" element={<Settings />} />
              <Route
                path="dashboard/enrolled-courses"
                element={
                  <StudentRoute>
                    <EnrolledCourses />
                  </StudentRoute>}
              />
              <Route
                path="dashboard/cart"
                element={
                  <StudentRoute>
                    <Cart />
                  </StudentRoute>
                }
              />

              <Route
                path='dashboard/add-course'
                element={
                  <InstructorRoute>
                    <AddCourse />
                  </InstructorRoute>
                }
              />

              <Route
                path='dashboard/my-courses'
                element={
                  <InstructorRoute>
                    <MyCourses />
                  </InstructorRoute>
                }
              />

              <Route
                path='dashboard/edit-course/:courseId'
                element={
                  <InstructorRoute>
                    <EditCourse />
                  </InstructorRoute>
                }
              />
            </Route>

            <Route
              path="*"
              element={<PageNotFound />}
            />
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  )
}

export default App