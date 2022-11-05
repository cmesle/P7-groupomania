import { Navigate, Outlet } from 'react-router-dom'

function PrivateRoutes() {

    const auth = localStorage.getItem('token')

    return (
        auth ? <Outlet /> : <Navigate to='/' replace />
    )
}

export default PrivateRoutes