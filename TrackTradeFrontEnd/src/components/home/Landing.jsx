import React, { Component } from 'react';
import Header from '../partials/Header';
import Footer from '../partials/Footer';

export default class Landing extends Component {
    render() {
        return (
            <div className="landing">
                <Header {...this.props} loggedIn={false}/>

                <main className="landing-main">
                    <div className="landing-main--text">
                        <h1 className="landing-main--title">A Trading Hub with a touch of social media</h1>
                        <p className="landing-main--description">Easily visualize your progress with charts. Connect with your peers and message them about your trade ideas.</p>
                        <a href="/sign-up" className="landing-main--button">Get Started</a>
                    </div>
                    <div className="landing-main--image-container">
                        <div className="landing-main--image"></div>
                    </div>
                </main>
                <section className="landing-section-1">
                    <h1 className="landing-section-1--title">What we offer:</h1>
                    <div className="landing-section-1--cards">

                        <div className="landing-section-1--cards__1">
                            <div className="landing-section-1--cards__1--image"></div>
                            <h2 className="landing-section-1--cards__1--title">Display your trading data like never before</h2>
                            <p className="landing-section-1--cards__1--text">Charts will be your best friend, easily visually your progress.</p>
                            {/* <a href="#" className="landing-section-1--cards__1--button">Learn more</a> */}
                        </div>

                        <div className="landing-section-1--cards__2">
                            <div className="landing-section-1--cards__2--image"></div>
                            <h2 className="landing-section-1--cards__2--title">Compete with other traders</h2>
                            <p className="landing-section-1--cards__2--text">Competition can be a great motivation, we made it easy for you to share your results with other traders.</p>
                            {/* <a href="#" className="landing-section-1--cards__2--button">Learn more</a> */}
                        </div>

                        <div className="landing-section-1--cards__3">
                            <div className="landing-section-1--cards__3--image"></div>
                            <h2 className="landing-section-1--cards__3--title">Message other traders about your trade ideas</h2>
                            <p className="landing-section-1--cards__3--text">Keep all of your trading ideas in one place and share them with others so they can hold you accountable.</p>
                            {/* <a href="#" className="landing-section-1--cards__3--button">Learn more</a> */}
                        </div>

                        <div className="landing-section-1--cards__4">
                            <div className="landing-section-1--cards__4--image"></div>
                            <h2 className="landing-section-1--cards__4--title">Share any trade on your favorite social media</h2>
                            <p className="landing-section-1--cards__4--text">Keep all of your trading ideas in one place and share them with others so they can hold you accountable.</p>
                            {/* <a href="#" className="landing-section-1--cards__4--button">Learn more</a> */}
                        </div>

                        <div className="landing-section-1--cards__5">
                            <div className="landing-section-1--cards__5--image"></div>
                            <h2 className="landing-section-1--cards__5--title">Calculate your lot size for proper risk management</h2>
                            <p className="landing-section-1--cards__5--text">Keep all of your trading ideas in one place and share them with others so they can hold you accountable.</p>
                            {/* <a href="#" className="landing-section-1--cards__5--button">Learn more</a> */}
                        </div>

                        <div className="landing-section-1--cards__6">
                            <div className="landing-section-1--cards__6--image"></div>
                            <h2 className="landing-section-1--cards__6--title">Get email alert on currency prices and news</h2>
                            <p className="landing-section-1--cards__6--text">Keep all of your trading ideas in one place and share them with others so they can hold you accountable.</p>
                            {/* <a href="#" className="landing-section-1--cards__6--button">Learn more</a> */}
                        </div>

                    </div>
                </section>
                <section className="landing-about">
                    <div className="landing-about--text">
                        <h1 className="landing-about--title">About</h1>
                        <p className="landing-about--description">Hello! My name is Victor Fernandez and I created this website because I have always found it inconvenient to share my trades on twitter where you find a huge variety of content. I wanted to create a hub for everything trading related, all free, and simple.</p>
                        <a href="https://linkedin.com/in/victor--fernandez" target="_blank" rel="noopener noreferrer" className="landing-about--button">Get In Touch</a>
                    </div>
                    <div className="landing-about--image"></div>
                </section>
                <Footer />
            </div>
        )
    }
}
