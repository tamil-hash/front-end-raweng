import { Suspense, lazy, useState, useContext, createContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

//components
import PageLoader from "./components/PageLoader";
const Login = lazy(() => import("./components/Login"));
const Signup = lazy(() => import("./components/Signup"));
const PrimaryLayout = lazy(() => import("./components/PrimaryLayout"));

export const userContext = createContext();

function App() {
  const [userData, setUserData] = useState(null);

  const setUserDataOnLogin = (userData) => {
    setUserData(userData);
    navigate("/");
  };

  return (
    <userContext.Provider value={{ setUserDataOnLogin }}>
      <Suspense fallback={<PageLoader />}>
        <div className="App">
          <Routes>
            {!!userData ? (
              <>
                <Route path="/*" element={<PrimaryLayout />} />
                <Route path="*" element={<Navigate to="courses" />} />
              </>
            ) : (
              <>
                <Route path="login" element={<Login />} />
                <Route path="signup" element={<Signup />} />
                <Route path="*" element={<Navigate to="login" />} />
              </>
            )}
          </Routes>
        </div>
      </Suspense>
    </userContext.Provider>
  );
}

export default App;

