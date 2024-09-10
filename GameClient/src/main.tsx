import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {ChakraProvider} from "@chakra-ui/react";
import {I18nextProvider} from "react-i18next";
import i18n from './configs/i18n.ts';
import {BrowserRouter} from "react-router-dom";
import './configs/axios.ts';
import {Provider} from "react-redux";
import store from "./store/store.ts";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Provider store={store}>
            <ChakraProvider>
                <I18nextProvider i18n={i18n}>
                    <BrowserRouter>
                        <App/>
                    </BrowserRouter>
                </I18nextProvider>
            </ChakraProvider>
        </Provider>
    </React.StrictMode>,
)
