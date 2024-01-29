import "./App.css";
import Home from "./Home";
import { AppProvider } from "./Context";
import { Auth0Provider } from '@auth0/auth0-react';

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

        <AppProvider>
          <Home />
        </AppProvider>
      </Auth0Provider>
    </>
  );
};

export default App;
