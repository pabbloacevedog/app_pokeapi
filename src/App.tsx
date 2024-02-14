import React from "react";
import { PrincipalPage } from "./pages/PrincipalPage";
import { Provider } from "react-redux";
import { store } from "./store/store";
import logo from "./assets/logo.png";
import "./App.css"
const App = () => {
    return (
        <Provider store={store}>
            <div className="App">
                <header className="App-header">
                    <img
                        src={logo}
                        alt="Pokemon App Logo"
                        className="app-logo"
                    />
                </header>
                <main>
                    <PrincipalPage />
                </main>
            </div>
        </Provider>
    );
};

export default App;
