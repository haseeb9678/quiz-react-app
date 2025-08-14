import React from 'react'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import RootLayout from './layouts/RootLayout/RootLayout'
import Home from './pages/Home/Home'
import AdminPage from './admin/AdminPage/AdminPage'
import QuizCreate from './admin/QuizCreate/QuizCreate'

const App = () => {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path='admin' element={<AdminPage />} />
        <Route path='quizCreate' element={<QuizCreate />} />
      </Route>
    )
  )

  return (
    <RouterProvider router={router} />
  )
}

export default App