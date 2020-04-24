export default (selectedTrade = null, action) => {
    switch (action.type){
        case "TRADE_SELECTED":
            return (action.payload);
        default:
            return selectedTrade
    }
}