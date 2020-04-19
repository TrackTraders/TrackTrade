export default (trade = null, action) => {
  switch (action.type) {
    case "DELETE_IDEA":
      return (trade = action.payload);
    default:
      return trade;
  }
};
