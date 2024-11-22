import React, { useState } from 'react';
import './LoginForm.css';
import { FaUser, FaEye, FaEyeSlash} from "react-icons/fa";
import logo from '../Assets/i3S_RVB_Couleur.png';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
    const [username, setUsername] = useState("");
    const [password, setPass] = useState("");
    const [passwordVisible, setPasswordVisible] = useState(false);
    
    const navigate = useNavigate();

    const togglePasswordVisibility = () => {
        setPasswordVisible(prevState => !prevState);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Perform authentication logic here (if needed)
        navigate('/home'); // Redirect to HomePage
    };

  return (
    <div className='container'>
    <div className='wrapper'>
        <form onSubmit={handleSubmit}>
            <div className='image-container'>
            <img src={logo} alt="Logo" />
            </div>

            <div className={`input-box ${username ? 'not-empty' : ''}`}>
                <input
                    type="text"
                    className="input-field"
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
                    className="input-field"
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
                <label><input type="checkbox"/>Se souvenir de moi</label>
                <a href="#">Mot de pass oublié?</a>
            </div>

            <button type="submit"><span>Se connecter</span></button>
        </form>
    </div>
    </div>
  )
}

export default LoginForm;