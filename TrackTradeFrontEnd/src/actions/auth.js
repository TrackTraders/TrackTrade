import services from "../services";

// check log in
export const checkLogin = () => async (dispatch) => {
    const response = await services.isLoggedIn();
    dispatch({
        type: "CHECK_LOGIN",
        payload: response,
    });
};

// log in
export const logIn = (data) => async (dispatch) => {
    const response = await services.logIn(data);
    dispatch({
        type: "LOG_IN",
        payload: response,
    });
};

// sign up
export const signUp = (data) => async (dispatch) => {
    const response = await services.signUp(data);
    dispatch({
        type: "SIGN_UP",
        payload: response,
    });
};

// log out
export const logOut = () => async (dispatch) => {
    const response = await services.logOut();
    dispatch({
        type: "LOG_OUT",
        payload: response,
    });
};
