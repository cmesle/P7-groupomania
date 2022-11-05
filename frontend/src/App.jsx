import { Routes, Route } from 'react-router-dom'

import './styles/App.css'

import PrivateRoutes from './components/PrivateRoutes'
/* login components */
import LoginLayout from './pages/LoginLayout'
import Signup from './pages/Signup'
import Login from './pages/Login'
/* posts components */
import PostLayout from './pages/PostLayout'
import Gallery from './pages/Gallery'
import NewPost from './pages/NewPost'
import UpdatePost from './pages/UpdatePost'

import NoPage from './pages/NoPage'




function App() {

  return (
    < Routes >

      <Route path="" element={<LoginLayout />}>
        <Route index element={<Login />} />
        <Route path="signup" element={<Signup />} />
      </Route>

      <Route element={<PrivateRoutes />}>
        <Route path="" element={<PostLayout />}>
          <Route path='gallery' element={<Gallery />} />
          <Route path='newpost' element={<NewPost />} />
          <Route path='updatepost/:id' element={<UpdatePost />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Route>

    </Routes >
  )
}


export default App
