import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./Pages/Layout/Layout";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import Protected from "./Pages/Protected/Protected";
function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout/>}>
        <Route index element={<Login/>}/>
        <Route path="text-analyze" element={<Protected children={<Home />} />}/>
      </Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
