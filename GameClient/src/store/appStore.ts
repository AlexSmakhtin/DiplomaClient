import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios, {HttpStatusCode} from "axios";
import {signInResponse} from "../dto/signInResponse.ts";
import {serverUrls} from "../constansts/serverUrls.ts";
import {signUpResponse} from "../dto/signUpResponse.ts";
import {signInRequest} from "../dto/signInRequest.ts";
import {signUpRequest} from "../dto/signUpRequest.ts";
import {NavigateFunction} from "react-router-dom";
import {paths} from "../constansts/paths.ts";

export const userInitialState = {
    id: localStorage.getItem("userId") ?? "",
    name: localStorage.getItem("userName") ?? "",
    email: localStorage.getItem("userEmail") ?? "",
    status: parseInt(localStorage.getItem("userStatus")?? "0") ,
    jwtToken: localStorage.getItem("jwtToken") ?? ""
}
export const errorInitialState = {
    message: "",
    code: 0
};

export const updateData = (payload: typeof userInitialState) => {
    localStorage.setItem("userId", payload.id);
    localStorage.setItem("userName", payload.name);
    localStorage.setItem("userEmail", payload.email);
    localStorage.setItem("userStatus", payload.status.toString());
    localStorage.setItem("jwtToken", payload.jwtToken);
    axios.defaults.headers.common['Authorization'] = `Bearer ${payload.jwtToken}`;
}

export const deleteData = () => {
    localStorage.removeItem("jwtToken")
    localStorage.removeItem("userId")
    localStorage.removeItem("userName")
    localStorage.removeItem("userEmail")
    localStorage.removeItem("userStatus")
    axios.defaults.headers.common['Authorization'] = "";
}

const appSlice = createSlice({
        name: "appSlice",
        initialState: {
            user: userInitialState,
            error: errorInitialState,
            isLoading: false
        },
        reducers: {
            changeLoading(state, action) {
                state.isLoading = action.payload;
            },
            setUser(state, action) {
                state.user = action.payload
            },
            deleteUser(state) {
                state.user = userInitialState;
            },
            setError(state, action) {
                const error = action.payload;
                state.error = {code: error.code, message: error.message};
            }
        },
        extraReducers:
            (builder) => {
                builder.addCase(signIn.pending, (state) => {
                    state.isLoading = true;
                });
                builder.addCase(signIn.fulfilled, (state, action) => {
                    state.user = action.payload;
                    state.error = errorInitialState;
                    state.isLoading = false;
                    updateData(action.payload);
                });
                builder.addCase(signIn.rejected, (state, action) => {
                    state.user = userInitialState;
                    state.error = action.payload as { message: string; code: number };
                    state.isLoading = false;
                    deleteData();
                });
                builder.addCase(signUp.pending, (state) => {
                    state.isLoading = true;
                });
                builder.addCase(signUp.fulfilled, (state, action) => {
                    state.user = action.payload;
                    state.error = errorInitialState;
                    state.isLoading = false;
                    updateData(action.payload);
                });
                builder.addCase(signUp.rejected, (state, action) => {
                    state.user = userInitialState;
                    state.error = action.payload as { message: string; code: number };
                    state.isLoading = false;
                    deleteData();
                });
                builder.addCase(confirmEmail.pending, (state) => {
                    state.isLoading = true;
                });
                builder.addCase(confirmEmail.fulfilled, (state, action) => {
                    state.user = action.payload;
                    state.error = errorInitialState;
                    state.isLoading = false;
                    updateData(action.payload);
                });
                builder.addCase(confirmEmail.rejected, (state, action) => {
                    state.user = userInitialState;
                    state.error = action.payload as { message: string; code: number };
                    state.isLoading = false;
                    deleteData();
                });
            }
    })
;

export const signIn = createAsyncThunk(
    "appSlice/signIn",
    async function (request: signInRequest, {rejectWithValue}) {
        try {
            const response = await axios.post<signInResponse>(serverUrls.signIn, request);
            return response.data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const signUp = createAsyncThunk(
    "appSlice/signUp",
    async function (request: signUpRequest, {rejectWithValue}) {
        try {
            const response = await axios.post<signUpResponse>(serverUrls.signUp, request);
            return response.data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const confirmEmail = createAsyncThunk(
    "appSlice/confirmEmail",
    async function (token:string ,{rejectWithValue}) {
        try {
            const response = await axios.get<signUpResponse>(serverUrls.confirmEmail+ `?token=${token}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const checkUserAuth = async (): Promise<boolean> => {
    const jwt = localStorage.getItem("jwtToken");
    console.log(jwt)
    if (jwt === null) {
        return false;
    } else if (!jwt) {
        localStorage.removeItem("jwtToken");
        return false;
    } else {
        try {
            await axios.get(serverUrls.ping);
            return true;
        } catch (error) {
            console.log('catched')
            return Promise.reject(error);
        }
    }
}
export const handleError = (error: {
    code: number,
    message: string
    // @ts-ignore
}, navigate: NavigateFunction, appDispatch, setError, deleteUser, needRedirect = true) => {
    console.log('handle error');
    console.log(error);
    switch (error.code) {
        case HttpStatusCode.Unauthorized: {
            console.error("Unauthorized");
            appDispatch(deleteUser());
            deleteData();
            if (needRedirect)
                navigate(paths.welcome);
            break;
        }
        case HttpStatusCode.BadRequest: {
            console.error("BadRequest");
            appDispatch(setError(error));
            if (needRedirect)
                navigate(paths.error);
            break;
        }
        case HttpStatusCode.NotFound: {
            console.error("NotFound");
            appDispatch(setError(error));
            if (needRedirect)
                navigate(paths.error);
            break;
        }
        case HttpStatusCode.InternalServerError: {
            console.error("InternalServerError");
            appDispatch(setError(error));
            if (needRedirect)
                navigate(paths.error);
            break;
        }
        default: {
            console.error("Unknown error");
            appDispatch(setError(error));
            if (needRedirect)
                navigate(paths.error);
            break;
        }
    }
}

export default appSlice.reducer;

export const {
    setUser,
    deleteUser,
    setError,
    changeLoading
} = appSlice.actions;