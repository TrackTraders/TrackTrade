import React, { Component } from 'react'

export default class Footer extends Component {

    currentYear = () => {
        return (new Date().getFullYear())
    }

    render() {
        return (
            <footer className="footer">
                <div className="footer-image-container">
                    <div className="footer-image"></div>
                </div>
            <div className="row">
                <div className="col-1-of-2">
                    <div className="footer__navigation">
                        <ul className="footer__list">
                            <li className="footer__item"><a href="https://www.linkedin.com/in/victor--fernandez/" className="footer__link">Linked In</a></li>
                            <li className="footer__item"><a href="https://github.com/xrawvelocity" className="footer__link">Github</a></li>
                            <li className="footer__item"><a href="mailto:tracktradehelp@gmail.com" className="footer__link">Contact email</a></li>
                        </ul>
                    </div>
                </div>
                
                <div className="col-1-of-2">
                    <p className="footer__copyright">
                        Copyright &copy; {this.currentYear()} by Victor Fernandez
                    </p>
                </div>
            </div>
        </footer>
        )
    }
}
