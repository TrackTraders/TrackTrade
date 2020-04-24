import services from "../services";

// get all messages

export const fetchAllMessages = () => async (dispatch) => {
  const response = await services.getAllMessages();
  dispatch({
    type: "FETCH_ALLMESSAGES",
    payload: response,
  });
};

// send message

export const sendMessage = (data) => async (dispatch) => {
  const response = await services.sendMessage(data);

  dispatch({
    type: "SEND_MESSAGE",
    payload: response,
  });
};
