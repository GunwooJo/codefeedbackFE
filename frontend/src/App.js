import UserJoin from "./pages/UserJoin";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import UserLogin from "./pages/UserLogin";

function App() {
  return (
    <div className="App">
        <BrowserRouter>
            <Routes>
                <Route path="/user/join" element={<UserJoin />} />
                <Route path="/user/login" element={<UserLogin />} />
            </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
