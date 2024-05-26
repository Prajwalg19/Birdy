import {combineReducers, configureStore} from "@reduxjs/toolkit"
import authReducer from "@/features/authSlice.ts"
import {persistStore, persistReducer} from "redux-persist"
import storage from 'redux-persist/lib/storage'

const rootReducers = combineReducers({user: authReducer}); // combines reducers of all the slices


const persistConfig = {key: "root", storage, version: 1} // configuration for redux persist
const persistedReducer = persistReducer(persistConfig, rootReducers)

export const store = configureStore(
    {

        reducer: persistedReducer,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false})
    }
)


const persistor = persistStore(store);
export default persistor


export type RootState = ReturnType<typeof store.getState>

