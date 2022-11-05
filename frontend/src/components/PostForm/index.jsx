import { useState, useEffect, useContext } from 'react'
import { useNavigate, useParams, useOutletContext } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import axios from 'axios'

import { RefreshContext } from '../../utils/context'
import Button from '../Button/Button'
import iconDel from '../../assets/icon-del.avif'
import './postForm.css'



function PostForm({ titleToDisplay, buttonName, navigateTo }) {

    const PTU = useParams().id                              // PTU = PostToUpdate
    const token = localStorage.getItem('token')
    const { toggleRefresh } = useContext(RefreshContext)
    const { userRole } = useOutletContext()
    const [imageUrl, setImageUrl] = useState()
    const baseURL = 'http://localhost:3001/api/post'
    const requestOptions = {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': 'Bearer ' + token
        }
    }
    const { register, handleSubmit, reset, formState } = useForm({
        defaultValues : {title: '', text: ''}
    })
    const { isDirty } = formState


    /*----------------------------------------------------getting post's data to update if update */
    useEffect(() => {
        if (!PTU) {
            reset({
                title: '',
                text: ''
            })
        } else {
            axios.get(baseURL + '/' + PTU, requestOptions)
                .then((res) => {
                    if (!res.data.imageUrl) {
                        reset({
                            title: `${res.data.title}`,
                            text: `${res.data.text}`
                        })
                    } else {
                        reset({
                            title: `${res.data.title}`,
                            text: `${res.data.text}`,
                            imageUrl: `${res.data.imageUrl}`
                        })
                        setImageUrl(res.data.imageUrl)
                    }
                })
        }
    }, [PTU])


    /*---------------------------------------------------------------------------- Buttons logics */
    const [imageURI, setImageURI] = useState()
    const [imageChange, setImageChange] = useState(false)
    const [imageDelete, setImageDelete] = useState(false)

    const handleImageChange = (e)=> {
        if(e.target.files.length > 0){
            setImageURI(URL.createObjectURL(e.target.files[0]))
            setImageUrl(e.target.files[0])
            setImageChange(true)
        }
    }

    const handleDeleteImage = (e) => {
        setImageUrl('')
        setImageURI('')
        setImageDelete(true)
    }

    const navigate = useNavigate()
    const handleCancel = (e) => {
        e.preventDefault()
        navigate(navigateTo)
    }



    const onSubmit = (data) => {
        data = { ...data, imageUrl, userRole }

        async function post() {
             if (!PTU) {
                await axios.post(baseURL, data, requestOptions)
            } else {
                await axios.put(baseURL + '/' + PTU, data, requestOptions)
            }
            toggleRefresh()
            navigate(navigateTo)
        }

        if (data.title==='' && data.text==='' && !imageUrl) {
            alert("Votre publication est vide")
        } else if (!isDirty && imageChange===false && imageDelete===false) {
            alert('Aucune modification')
        } else {        
            post()
        }
    }


    return (
        <main>
            <h1 className='postForm__titre'>
                {titleToDisplay}
            </h1>
            <form id='postForm' onSubmit={handleSubmit(onSubmit)}>
                <div id='postForm__content'>
                    <div className='postForm__content-inputs'>
                        <label htmlFor="title">titre de votre publication</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            {...register('title')} />

                    </div>
                    <div className='postForm__content-inputs'>
                        <label htmlFor="text">votre publication</label>
                        <textarea
                            id="text"
                            // rows="20"
                            cols="40"
                            name="text"
                            {...register('text')}></textarea>
                    </div>
                </div>

                <div id='postForm__buttons'>
                    <div id='postForm__image-button'>
                        <label htmlFor='choose-image' role="button" className='button'>
                            {(imageUrl) ? "modifier l'image" : "ajouter une image"}
                        </label>
                        <input
                            id='choose-image'
                            style={{ display: 'none' }}
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                        />
                        {(imageUrl) &&
                                <Button 
                                    className='test'
                                    type='button'
                                    icon={iconDel}
                                    action={handleDeleteImage}/>
                        }
                    </div>
                    <Button name={buttonName} type='submit' />
                    <Button
                        name='annuler'
                        type='button'
                        action={handleCancel}
                    />
                </div>

                <div id='postForm__image'>
                        <img src={imageURI ? imageURI : imageUrl} alt={(!imageURI || !imageUrl) ? "" : "votre sélection"} width='100%' />
                </div>
            </form>
        </main >
    )
}

export default PostForm
