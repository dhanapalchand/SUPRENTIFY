import emailjs from '@emailjs/browser';
import React, { useState, useEffect, useContext, useRef } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { API_URL } from './env';
import { authContext } from "../hooks/authContext";

const ContactUs = () => {
    const { user } = useContext(authContext);
    const { id } = useParams();
    const [userData, setUserData] = useState(null);
    const usertoken = user.token;
    const navigate = useNavigate();
    const form = useRef();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`${API_URL}/get_one_user/${id}`, {
                    headers: {
                        Authorization: `Bearer ${usertoken}`,
                    },
                });
                if (response.status >= 200 && response.status < 300) {
                    setUserData(response.data);
                    console.log(response.data);
                } else {
                    console.log('Request failed with status code:', response.status);
                }
            } catch (error) {
                console.error('Error:', error.message);
                if (error.response) {
                    console.error('Error Response Data:', error.response.data);
                    console.error('Error Status Code:', error.response.status);
                    console.error('Error Headers:', error.response.headers);
                }
            }
        };

        fetchUserData();
    }, [id, usertoken]);

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs
            .sendForm('service_9hbgwy8', 'template_kljf26z', form.current, {
                publicKey: 'brg91yeM3R7xAD4li',
            })
            .then(
                () => {
                    console.log('SUCCESS!');
                    navigate('/'); // Navigate back to the home component
                },
                (error) => {
                    console.log('FAILED...', error.text);
                },
            );
    };

    return (
        <div>
            {userData ? (
                <form ref={form} onSubmit={sendEmail}>
                    <label>Name</label>
                    <input type="text" name="firstName" defaultValue={userData.firstName} readOnly />
                    <label>Phone Number</label>
                    <input type="text" name="phoneNumber" defaultValue={userData.phoneNumber} readOnly />
                    <input type="submit" value="Send Interest Mail" />
                </form>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default ContactUs;
