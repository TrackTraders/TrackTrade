export default (user = null, action) => {
  switch (action.type) {
    case "SIGN_UP":
      return (user = action.payload);
    default:
      return user;
  }
};
