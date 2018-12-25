import { createStore, applyMiddleware } from "redux";
// import ReduxThunk from "redux-thunk";
import thunk from "redux-thunk";
import reducers from "../reducers";

const store = createStore(reducers, {}, applyMiddleware(thunk));
store.subscribe(() => console.log("store", store.getState()));

export default store;
