import debounce from 'lodash/throttle';
import ActionSearch from 'material-ui/svg-icons/action/search';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import * as actions from './actions';

// const styles = {
//   input: {
//     width: '5px'
//   },
// };

export class Searchbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { searchbar: '' };
    this.onInputChange = this.onInputChange.bind(this);
  }

  onInputChange(e) {
    debounce(() => {
      this.props.dispatch(actions.fetchSideMenuResults(e));
    }, 10000)();
  }

  render() {
    return (
      <div>
        <input
          type="text"
          placeholder="Search episodes"
          name="searchbar"
          onChange={(event) => this.onInputChange(event.target.value)}
          value={this.state.term}
          style={{ width: '80%', height: '30px', marginBottom: '0', marginTop: '5px', display: 'inline-block', marginLeft: '0', marginRight: 'auto' }}
        />
        <ActionSearch />
      </div>
    );
  }
}

Searchbar.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    podcasts: state.podcasts.podcasts,
  };
}


function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Searchbar);
