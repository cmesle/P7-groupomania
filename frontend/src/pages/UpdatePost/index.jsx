import { useEffect } from 'react'
import axios from 'axios'

import PostForm from '../../components/PostForm'


function UpdatePost() {
    const token = localStorage.getItem('token')

    const baseURL = 'http://localhost:3001/api/post'
    const PTU = localStorage.getItem('PTU')

    const requestOptions = {
        headers: { 'Authorization': 'Bearer ' + token }
    }

    useEffect(() => {
        axios.get(baseURL + '/' + PTU, requestOptions)
    }, [])

    return <PostForm
                titleToDisplay='Modifier votre publication'
                buttonName='enregistrer'
                navigateTo={'../../gallery'}
             />
}

export default UpdatePost
