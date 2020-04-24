export default (selectedTradeIdea = null, action) => {
    switch (action.type){
        case "TRADEIDEA_SELECTED":
            return (action.payload);
        default:
            return selectedTradeIdea
    }
}