import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import axios from 'axios'

import { pseudoRegex, emailRegex, passwordRegex } from '../../utils/regex'

import Button from '../Button/Button'
import eye_icon from '../../assets/eye_icon.png'

import './loginForm.css'


function LoginForm({ baseURL, buttonName, navigateTo }) {
    const [showPassword, setShowPassword] = useState('show')
    const toggleShowPassword = () => {
        setShowPassword(showPassword === 'show' ? 'hide' : 'show')
    }

    const navigate = useNavigate()
    const { register, handleSubmit, formState } = useForm({
        defaultValues: {pseudo:'', email:'', password:''},
        mode: 'onBlur',
    })
    const { errors, isSubmitSuccessful } = formState

    const [formError, setFormError] = useState()

    async function onSubmit(data) {
        const user = (user, token) => {
            localStorage.setItem('user', `${user}`)
            localStorage.setItem('token', `${token}`)
        }
        await axios
            .post(baseURL, data)
            .then((res) => {user(res.data.userId, res.data.token)})
            .catch(setFormError('vérifiez vos informations, ou créez votre compte'))

        navigate(navigateTo)
    }

    return (
        <form id="LoginForm" onSubmit={handleSubmit(onSubmit)}>
            <div id="LoginFormInputs__wrapper">
                {buttonName === 'créer mon compte' && (
                    <div className='LoginFormInputs__input'>
                        <label htmlFor="pseudo">pseudo : </label>
                        <input
                            type="text"
                            name="pseudo"
                            aria-invalid={errors.pseudo ? 'true' : 'false'}
                            {...register('pseudo', {
                                required: true,
                                pattern: {
                                    value: pseudoRegex,
                                    message:
                                        'seulement des lettres et des chiffres svp',
                                },
                            })}
                        />
                        <p className="signup-help">
                            <span>ex : votre nom et votre service</span>
                        </p>
                        {errors.pseudo && errors.pseudo.type === 'required' && (
                            <p role="alert" className="error-message">
                                champ obligatoire
                            </p>
                        )}
                        {errors.pseudo && errors.pseudo.type === 'pattern' && (
                            <p role="alert" className="error-message">
                                {errors.pseudo.message}
                            </p>
                        )}
                    </div>
                )}
                <div className='LoginFormInputs__input'>
                    <label htmlFor="email professionnel">
                        email professionnel :{' '}
                    </label>
                    <input
                        type="email"
                        name="email"
                        size="30"
                        {...register('email', {
                            required: true,
                            pattern: {
                                value: emailRegex,
                                message: "cet email n'a pas le format requis",
                            },
                        })}
                        aria-invalid={errors.email ? 'true' : 'false'}
                    />
                    <p className="signup-help">votreemailpro@groupomania.com</p>

                    <p role="alert" className="error-message">
                        {' '}
                        {errors.email &&
                            errors.email.type === 'required' &&
                            'champ obligatoire'}
                    </p>
                    {errors.email && errors.email.type === 'pattern' && (
                        <p role="alert" className="error-message">
                            {errors.email.message}
                        </p>
                    )}
                </div>
                <div className='LoginFormInputs__input'>
                    <div id="passwordWrapper">
                        <label htmlFor="mot de passe">mot de passe : </label>
                        <span className="input">
                            <input
                                type={
                                    showPassword === 'show'
                                        ? 'password'
                                        : 'text'
                                }
                                name="password"
                                size="25"
                                style={{ border: 'none' }}
                                aria-invalid={errors.password ? 'true' : 'false'}
                                {...register('password', {
                                    required: true,
                                    pattern: {
                                        value: passwordRegex,
                                        message:
                                            "ce mot de passe n'a pas le format requis",
                                    },
                                })}
                            />
                            <img
                                src={eye_icon}
                                alt="montrer / cacher le mot de passe"
                                width="100%"
                                onClick={toggleShowPassword}
                            />
                        </span>
                    </div>
                    <p className="signup-help">
                        min: 8 car., 1 majuscule, 1 minuscule, 1 chiffre
                    </p>
                    {errors.password && errors.password.type === 'required' && (
                        <p role="alert" className="error-message">
                            champ obligatoire
                        </p>
                    )}
                    {errors.password && errors.password.type === 'pattern' && (
                        <p role="alert" className="error-message">
                            {errors.password.message}
                        </p>
                    )}
                </div>
            </div>
            <div role="alert" className='error-message'>{!isSubmitSuccessful && formError}</div>
            <Button name={buttonName} type="submit" />
        </form>
    )
}

export default LoginForm
