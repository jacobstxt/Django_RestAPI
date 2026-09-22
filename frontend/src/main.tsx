import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {Provider} from "react-redux";
import {store} from "./store";
import {BrowserRouter} from "react-router";
import {GoogleReCaptchaProvider} from "react-google-recaptcha-v3";
import {APP_ENV} from "./env";
import {ThemeProvider} from "./context/ThemeContext.tsx";
import {GoogleOAuthProvider} from "@react-oauth/google";

createRoot(document.getElementById('root')!).render(
    <>
        <ThemeProvider>
            <Provider store={store}>
                <GoogleReCaptchaProvider reCaptchaKey={APP_ENV.RECAPTCHA_KEY}>
                    <BrowserRouter>
                      <GoogleOAuthProvider clientId="1088225135754-rstar5vvfn10atk429337g44it582ck3.apps.googleusercontent.com">
                        <App/>
                      </GoogleOAuthProvider>
                    </BrowserRouter>
                </GoogleReCaptchaProvider>
            </Provider>
        </ThemeProvider>
    </>
)
