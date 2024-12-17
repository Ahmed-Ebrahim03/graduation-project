import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useAtom } from 'jotai';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Summaries from './pages/Summaries';
import SummaryDetail from './pages/SummaryDetail';
import NewSummary from './pages/NewSummary';
import { userAtom } from './store/auth';
import { getCurrentUser } from './lib/auth';

const queryClient = new QueryClient();

export default function App() {
  const [, setUser] = useAtom(userAtom);

  useEffect(() => {
    getCurrentUser().then((user) => {
      setUser(user);
    });
  }, [setUser]);

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/summaries"
              element={
                <ProtectedRoute>
                  <Summaries />
                </ProtectedRoute>
              }
            />
            <Route
              path="/summaries/new"
              element={
                <ProtectedRoute>
                  <NewSummary />
                </ProtectedRoute>
              }
            />
            <Route
              path="/summaries/:id"
              element={
                <ProtectedRoute>
                  <SummaryDetail />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Layout>
      </BrowserRouter>
    </QueryClientProvider>
  );
}