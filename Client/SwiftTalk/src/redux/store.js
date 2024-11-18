import {configureStore} from '@reduxjs/toolkit'
import userReducer from './UserRedux.js';
export default configureStore({
    reducer:{
        user:userReducer
    },
})