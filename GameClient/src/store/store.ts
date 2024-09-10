import {configureStore} from "@reduxjs/toolkit";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import appReducer from "./appStore.ts"

const store = configureStore({
    reducer: {
        app: appReducer,
    },
});
type AppState = ReturnType<typeof store.getState>;
type AddDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AddDispatch>();
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;
export default store;