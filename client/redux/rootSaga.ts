import { all } from "redux-saga/effects";
import authSaga from "./auth/auth.saga";
import bookSaga from "./books/book.saga";

export default function* rootSaga() {
  yield all([
    authSaga(),
    bookSaga()
  ]);
}