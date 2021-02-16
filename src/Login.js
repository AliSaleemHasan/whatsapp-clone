import React from 'react'
import { auth, provider } from './firebase'
import "./Login.css"
import { actionType } from './reducer';
import { useStateValue } from './StateProvider'
function Login() {
    const [{ }, dispatch] = useStateValue();

    const singIn = () => {
        auth.signInWithPopup(provider).then(result =>
          { console.log(result)
               dispatch({
            type: actionType.SET_USER,
            user: result.user
        })}
        
        ).catch(error => alert(error.message))
    }
    return (
        <div className="login">
            <div className="login__box">
                <img src="https://www.freelogodesign.org/file/app/client/thumb/61e4742d-feb3-4b1d-b14f-5cc42b86df7c_200x200.png?1604653094462" alt="3atsappLogo" />

                <h5>Made by: Ali Hasan .</h5>
                <button onClick={singIn}>Sign in using google acount </button>
            </div>

        </div>
    )
}

export default Login
