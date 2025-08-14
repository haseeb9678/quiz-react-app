import React from 'react'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import RootLayout from './layouts/RootLayout/RootLayout'
import Home from './pages/Home/Home'
import AdminPage from './admin/AdminPage/AdminPage'
import QuizCreate from './admin/QuizCreate/QuizCreate'
import Quiz from './pages/Quiz/Quiz'
import QuizResult from './admin/QuizResult/QuizResult'

const App = () => {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path='admin' element={<AdminPage />} />
        <Route path='quizCreate' element={<QuizCreate />} />
        <Route path='quiz' element={<Quiz />} />
        <Route path='result' element={<QuizResult />} />
      </Route>
    )
  )

  return (
    <RouterProvider router={router} />
  )
}

export default App