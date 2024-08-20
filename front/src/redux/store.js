import { configureStore } from '@reduxjs/toolkit'; 
import { thunk } from 'redux-thunk';
import { productReducer } from './reducer/reducer'; 

const store = configureStore({
    reducer: productReducer, 
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export default store;
