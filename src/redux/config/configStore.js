import { createStore, combineReducers } from "redux";
import letters from "../modules/letters";
import member from "../modules/member";
import { devToolsEnhancer } from "redux-devtools-extension";

const rootReducer = combineReducers({ letters, member });

const store = createStore(rootReducer, devToolsEnhancer());

export default store;
