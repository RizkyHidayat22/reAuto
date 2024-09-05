import {createSlice} from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
    reviews : [],
    loading : false,
    error : ""
}

export const fetchProduct = createSlice({
    name : "fetchProduct",
    initialState,
    reducers : {
        fetchPanding(state){
            state.loading = true,
            state.reviews = [],
            state.error = ""
        },
        fetchSuccess(state, action){
            state.loading = false,
            state.reviews = action.payload,
            state.error = ""
        },
        fetchError(state, action){
            state.loading = false,
            state.reviews = [],
            state.error = action.payload
        }
    }

})

const {fetchPanding, fetchSuccess, fetchError} = fetchProduct.actions

export const fetchAsycProduct = () => async (dispatch) => {
    try {
        dispatch(fetchPanding)
        const {data} = await axios.get("http://localhost:3000/products/readproduct", {
            headers : {
                Authorization: `Bearer ${localStorage.access_token}`,
            }
        })
        dispatch(fetchSuccess(data.data))
    } catch (error) {
        dispatch(fetchError(error.message))
    }
    
}

export default fetchProduct.reducer