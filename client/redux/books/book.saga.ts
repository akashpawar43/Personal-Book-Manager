import { call, put, takeLatest } from "redux-saga/effects";
import API from "@/lib/api";
import { GET_BOOKS, SET_BOOKS, ADD_BOOK, UPDATE_BOOK, DELETE_BOOK, ADD_BOOK_SUCCESS, ADD_BOOK_FAILURE, UPDATE_BOOK_SUCCESS, DELETE_BOOK_SUCCESS } from "./book.actions";
import toast from "react-hot-toast";

function* getBooksSaga(action: any): any {
    try {
        const res = yield call(API.get, "/books", {
            params: action.payload
        });

        yield put({
            type: SET_BOOKS,
            payload: res.data.data
        });
    } catch (error: any) {
        toast.error(error.response?.data?.message || "Failed to fetch books");
    }
}

function* addBookSaga(action: any): any {
    try {
        const res = yield call(API.post, "/books", action.payload);

        yield put({
            type: ADD_BOOK_SUCCESS,
            payload: res.data.data
        });

        toast.success("Book added successfully");
    } catch (error: any) {
        yield put({
            type: ADD_BOOK_FAILURE
        });
        toast.error(error.response?.data?.message || "Failed to add book");
    }
}

function* updateBookSaga(action: any): any {
    try {
        const res = yield call(API.put, `/books/${action.payload.id}`, action.payload.data);

        yield put({
            type: UPDATE_BOOK_SUCCESS,
            payload: res.data.data,
        });

        toast.success("Book Update");
    } catch (error: any) {
        toast.error(error.response?.data?.message || "Update failed");
    }
}

function* deleteBookSaga(action: any) {
    try {
        yield call(API.delete, `/books/${action.payload}`);

        toast.success("Book deleted");

        yield put({ type: DELETE_BOOK_SUCCESS, payload: action.payload });
    } catch (error: any) {
        toast.error(error.response?.data?.message || "Delete failed");
    }
}

export default function* bookSaga() {

    yield takeLatest(GET_BOOKS, getBooksSaga);
    yield takeLatest(ADD_BOOK, addBookSaga);
    yield takeLatest(UPDATE_BOOK, updateBookSaga);
    yield takeLatest(DELETE_BOOK, deleteBookSaga);

}