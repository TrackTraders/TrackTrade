export default (messages = null, action) => {
  switch (action.type) {
    case "FETCH_ALLMESSAGES":
      return (messages = action.payload);
    default:
      return messages;
  }
};
