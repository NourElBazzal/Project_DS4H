import React, { useState } from 'react';
import './LoginForm.css';
import { FaUser, FaEye, FaEyeSlash} from "react-icons/fa";
import logo from 'C:/Users/nourb/OneDrive/Bureau/Projet-RH/login_page/src/Components/Assets/i3S_RVB_Couleur.png';
//import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
    const [username, setUsername] = useState("");
    const [password, setPass] = useState("");
    const [passwordVisible, setPasswordVisible] = useState(false);
    
    //const navigate = useNavigate();

    const togglePasswordVisibility = () => {
        setPasswordVisible(prevState => !prevState);
    };

   /* const handleSubmit = (e) => {
        e.preventDefault();
        // Perform authentication logic here (if needed)
        navigate('/home'); // Redirect to HomePage
    };*/

  return (
    <div className='container'>
    <div className='wrapper'>
        <form>
            <div className='image-container'>
            <img src={logo} alt="Logo" />
            </div>

            <div className={`input-box ${username ? 'not-empty' : ''}`}>
                <input
                    type="text"
                    placeholder="Identifiant"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <FaUser className='icon' />
            </div>
            <div className={`input-box ${password ? 'not-empty' : ''}`}>
                <input 
                    type={passwordVisible ? "text" : "password"}
                    placeholder='Mot de passe' 
                    value={password}
                    onChange={(e) => setPass(e.target.value)}
                    required/>
            
                {passwordVisible ? (
                    <FaEyeSlash className='toggle-icon icon' onClick={togglePasswordVisibility} />
                    ) : (
                    <FaEye className='toggle-icon icon' onClick={togglePasswordVisibility} />
                    )}
            </div>

            <div className="remember-forget">
                <label><input type="checkbox"/>Remember me</label>
                <a href="#">Forgot password?</a>
            </div>

            <button type="submit"><span>Se connecter</span></button>

            <div className="register-link">
                <p>Don't have an account? <a href="#">Register</a></p>
            </div>
        </form>
    </div>
    </div>
  )
}

export default LoginForm;