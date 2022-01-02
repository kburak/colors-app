import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Palette from './Palette';
import seedColors from './seedColor'
import { generatePalette } from './colorHelpers';
import Palettelist from './PaletteList';
import SingleColorPalette from './SingleColorPalette';
import Newpaletteform from './NewPaletteForm';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { palettes: seedColors };
    this.savePalette = this.savePalette.bind(this);
    this.findPalette = this.findPalette.bind(this);
  }
  findPalette(id) {
    return this.state.palettes.find(function (palette) {
      return palette.id === id;
    })
  }
  savePalette(newPalette) {
    this.setState({palettes: [...this.state.palettes, newPalette] });
  }
  render() {
    return (
      <Switch>
        <Route 
          exact 
          path="/palette/new" 
          render={routeProps => <Newpaletteform savePalette={this.savePalette} palettes={this.state.palettes} {...routeProps} />} 
        />
        <Route exact path="/" render={routeProps => <Palettelist list={this.state.palettes} {...routeProps} />} />
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
        />
      </Switch>

      /*       <div>
              <Palette palette={generatePalette(seedColors[4])}/>
            </div> */
    );
  }
}

export default App;

