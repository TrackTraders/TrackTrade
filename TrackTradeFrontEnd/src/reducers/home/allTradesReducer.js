export default (trades = null, action) => {
    switch (action.type){
        case "FETCH_ALLTRADES":
            return (trades = action.payload);
        default:
            return trades
    }
}