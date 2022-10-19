import { useState, useEffect } from 'react';
import Axios from 'axios';
import { useNavigate } from "react-router-dom"

function Login() {

    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [logged, setLogged] = useState(localStorage.getItem(localStorage.getItem("logged")));
    const navigate = useNavigate();

    function verifyLogin() {
        Axios.post("//localhost:3001/api/login", {
            login: login,
            password: password
        }).then((response) => {
            response.data ? setLogged(true) : setLogged(false);
            localStorage.setItem("logged", response.data);
        });
    };

    if (logged) {
        navigate("/dashboard");
    }
    else {
        return (
            <div className="App">
                <h1>CRUD APPLICATION</h1>
                <div className="form">
                    <label>Login</label>
                    <input type="text" name="login" onChange={(e) => setLogin(e.target.value)} />
                    <label>Password</label>
                    <input type="text" name="password" onChange={(e) => setPassword(e.target.value)} />
                    <button onClick={verifyLogin}>Submit</button>
                </div>
            </div>
        )
    }


}

export default Login;