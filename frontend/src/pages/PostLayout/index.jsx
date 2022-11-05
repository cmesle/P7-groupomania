import { useState, useEffect } from 'react'
import { Outlet } from "react-router-dom"
import axios from 'axios'

import Header from "../../components/Header"

import './PostLayout.css'


function PostLayout() {
    
    const userId = localStorage.getItem('user')
    const [usersList, setUsersList] = useState()
    const [userPseudo, setUserPseudo] = useState()
    const [userRole, setUserRole] = useState()

    useEffect(() => {
        async function getAllUsers() {
            await axios.get('http://localhost:3001/api/auth/user')
                .then(res => {
                    setUsersList(res.data)
                    setUserPseudo(res.data.filter(users => users._id === userId)[0].pseudo)
                    setUserRole(res.data.filter(users => users._id === userId)[0].role)
                })
                .catch(err => console.log(err))
        }
        getAllUsers()
    }, [])


    return (
        <>
            <Header userPseudo={userPseudo} userRole={userRole}/>
            <Outlet context={{usersList, userRole}} />
        </>
    )

}

export default PostLayout