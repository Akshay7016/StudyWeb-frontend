import React, { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';

import Home from 'pages/Home';
import Navbar from 'components/common/Navbar';
import OpenRoute from 'components/core/auth/OpenRoute';
import PrivateRoute from 'components/core/auth/PrivateRoute';
import StudentRoute from 'components/core/auth/StudentRoute';
import InstructorRoute from "components/core/auth/InstructorRoute";
import { store } from 'redux/store';
import Spinner from 'components/common/Spinner'

const Catalog = lazy(() => import('pages/Catalog'));
const CourseDetails = lazy(() => import('pages/CourseDetails'));
const Login = lazy(() => import('pages/Login'));
const Signup = lazy(() => import('pages/Signup'));
const VerifyEmail = lazy(() => import('pages/VerifyEmail'));
const ForgotPassword = lazy(() => import('pages/ForgotPassword'));
const UpdatePassword = lazy(() => import('pages/UpdatePassword'));
const About = lazy(() => import('pages/About'));
const ContactUs = lazy(() => import('pages/ContactUs'));
const Dashboard = lazy(() => import('pages/Dashboard'));
const MyProfile = lazy(() => import('components/core/dashboard/MyProfile'));
const Settings = lazy(() => import('components/core/dashboard/settings'));
const EnrolledCourses = lazy(() => import('components/core/dashboard/EnrolledCourses'));
const Cart = lazy(() => import("components/core/dashboard/cart"));
const AddCourse = lazy(() => import('components/core/dashboard/addCourse'));
const MyCourses = lazy(() => import('components/core/dashboard/MyCourses'));
const EditCourse = lazy(() => import('components/core/dashboard/EditCourse'));
const InstructorDashboard = lazy(() => import('components/core/dashboard/InstructorDashboard/InstructorDashboard'));
const ViewCourse = lazy(() => import('pages/ViewCourse'));
const VideoDetails = lazy(() => import('components/core/viewCourse/VideoDetails'));
const PageNotFound = lazy(() => import('pages/PageNotFound'));

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
              path="/catalog/:catalogName"
              element={
                <Suspense fallback={<Spinner />}>
                  <Catalog />
                </Suspense>
              }
            />

            <Route
              path="/courses/:courseId"
              element={
                <Suspense fallback={<Spinner />}>
                  <CourseDetails />
                </Suspense>
              }
            />

            <Route
              path="/login"
              element={
                <OpenRoute>
                  <Suspense fallback={<Spinner />}>
                    <Login />
                  </Suspense>
                </OpenRoute>
              }
            />

            <Route
              path="/signup"
              element={
                <OpenRoute>
                  <Suspense fallback={<Spinner />}>
                    <Signup />
                  </Suspense>
                </OpenRoute>
              }
            />

            <Route
              path="/verify-email"
              element={
                <OpenRoute>
                  <Suspense fallback={<Spinner />}>
                    <VerifyEmail />
                  </Suspense>
                </OpenRoute>
              }
            />

            <Route
              path="/forgot-password"
              element={
                <OpenRoute>
                  <Suspense fallback={<Spinner />}>
                    <ForgotPassword />
                  </Suspense>
                </OpenRoute>
              }
            />

            <Route
              path="/update-password/:token"
              element={
                <OpenRoute>
                  <Suspense fallback={<Spinner />}>
                    <UpdatePassword />
                  </Suspense>
                </OpenRoute>
              }
            />

            <Route
              path="/about"
              element={
                <Suspense fallback={<Spinner />}>
                  <About />
                </Suspense>
              }
            />

            <Route
              path="/contact"
              element={
                <Suspense fallback={<Spinner />}>
                  <ContactUs />
                </Suspense>
              }
            />

            <Route
              element={
                <PrivateRoute>
                  <Suspense fallback={<Spinner />}>
                    <Dashboard />
                  </Suspense>
                </PrivateRoute>
              }
            >
              <Route
                path="dashboard/my-profile"
                element={
                  <Suspense fallback={<Spinner />}>
                    <MyProfile />
                  </Suspense>
                }
              />

              <Route
                path="dashboard/settings"
                element={
                  <Suspense fallback={<Spinner />}>
                    <Settings />
                  </Suspense>
                }
              />

              <Route
                path="dashboard/enrolled-courses"
                element={
                  <StudentRoute>
                    <Suspense fallback={<Spinner />}>
                      <EnrolledCourses />
                    </Suspense>
                  </StudentRoute>
                }
              />

              <Route
                path="dashboard/cart"
                element={
                  <StudentRoute>
                    <Suspense fallback={<Spinner />}>
                      <Cart />
                    </Suspense>
                  </StudentRoute>
                }
              />

              <Route
                path='dashboard/add-course'
                element={
                  <InstructorRoute>
                    <Suspense fallback={<Spinner />}>
                      <AddCourse />
                    </Suspense>
                  </InstructorRoute>
                }
              />

              <Route
                path='dashboard/my-courses'
                element={
                  <InstructorRoute>
                    <Suspense fallback={<Spinner />}>
                      <MyCourses />
                    </Suspense>
                  </InstructorRoute>
                }
              />

              <Route
                path='dashboard/edit-course/:courseId'
                element={
                  <InstructorRoute>
                    <Suspense fallback={<Spinner />}>
                      <EditCourse />
                    </Suspense>
                  </InstructorRoute>
                }
              />

              <Route
                path='dashboard/instructor'
                element={
                  <InstructorRoute>
                    <Suspense fallback={<Spinner />}>
                      <InstructorDashboard />
                    </Suspense>
                  </InstructorRoute>
                }
              />
            </Route>

            {/* View course Route */}
            <Route
              element={
                <PrivateRoute>
                  <Suspense fallback={<Spinner />}>
                    <ViewCourse />
                  </Suspense>
                </PrivateRoute>
              }
            >
              <Route
                path='view-course/:courseId/section/:sectionId/sub-section/:subSectionId'
                element={
                  <StudentRoute>
                    <Suspense fallback={<Spinner />}>
                      <VideoDetails />
                    </Suspense>
                  </StudentRoute>
                }
              />

            </Route>

            <Route
              path="*"
              element={
                <Suspense fallback={<Spinner />}>
                  <PageNotFound />
                </Suspense>
              }
            />
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  )
}

export default App