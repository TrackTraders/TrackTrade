export default (connection = null, action) => {
  switch (action.type) {
    case "REMOVE_CONNECTION":
      return (connection = action.payload);
    default:
      return connection;
  }
};
