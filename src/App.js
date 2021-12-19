import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Palette from './Palette';
import seedColors from './seedColor'
import { generatePalette } from './colorHelpers';
import Palettelist from './PaletteList';
import SingleColorPalette from './SingleColorPalette';

class App extends Component {
  findPalette(id) {
    return seedColors.find(function (palette) {
      return palette.id === id;
    })
  }
  render() {
    return (
      <Switch>
        <Route exact path="/" render={routeProps => <Palettelist list={seedColors} {...routeProps} />} />
        <Route
          exact
          path="/palette/:id"
          render={(routeProps) => {
            return <Palette palette={generatePalette(
              this.findPalette(routeProps.match.params.id)
            )} />
          }}
        />
        <Route
          exact
          path="/palette/:paletteId/:colorId"
          render={(routeProps) => {
            return <SingleColorPalette 
              palette={generatePalette(
                this.findPalette(routeProps.match.params.paletteId)
              )}
              colorId={routeProps.match.params.colorId}
            />
          }}
        ></Route>
      </Switch>

      /*       <div>
              <Palette palette={generatePalette(seedColors[4])}/>
            </div> */
    );
  }
}

export default App;

