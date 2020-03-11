import React, { Component } from 'react'
import Header from '../partials/Header'
import Footer from '../partials/Footer'

export default class Profile extends Component {
    render() {
        return (
            <div>
            <Header loggedIn={true}/>
                -=-=-=-=-=-=-=-=-=-=-=-=-=-= this is your profile =-=--=-=-==-=-=-=-=-=-=-=-=-=
            <Footer/>
            </div>
        )
    }
}
