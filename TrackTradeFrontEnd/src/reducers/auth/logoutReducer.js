export default (user = null, action) => {
  switch (action.type) {
    case "LOG_OUT":
      return (user = action.payload);
    default:
      return user;
  }
};
