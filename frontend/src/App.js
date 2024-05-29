import UserJoin from "./pages/UserJoin";
import {BrowserRouter, Route, Routes} from "react-router-dom";

function App() {
  return (
    <div className="App">
        <BrowserRouter>
            <Routes>
                <Route path="/user/join" element={<UserJoin />} />
            </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
