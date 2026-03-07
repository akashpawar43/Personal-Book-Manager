import { combineReducers } from "redux";
import authReducer from "./auth/auth.reducer";
import bookReducer from "./books/book.reducer";

export default combineReducers({
  auth: authReducer,
  books: bookReducer
});