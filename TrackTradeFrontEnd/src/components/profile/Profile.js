import React, { Component } from 'react';
import Header from '../partials/Header';
import Footer from '../partials/Footer';

const Profile = (props) => {
    if(!props.user.email){ 
        props.history.push('/log-in') 
    }   
    return (
        <div>
            Profile
            Welcome {props.user.email} !!! 
        </div>
    );
}

export default Profile;