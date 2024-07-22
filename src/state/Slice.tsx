import { createSlice, original } from "@reduxjs/toolkit";

const initialState = {
    user: {
        details: null,
        favourite: null
    },
    loading: false
}

const slice = createSlice({
    name: "User",
    initialState,
    reducers: {
        insertLoggedInUser: (state, { payload }) => {
            state.user.details = payload;
        },
        removedLoggedInUser: (state, { payload }) => {
            state.user.details = null;
            state.user.favourite = null;
        },
        setLoading: (state, { payload }) => {
            state.loading = payload.loading;
        }
    }
})

export default slice;