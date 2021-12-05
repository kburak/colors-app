import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Palette from './Palette';
import seedColors from './seedColor'
import {generatePalette} from './colorHelpers';

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" render={() => <h1>Palette list goes here</h1>}/>
        <Route 
          exact 
          path="/palette/:id" 
          render={(routeParams) => <h1>Individual color palette</h1>}
        />
      </Switch>

/*       <div>
        <Palette palette={generatePalette(seedColors[4])}/>
      </div> */
    );
  }
}

export default App;

