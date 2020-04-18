export default (trades = null, action) => {
    switch (action.type){
        case "FETCH_ALLTRADEIDEAS":
            return (trades = action.payload);
        default:
            return trades
    }
}