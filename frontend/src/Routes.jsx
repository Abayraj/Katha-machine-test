import { HashRouter as Router, Routes, Route } from "react-router-dom";
import React, { lazy, Suspense } from "react";

// Lazy load components
const Home = lazy(() => import('./pages/Home/Home'));
const AdminPanel = lazy(() => import('./pages/AdminPanel/AdminPanel'));
const EditData = lazy(() => import('./pages/AdminPanel/EditData'));
const AddNews = lazy(() => import('./pages/AdminPanel/AddNews'));
const SignUp = lazy(() => import('./pages/AuthPages/SignUp'));
const Login = lazy(() => import('./pages/AuthPages/Login'));
const ResetPassword = lazy(() => import("./pages/AuthPages/ResetPassword"));
const Error = lazy(() => import("./pages/Home/Error404"));
const ProtectedRoute = lazy(() => import("./service/Protected.jsx"));
const ErrorPage = lazy(() => import("./pages/ErrorPage"));

function Routers() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<ProtectedRoute element={AdminPanel} roles={['admin']} />} />
          <Route path="/api/get/:id" element={<ProtectedRoute element={EditData} roles={['admin']} />} />
          <Route path="/addnews" element={<ProtectedRoute element={AddNews} roles={['admin']} />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="*" element={<Error />} />
          <Route path="/error" element={<ErrorPage />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default Routers;
