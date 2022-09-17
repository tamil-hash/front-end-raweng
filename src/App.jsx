import { Suspense, lazy, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

//components
import PageLoader from "./components/PageLoader";
const Login = lazy(() => import("./components/Login"));
const PrimaryLayout = lazy(() => import("./components/PrimaryLayout"));

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  if (isLoggedIn) {
    <Suspense fallback={<PageLoader />}>
      <div className="App">
        <Routes>
          <Route path="login" element={<Login />} />
          <Route path="*" element={<Navigate to="login" />} />
        </Routes>
      </div>
    </Suspense>;
  }

  return (
    <Suspense fallback={<PageLoader />}>
      <div className="App">
        <Routes>
          <Route path="/*" element={<PrimaryLayout />} />
          <Route path="*" element={<Navigate to="courses" />} />
        </Routes>
      </div>
    </Suspense>
  );
}

export default App;

