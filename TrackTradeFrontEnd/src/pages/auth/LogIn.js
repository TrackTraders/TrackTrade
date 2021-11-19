import Header from "pages/partials/Header";
import React, { useState } from "react";

// redux imports
import { connect } from "react-redux";
import { useHistory } from "react-router";
import { logIn, checkLogin } from "../../actions/auth";

const Login = (props) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const history = useHistory();

    const handleSubmit = async (e) => {
        console.log(e);
        e.preventDefault();
        try {
            await props.logIn({ username, password });
            await props.checkLogin();
            history.push("/dashboard");
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="signuppage">
            <Header {...props} />
            <div className="signup">
                <form className="signup-form" onSubmit={handleSubmit}>
                    <div className="signup-form-group">
                        <label htmlFor="email">Username</label>
                        <input
                            onChange={(e) => setUsername(e.target.value)}
                            type="text"
                            className="signup-form-input"
                            placeholder="smithjohntrades123"
                            name="username"
                            required
                        />
                    </div>
                    <div className="signup-form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            className="signup-form-input"
                            name="password"
                            required
                        />
                    </div>
                    <button type="submit" className="signup-form-btn">
                        Log In
                    </button>
                </form>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return { user: state.logIn };
};

export default connect(mapStateToProps, { logIn, checkLogin })(Login);
