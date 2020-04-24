export default (user = null, action) => {
  switch (action.type) {
    case "LOG_IN":
      return (user = action.payload);
    default:
      return user;
  }
};
