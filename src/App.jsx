import { Routes, Route, Navigate } from "react-router-dom";
import { Suspense, lazy, useState, createContext } from "react";

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
  };

  return (
    <userContext.Provider value={{ setUserDataOnLogin, userData }}>
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

