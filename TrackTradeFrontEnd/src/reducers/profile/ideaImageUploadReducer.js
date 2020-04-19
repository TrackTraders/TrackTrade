export default (image = null, action) => {
  switch (action.type) {
    case "IDEA_IMAGE_UPLOAD":
      return (image = action.payload);
    default:
      return image;
  }
};
