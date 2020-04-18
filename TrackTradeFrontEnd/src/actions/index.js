import services from "../services";

// api calls will be made here

// getTrades

export const fetchAllTrades = () => async (dispatch) => {
  const response = await services.getAllTrades();
  dispatch({
    type: "FETCH_ALLTRADES",
    payload: response,
  });
};

export const fetchTrades = () => async (dispatch) => {
  const response = await services.getTrades();
  dispatch({
    type: "FETCH_TRADES",
    payload: response,
  });
};

export const selectTrade = (trade) => {
  return {
    type: "TRADE_SELECTED",
    payload: trade,
  };
};

// getTradeIdeas

export const fetchAllTradeIdeas = () => async (dispatch) => {
  const response = await services.getAllIdeas();
  dispatch({
    type: "FETCH_ALLTRADEIDEAS",
    payload: response,
  });
};

export const fetchTradeIdeas = () => async (dispatch) => {
  const response = await services.getIdeas();
  dispatch({
    type: "FETCH_TRADEIDEAS",
    payload: response,
  });
};

export const selectTradeIdea = (tradeIdea) => {
  return {
    type: "TRADEIDEA_SELECTED",
    payload: tradeIdea,
  };
};

// find other profile

export const findOtherProfile = (username) => async (dispatch) => {
  const response = await services.findOtherProfile(username);

  dispatch({
    type: "FETCH_USER",
    payload: response.data,
  });
};

// get all traders

export const fetchAllTraders = () => async (dispatch) => {
  const response = await services.getAllTraders();

  dispatch({
    type: "FETCH_ALLUSERS",
    payload: response,
  });
};

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
