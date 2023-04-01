import "./App.css";
import Header from "./component/common/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./component/userRegisterLogin/Register";
import Login from "./component/userRegisterLogin/Login";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            exact
            path="/"
            element={
              <>
                <Header />
              </>
            }
          />
          <Route
            path="/register"
            element={
              <>
                <Header /> <Register />
              </>
            }
          />
              <Route
            path="/login"
            element={
              <>
              <Login></Login>
              </>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
