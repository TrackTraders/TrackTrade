export default (tradeIdeas = null, action) => {
    switch (action.type){
        case "FETCH_TRADEIDEAS":
            return (tradeIdeas = action.payload);
        default:
            return tradeIdeas
    }
}