import React, { Component } from 'react'

export default class Footer extends Component {

    currentYear = () => {
        return (new Date().getFullYear())
    }

    render() {
        return (
            <footer class="footer">
            <div class="row">
                <div class="col-1-of-2">
                    <div class="footer__navigation">
                        <ul class="footer__list">
                            <li class="footer__item"><a href="https://www.linkedin.com/in/victor--fernandez/" class="footer__link">Linked In</a></li>
                            <li class="footer__item"><a href="https://github.com/xrawvelocity" class="footer__link">Github</a></li>
                            <li class="footer__item"><a href="mailto:tracktradehelp@gmail.com" class="footer__link">Contact email</a></li>
                        </ul>
                    </div>
                </div>
                <div class="col-1-of-2">
                    <p class="footer__copyright">
                        Copyright &copy; {this.currentYear()} by Victor Fernandez
                    </p>
                </div>
            </div>
        </footer>
        )
    }
}
