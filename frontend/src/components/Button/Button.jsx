
import './Button.css'

function Button(props) {
    return (
        <button type={props.type} onClick={props.action}>
            <img src={props.icon} alt='' />
            <span>{props.name}</span>
        </button>
    )
}

export default Button