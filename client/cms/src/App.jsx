import { RouterProvider } from "react-router-dom";
import router from "./router/index";
import { GoogleOAuthProvider } from "@react-oauth/google";

function App() {
  return (
    <>
      <GoogleOAuthProvider clientId="785595586874-dquish4g073nviavt8bjg764lkcjpg2e.apps.googleusercontent.com">
        <RouterProvider router={router} />
      </GoogleOAuthProvider>
    </>
  );
}

export default App;
