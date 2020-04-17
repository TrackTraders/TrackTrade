import { combineReducers } from "redux";
import tradeReducer from "./trades/tradeReducer";
import selectedTradeReducer from "./trades/selectedTradeReducer";

import allTradesReducer from "./trades/allTradesReducer";

import tradeIdeaReducer from "./trades/tradeIdeaReducer";
import selectedTradeIdeaReducer from "./trades/selectedTradeIdeaReducer";

import allTradeIdeasReducer from "./trades/allTradeIdeasReducer";

import otherProfileReducer from "./trades/otherProfileReducer";

import allTradersReducer from "./trades/allTradersReducer";

export default combineReducers({
  trades: tradeReducer,
  selectedTrade: selectedTradeReducer,

  allTrades: allTradesReducer,

  tradeIdeas: tradeIdeaReducer,
  selectedTradeIdea: selectedTradeIdeaReducer,

  allTradeIdeas: allTradeIdeasReducer,

  otherProfile: otherProfileReducer,

  allTraders: allTradersReducer,
});
