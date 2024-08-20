// actions.js
import axios from 'axios';
import {
    FETCH_PRODUCTS_REQUEST,
    FETCH_PRODUCTS_SUCCESS,
    FETCH_PRODUCTS_FAILURE,
    ADD_PRODUCT,
    UPDATE_PRODUCT,
    DELETE_PRODUCT,
} from './action-types';

export const fetchProducts = () => async (dispatch) => {
    dispatch({ type: FETCH_PRODUCTS_REQUEST });
    try {
        const response = await axios.get('/api/products'); // Cambia la URL según sea necesario
        dispatch({ type: FETCH_PRODUCTS_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: FETCH_PRODUCTS_FAILURE, payload: error.message });
    }
};

export const addProduct = (product) => ({
    type: ADD_PRODUCT,
    payload: product,
});

export const updateProduct = (product) => ({
    type: UPDATE_PRODUCT,
    payload: product,
});

export const deleteProduct = (id) => ({
    type: DELETE_PRODUCT,
    payload: id,
});
