import "./styles/App.css";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import Landing from "./components/Landing";
import Home from "./components/Home";
import Detail from "./components/Detail";
import Create from "./components/Create";
import Error from "./components/Error";
import Favoritos from "./components/Favoritos";
import Nav from "./components/Nav";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Nav />
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/dogs/:id" component={Detail} />
          <Route exact path="/dog" component={Create} />
          <Route exact path="/favs" component={Favoritos} />
          <Route path="/*" component={Error} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
