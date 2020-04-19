export default (trade = null, action) => {
  switch (action.type) {
    case "POST_TRADE":
      return (trade = action.payload);
    default:
      return trade;
  }
};
