import React, { Component } from 'react';
import Header from '../partials/Header';
import Footer from '../partials/Footer';

export default class Landing extends Component {
    render() {
        return (
            <div>
                <Header loggedIn={false}/>

                <main className="landing-main">
                    <div className="landing-main--text">
                        <h1 className="landing-main--title">Log all your trades and compete with other traders</h1>
                        <p className="landing-main--description">Easily visually your progress with charts and percentages. Share with your peers and message them about trade ideas.</p>
                        <a href="/signup" className="landing-main--button">Get Started</a>
                    </div>
                    <div className="landing-main--image"></div>
                </main>
                <section className="landing-section-1">
                    <h1 className="landing-section-1--title">What we offer:</h1>
                    <div className="landing-section-1--cards">
                        <div className="landing-section-1--cards__1">
                            <div className="landing-section-1--cards__1--image"></div>
                            <h2 className="landing-section-1--cards__1--title">Display your trading data like never before</h2>
                            <p className="landing-section-1--cards__1--text">Charts will be your best friend, easily visually your progress.</p>
                            <a href="#" className="landing-section-1--cards__1--button">Learn more</a>
                        </div>
                        <div className="landing-section-1--cards__2">
                            <div className="landing-section-1--cards__2--image"></div>
                            <h2 className="landing-section-1--cards__2--title">Compete with other traders</h2>
                            <p className="landing-section-1--cards__2--text">Competition can be a great motivation, we made it easy for you to share your results with other traders.</p>
                            <a href="#" className="landing-section-1--cards__2--button">Learn more</a>
                        </div>
                        <div className="landing-section-1--cards__3">
                            <div className="landing-section-1--cards__3--image"></div>
                            <h2 className="landing-section-1--cards__3--title">Message other traders about your trade ideas</h2>
                            <p className="landing-section-1--cards__3--text">Keep all of your trading ideas in one place and share them with others so they can hold you accountable.</p>
                            <a href="#" className="landing-section-1--cards__3--button">Learn more</a>
                        </div>
                    </div>
                </section>
                <Footer />
            </div>
        )
    }
}
