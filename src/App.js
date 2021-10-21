

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Registration from "./components/Registration";
import Footer from "./components/Footer";
import Fav from "./components/fav";
import ASearch from "./components/advancesearch";


function ReactRouter() {
    return (
        <Router>
            <header>
                
            </header>
            <main>
                <Switch>
                    <Route exact path="/" component={Login} />
                    <Route exact path="/Favorite" component={Fav} />
                    <Route exact path="/Advancesearch" component={ASearch} />


                    
                    <Route exact path="/Registration" component={Registration} />
                   
                </Switch>
            </main>
            <footer>
                <Footer />
            </footer>
        </Router>
    );
}

function App() {
    return (
        <div className="App">
            <ReactRouter />
        </div>
    );
}

export default App;
