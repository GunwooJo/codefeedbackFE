import UserJoin from "./pages/UserJoin";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import UserLogin from "./pages/UserLogin";
import Home from "./pages/Home";
import UserEdit from "./pages/UserEdit";
import UserInfo from "./pages/UserInfo";
import PostDetail from "./pages/PostDetail";

function App() {
  return (
    <div className="App">
        <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/user/join" element={<UserJoin />} />
              <Route path="/user/login" element={<UserLogin />} />
              <Route path="/user/edit" element={<UserEdit/>}/>
              <Route path="/user/info" element={<UserInfo/>}/>
              <Route path="/post/:postId" element={<PostDetail/>}/>
            </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
