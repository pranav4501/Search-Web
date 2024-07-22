import { thunk } from 'redux-thunk';
import { configureStore } from '@reduxjs/toolkit';
import slice from './state/Slice';

// const rootReducer = {
//     userData: slice.reducer
// }

const store = configureStore({
    reducer: slice.reducer,
    // middleware: () => [thunk],
    // devTools: true
});

export default store;