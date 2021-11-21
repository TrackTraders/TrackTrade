import React, { Component, useState } from "react";
import { TextField } from "@mui/material";

// redux imports
import { connect } from "react-redux";
import { signUp, checkLogin } from "../../actions/auth";
import InputField from "../../components/InputField";
import Header from "pages/partials/Header";
import { useHistory } from "react-router";

const Signup = (props) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (username.includes(" ") || password.includes(" ")) {
            alert("No spaces allowed");
        } else if (username.length > 20) {
            alert(
                "Username cannot be bigger than 20 characters, sorry Mr. 'johnSmithTraderAccountTrackTrade123' "
            );
        } else {
            try {
                await props.signUp({ username, password });
                await props.checkLogin();
                history.push("/dashboard");
            } catch (err) {
                console.log(err);
            }
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
                        Sign Up
                    </button>
                </form>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return { user: state.checkLogin };
};

export default connect(mapStateToProps, { signUp, checkLogin })(Signup);
