export const GET_BOOKS = "GET_BOOKS";
export const SET_BOOKS = "SET_BOOKS";

export const ADD_BOOK = "ADD_BOOK";
export const ADD_BOOK_SUCCESS = "ADD_BOOK_SUCCESS";
export const ADD_BOOK_FAILURE = "ADD_BOOK_FAILURE";
export const ADD_BOOK_CLEAR = "ADD_BOOK_CLEAR";
export const UPDATE_BOOK = "UPDATE_BOOK";
export const UPDATE_BOOK_SUCCESS = "UPDATE_BOOK_SUCCESS";
export const UPDATE_BOOK_FAILURE = "UPDATE_BOOK_FAILURE";
export const UPDATE_BOOK_CLEAR = "UPDATE_BOOK_CLEAR";
export const DELETE_BOOK = "DELETE_BOOK";
export const DELETE_BOOK_SUCCESS = "DELETE_BOOK_SUCCESS";

export const getBooks = (filters?: any) => ({
    type: GET_BOOKS,
    payload: filters
});

export const addBook = (book: any) => ({
    type: ADD_BOOK,
    payload: book
});

export const updateBook = (payload: { id: string, data: any }) => ({
    type: UPDATE_BOOK,
    payload,
});

export const deleteBook = (id: string) => ({
    type: DELETE_BOOK,
    payload: id
});