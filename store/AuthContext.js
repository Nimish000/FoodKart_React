
// import { storage } from "../store/Storage"; // from step above

// import { createContext, useEffect, useState } from "react";

// export const AuthContext = createContext({
//   token: "",
//   isAuthenticated: false,
//   setToken: (token) => {},
//   logout: () => {},
// });

// function AuthContextProvider({ children }) {
//   const [authToken, setAuthToken] = useState();

//   function setToken(token) {
//     setAuthToken(token);
// storage.set('token',token)
    
//   }

//   function logout() {
//     setAuthToken(null);
//     storage.delete('token')
//   }

//   const values = {
//     token: authToken,
//     isAuthenticated: !!authToken,
//     setToken: setToken,
//     logout: logout,
//   };

//   return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
// }

// export default AuthContextProvider;
