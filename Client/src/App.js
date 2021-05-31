import './App.css';
import AddNotice from './Components/AddNotice/AddNotice';
import ShowNotice from './Components/ShowNotice/ShowNotice';
import {BrowserRouter as Router, Switch, Route,Redirect} from 'react-router-dom'; 
function App() {
  return (

    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/add" component={AddNotice}/>
          <Route exact path="/show" component={ShowNotice}/>
          <Redirect from="*" to="/add" />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
