export default (user = null, action) => {
  switch (action.type) {
    case "CHECK_LOGIN":
      return (user = action.payload);
    default:
      return user;
  }
};
