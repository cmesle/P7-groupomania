import { Outlet } from "react-router-dom"

import logo from '../../assets/logo.svg'

import './LoginLayout.css'


function LoginLayout() {
    return (
        <>
            <header className='login-layout__header'>
                <img src={logo} alt='logo Groupomnia' width='100%' />
            </header >

            <Outlet />
        </>
    )
}

export default LoginLayout