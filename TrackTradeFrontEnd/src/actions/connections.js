import services from "../services";

// add connection

export const addConnection = (id) => async (dispatch) => {
  const response = await services.addConnection(id);

  dispatch({
    type: "ADD_CONNECTION",
    payload: response,
  });
};

// remove connection

export const removeConnection = (id) => async (dispatch) => {
  const response = await services.removeConnection(id);

  dispatch({
    type: "REMOVE_CONNECTION",
    payload: response,
  });
};
