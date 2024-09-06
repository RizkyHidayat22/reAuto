import { RouterProvider } from "react-router-dom";
import router from "./router/index";
import { GoogleOAuthProvider } from "@react-oauth/google";

function App() {
  return (
    <>
      <GoogleOAuthProvider clientId="785595586874-6oukdpv4krb4j3q3h8i92caigsms1mpq.apps.googleusercontent.com">
        <RouterProvider router={router} />
      </GoogleOAuthProvider>
    </>
  );
}

export default App;
