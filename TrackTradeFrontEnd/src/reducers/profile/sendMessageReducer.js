export default (message = null, action) => {
  switch (action.type) {
    case "SEND_MESSAGE":
      return (message = action.payload);
    default:
      return message;
  }
};
