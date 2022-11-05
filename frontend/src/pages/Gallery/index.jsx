
import { useState, useEffect, useContext } from 'react'
import { useNavigate, useOutletContext } from 'react-router-dom'
import axios from 'axios'
import { FilterContext, RefreshContext } from '../../utils/context'

import PostCard from '../../components/PostCard'

import './gallery.css'

function Gallery() {

    const [postsList, setPostsList] = useState([])
    const { refresh } = useContext(RefreshContext)
    const { filter } = useContext(FilterContext)
    const user = localStorage.getItem('user')
    const { userRole } = useOutletContext()
    const navigate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem('token')
        const requestOptions = {
            headers: { 'Authorization': 'Bearer ' + token }
        }

        axios.get('http://localhost:3001/api/post', requestOptions)
            .then((res) => {
                    filter === 'myPosts' ? (
                        setPostsList(res.data.filter(function (el) {
                            return el.userId === user
                        }))
                    ) : (setPostsList(res.data))
            })
            .catch(err => {
                alert(err)
                navigate('/')
            })
    }, [filter, refresh])


    return (


        <main>
            {!postsList[0] ?
                (
                    (userRole === 'admin')? (
                        <div className='postsContainer'><h1>pas encore de publication</h1></div>) : (
                            <div className='postsContainer'><h1>un peu vide, non ? Publiez !</h1></div>)
                ) : (
                    (<div className='postsContainer'>
                        {postsList.map(
                            (post) => (
                                <PostCard
                                    key={post._id}
                                    post={post}
                                />
                            )
                        )}
                    </div>)
                )
            }
        </main >

    )
}

export default Gallery