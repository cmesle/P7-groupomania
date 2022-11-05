import React from 'react'
import { Link } from 'react-router-dom'

import LoginForm from '../../components/LoginForm'
import '../../styles/main.css'

const baseURL = 'http://localhost:3001/api/auth/login'
const navigateTo = '../gallery'
const buttonName = 'connexion'

function Login() {
    return (
        <main>
            <Link className="toggleForm" to="/signup">
                pas encore inscrit ? Créer votre compte
            </Link>

            <LoginForm
                baseURL={baseURL}
                buttonName={buttonName}
                navigateTo={navigateTo}
            />
        </main>
    )
}

export default Login
