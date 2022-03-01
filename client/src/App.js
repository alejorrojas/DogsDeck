import "./App.css";
import { Route, BrowserRouter } from "react-router-dom";
import Landing from "./components/Landing";
import Home from "./components/Home";
import Detail from "./components/Detail";
import Create from "./components/Create";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Route exact path="/" component={Landing} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/dogs/:id" component={Detail} />
        <Route exact path="/dog" component={Create} />
      </div>
    </BrowserRouter>
  );
}

export default App;
