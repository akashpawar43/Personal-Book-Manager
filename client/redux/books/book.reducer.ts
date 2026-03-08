import { ADD_BOOK, ADD_BOOK_CLEAR, ADD_BOOK_FAILURE, ADD_BOOK_SUCCESS, DELETE_BOOK_SUCCESS, SET_BOOKS, UPDATE_BOOK_CLEAR, UPDATE_BOOK_SUCCESS } from "./book.actions";

const initialState = {
    books: [],
    pagination: {},
    addSuccess: false,
    updateSuccess: false,
};

export default function bookReducer(state = initialState, action: any) {

    switch (action.type) {

        case ADD_BOOK:
            return {
                ...state,
                loading: true,
                addSuccess: false
            };

        case ADD_BOOK_SUCCESS:
            return {
                ...state,
                loading: false,
                addSuccess: true,
            };

        case ADD_BOOK_FAILURE:
            return {
                ...state,
                loading: false,
                addSuccess: false,
            };

        case ADD_BOOK_CLEAR:
            return {
                ...state,
                loading: false,
                addSuccess: false,
            };


        case SET_BOOKS:
            return {
                ...state,
                books: action.payload.books,
                pagination: action.payload.pagination
            };

        case UPDATE_BOOK_SUCCESS:
            return {
                ...state,
                books: state.books.map((b: any) =>
                    b._id === action.payload._id ? action.payload : b
                ),
                updateSuccess: true,
            }

        case UPDATE_BOOK_CLEAR:
            return {
                ...state,
                loading: false,
                updateSuccess: false,
            };

        case DELETE_BOOK_SUCCESS:
            return {
                ...state,
                books: state.books.filter((b: any) => b._id !== action.payload)
            }

        default:
            return state;
    }

}