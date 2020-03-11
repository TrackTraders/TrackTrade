import React, { Component } from 'react'
import Header from '../partials/Header';
import Footer from '../partials/Footer';

export default class Home extends Component {
    render() {
        return (
            <div class="container">
            <Header {...this.props} loggedIn={true}/>
            <main class="landing-main">
                <div class="landing-main--text">
                    <h1 class="landing-main--title">*Hacker voice* ... I'm in!</h1>
                    <div class="landing-main--description">
                    f
                        
                    </div>
                    <a href="/signup" class="landing-main--button">Get Started</a>
                </div>
                <div class="landing-main--image"></div>
            </main>
            <section class="landing-section-1">
                <h1 class="landing-section-1--title">What we offer:</h1>
                <div class="landing-section-1--cards">
                    <div class="landing-section-1--cards__1">
                        <div class="landing-section-1--cards__1--image"></div>
                        <h2 class="landing-section-1--cards__1--title">Display your trading data like never before</h2>
                        <p class="landing-section-1--cards__1--text">Charts will be your best friend, easily visually your progress.</p>
                        <a href="#" class="landing-section-1--cards__1--button">Learn more</a>
                    </div>
                    <div class="landing-section-1--cards__2">
                        <div class="landing-section-1--cards__2--image"></div>
                        <h2 class="landing-section-1--cards__2--title">Compete with other traders</h2>
                        <p class="landing-section-1--cards__2--text">Competition can be a great motivation, we made it easy for you to share your results with other traders.</p>
                        <a href="#" class="landing-section-1--cards__2--button">Learn more</a>
                    </div>
                    <div class="landing-section-1--cards__3">
                        <div class="landing-section-1--cards__3--image"></div>
                        <h2 class="landing-section-1--cards__3--title">Message other traders about your trade ideas</h2>
                        <p class="landing-section-1--cards__3--text">Keep all of your trading ideas in one place and share them with others so they can hold you accountable.</p>
                        <a href="#" class="landing-section-1--cards__3--button">Learn more</a>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
        )
    }
}
