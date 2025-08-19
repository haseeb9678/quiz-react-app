import React from 'react'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import RootLayout from './layouts/RootLayout/RootLayout'
import Home from './pages/Home/Home'
import Quiz from './pages/Quiz/Quiz'
import QuizResult from './admin/QuizResult/QuizResult'
import UserPage from './pages/UserPage/UserPage'
import APICategory from './pages/APICategory/APICategory'
import ErrorPage from './pages/ErrorPage/ErrorPage'

const App = () => {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path='category' element={<APICategory />} />
        <Route path='quiz' element={<Quiz />} />
        <Route path='result' element={<QuizResult />} />
        <Route path='user' element={<UserPage />} />
        <Route path='*' element={<ErrorPage />} />

      </Route>
    )
  )

  return (
    <RouterProvider router={router} />
  )
}

export default App