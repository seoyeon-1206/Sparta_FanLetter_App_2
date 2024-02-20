import letters from "../modules/letters";
import member from "../modules/member";
import { configureStore } from "@reduxjs/toolkit";

// ASIS : 일반 리듀서
// const rootReducer = combineReducers({ letters, member });

// const store = createStore(rootReducer, devToolsEnhancer());

// TODO: Redux Toolkit
const store = configureStore({
    //reducer가 들어감
    reducer: {
        letters: letters,
        member: member
    }
});

export default store;
