import { combineReducers } from "redux";

// loggedin user's trades
import tradeReducer from "./profile/tradeReducer";
import selectedTradeReducer from "./profile/selectedTradeReducer";
import postTradeReducer from "./profile/postTradeReducer";
import tradeImageUploadReducer from "./profile/tradeImageUploadReducer";

// loggedin user's trade ideas
import tradeIdeaReducer from "./profile/tradeIdeaReducer";
import selectedTradeIdeaReducer from "./profile/selectedTradeIdeaReducer";
import postIdeaReducer from "./profile/postIdeaReducer";
import deleteIdeaReducer from "./profile/deleteIdeaReducer";
import ideaImageUploadReducer from "./profile/ideaImageUploadReducer";

// other users data
import otherProfileReducer from "./profile/otherProfileReducer";
import allTradesReducer from "./home/allTradesReducer";
import allTradeIdeasReducer from "./home/allTradeIdeasReducer";
import allTradersReducer from "./home/allTradersReducer";

// connect with other users
import addConnectionReducer from "./profile/addConnectionReducer";
import removeConnectionReducer from "./profile/removeConnectionReducer";

// messages
import allMessagesReducer from "./profile/allMessagesReducer";
import sendMessageReducer from "./profile/sendMessageReducer";

// auth
import checkLoginReducer from "./auth/checkLoginReducer";
import loginReducer from "./auth/loginReducer";
import signupReducer from "./auth/signupReducer";
import logoutReducer from "./auth/logoutReducer";

// avatar
import updateAvatarReducer from "./profile/updateAvatarReducer";

export default combineReducers({
  // loggedin user's trade ideas
  trades: tradeReducer,
  selectedTrade: selectedTradeReducer,

  // post trade
  postTrade: postTradeReducer,

  //upload idea image
  tradeImageUpload: tradeImageUploadReducer,

  // loggedin user's trade ideas
  tradeIdeas: tradeIdeaReducer,
  selectedTradeIdea: selectedTradeIdeaReducer,

  // post trade idea
  postIdea: postIdeaReducer,

  //delete trade idea
  deleteIdea: deleteIdeaReducer,

  //upload idea image
  ideaImageUpload: ideaImageUploadReducer,

  // other users data
  otherProfile: otherProfileReducer,
  allTraders: allTradersReducer,
  allTradeIdeas: allTradeIdeasReducer,
  allTrades: allTradesReducer,

  // connect with other users
  addConnection: addConnectionReducer,
  removeConnection: removeConnectionReducer,

  // messages
  allMessages: allMessagesReducer,
  sendMessage: sendMessageReducer,

  // auth
  checkLogin: checkLoginReducer,
  logIn: loginReducer,
  signUp: signupReducer,
  logout: logoutReducer,

  // avatar
  updateAvatar: updateAvatarReducer,
});
