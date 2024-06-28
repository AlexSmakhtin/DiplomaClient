import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {ChakraProvider} from "@chakra-ui/react";
import {I18nextProvider} from "react-i18next";
import i18n from './i18n';
import {BrowserRouter} from "react-router-dom";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <ChakraProvider>
            <I18nextProvider i18n={i18n}>
                <BrowserRouter>
                    <App/>
                </BrowserRouter>
            </I18nextProvider>
        </ChakraProvider>
    </React.StrictMode>,
)
