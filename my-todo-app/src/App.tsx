import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store";
import AllTasks from "./pages/AllTasks/AllTasks";
import DeletedTasks from "./pages/DeletedTasks/DeletedTasks";
import Header from "./components/Header/Header";
import "./App.css";

const App: React.FC = () => (
  <Provider store={store}>
    <Router>
    <Header />
      <div className="wrapper">
        <Routes>
          <Route path="/all" element={<AllTasks />} />
          <Route path="/deleted" element={<DeletedTasks />} />
        </Routes>
      </div>
    </Router>
  </Provider>
);

export default App;
