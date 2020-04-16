import actions from '../services'

// api calls will be made here

// getTrades

export const fetchTrades = () => async (dispatch) => {
    const response = await actions.getTrades();
    dispatch({
        type: "FETCH_TRADES",
        payload: response
    })
}