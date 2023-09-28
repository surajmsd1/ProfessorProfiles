// UseToken Component for keeping track of user sessions

// Import modules
import { useState } from 'react';
import axios from 'axios'; 

// UseToken Component
export default function useToken() {

    const getToken = () => {
        const tokenString = localStorage.getItem('nursingUser');
        const userToken = JSON.parse(tokenString);
        if (userToken != null) {
            const tokenObject = {
                token: userToken
            }
            axios.post('/api/auth/verify', tokenObject)
                .then(res => {
                    if (res.status === 200) {
                        if (res.data.found) {
                            return userToken;
                        }
                        else {
                            localStorage.removeItem('nursingUser');
                            window.location.replace("/");
                            return "";
                        }
                    }
                })
        }
        return userToken;
    };

    const [token, setToken] = useState(getToken());

    const saveToken = userToken => {

        localStorage.removeItem('nursingUser');
        const token = Math.floor(Math.random() * 1000000000) + 5000;

        const tokenObject = {
            username: userToken,
            token: token
        }

        axios.post('/api/auth/store', tokenObject)
            .then(res => {
                if (res.status === 200) {
                    localStorage.setItem('nursingUser', token);
                    setToken(token);
                    window.location.replace("/");
                }
                else {
                    alert("Request not processed successfully. Status: " + res.status);
                    Promise.reject();
                }
            })
            .catch(err => alert('Something went wrong! ' + err));
    };

    return {
        setToken: saveToken,
        token
    }
}