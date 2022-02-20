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
    const savedPalettes = JSON.parse(window.localStorage.getItem('palettes'));
    this.state = { palettes: savedPalettes || seedColors };
    this.deletePalette = this.deletePalette.bind(this);
    this.savePalette = this.savePalette.bind(this);
    this.findPalette = this.findPalette.bind(this);
    this.syncLocalStorage = this.syncLocalStorage.bind(this);
  }
  findPalette(id) {
    return this.state.palettes.find(function (palette) {
      return palette.id === id;
    })
  }
  deletePalette(id){
    this.setState(st => ({
      palettes: st.palettes.filter(palette => (palette.id !== id))
    }),
    () => this.syncLocalStorage() 
    )
  }
  savePalette(newPalette) {
    this.setState({
      palettes: [...this.state.palettes, newPalette] 
    }, 
      () => this.syncLocalStorage()
    );
  }
  syncLocalStorage(){
    //save palettes to localStorage
    window.localStorage.setItem('palettes', JSON.stringify(this.state.palettes));
  }
  render() {
    return (
      <Switch>
        <Route 
          exact 
          path="/palette/new" 
          render={routeProps => <Newpaletteform savePalette={this.savePalette} palettes={this.state.palettes} {...routeProps} />} 
        />
        <Route 
          exact 
          path="/" 
          render={routeProps => <Palettelist list={this.state.palettes} {...routeProps} deletePalette={this.deletePalette} />} 
        />
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

