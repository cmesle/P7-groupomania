import { Link } from 'react-router-dom'

import LoginForm from '../../components/LoginForm'

import '../../styles/main.css'

const baseURL = 'http://localhost:3001/api/auth/signup'
const navigate = '/'
const buttonName = 'créer mon compte'

function Signup() {
    return (
        <main>
            <Link className="toggleForm" to="/">déjà inscrit ? Vous connecter</Link>

            <LoginForm
                baseURL={baseURL}
                buttonName={buttonName}
                navigateTo={navigate}
            />
        </main>
    )
}

export default Signup
