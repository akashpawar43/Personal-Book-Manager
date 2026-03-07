import { call, put, takeLatest } from "redux-saga/effects";
import API from "@/lib/api";
import { LOGIN_REQUEST, LOGIN_SUCCESS, REGISTER_REQUEST, REGISTER_SUCCESS } from "./auth.actions";
import toast from "react-hot-toast";
import { saveToken } from "@/lib/auth";

function* registerSaga(action: any): any {
    try {
        const res = yield call(API.post, "/auth/register", action.payload);

        yield put({
            type: REGISTER_SUCCESS,
            payload: res.data.data
        });

        toast.success("Registration successful");
    } catch (error: any) {
        toast.error(error.response?.data?.message || "Registration failed");
    }
}

function* loginSaga(action: any): any {
    try {
        const res = yield call(API.post, "/auth/login", action.payload);

        const token = res.data.data.token;

        saveToken(token);

        yield put({
            type: LOGIN_SUCCESS,
            payload: res.data.data
        });

        toast.success("Login successful");
    } catch (error: any) {
        toast.error(error.response?.data?.message || "Login failed");
    }
}

export default function* authSaga() {
    yield takeLatest(REGISTER_REQUEST, registerSaga);
    yield takeLatest(LOGIN_REQUEST, loginSaga);
}