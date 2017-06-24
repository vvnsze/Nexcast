/**
 *
 * App.react.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import React from 'react';
import Header from '../Header';

export default class App extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    children: React.PropTypes.node,
  };

  render() {
    return (
      <MuiThemeProvider>
        <div style={{ height: '100%', width: '100%', maxWidth: 'none' }} id="AppWrapper">
          <Header />
          <div style={{ height: '100%'}}>
            {React.Children.toArray(this.props.children)}
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}
