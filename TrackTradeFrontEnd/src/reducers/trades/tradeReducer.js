export default (trades = null, action) => {
    switch (action.type){
        case "FETCH_TRADES":
            return (trades = action.payload);
        default:
            return trades
    }
}