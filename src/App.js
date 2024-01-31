import "./App.css";
import Home from "./Home";
import { AppProvider } from "./Context";
import { Auth0Provider } from "@auth0/auth0-react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/navbar";
import { Cart } from "./Cart/Cart";

const App = () => {
  return (
    <>
      <Auth0Provider
        domain="dev-pw35tyul0txik0xb.us.auth0.com"
        clientId="naLFmnpvO2CZBcx423mCPuRsCB57mYo3"
        authorizationParams={{
          redirect_uri: window.location.origin,
        }}
      >
        <div>
          <AppProvider>
            <Router>
              <Navbar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/cart" element={<Cart />} />
              </Routes>
            </Router>
          </AppProvider>
        </div>
      </Auth0Provider>
    </>
  );
};

export default App;
