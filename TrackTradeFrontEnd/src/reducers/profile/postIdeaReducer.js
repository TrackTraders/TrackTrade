export default (idea = null, action) => {
  switch (action.type) {
    case "POST_IDEA":
      return (idea = action.payload);
    default:
      return idea;
  }
};
