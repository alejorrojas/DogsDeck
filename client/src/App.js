import "./App.css";
import { Route, BrowserRouter } from "react-router-dom";
import Landing from "./components/Landing";
import Home from "./components/Home";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Route exact path="/" component={Landing} />
        <Route exact path="/home" component={Home} />
      </div>
    </BrowserRouter>
  );
}

export default App;
