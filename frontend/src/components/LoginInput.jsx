import { useState } from 'react'

function LoginInput(props) {
    const [userInput, setUserInput] = useState('')
    return (
        <div>
            <label>{props.name} :
                <input
                    type="text"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                />
            </label>
        </div>
    )
}

export default LoginInput