import React, { PropTypes } from 'react';
import ReactUpload from 'react-s3-uploader';
import { connect } from 'react-redux';
import FlatButton from 'material-ui/FlatButton';
import { Card } from 'material-ui/Card';


export class CardCreator extends React.Component {
  constructor(props) {
    super(props);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFormSubmit(event) {
    event.preventDefault();
    console.log('+++line 17 cardCreator form successfully submitted: ', event.target);
  }

  render() {
    return (
      <Card>
        <form onSubmit={this.handleFormSubmit}>
          <fieldset>
            <label htmlFor="timeStamp">TimeStamp</label>
            <input type="text" name="timeStamp" value={this.props.timeStamp} />
          </fieldset>
          <fieldset>
            <label htmlFor="text">Text</label>
            <input type="text" name="text" value={this.props.text} />
          </fieldset>
          <fieldset>
            <label htmlFor="buttonText">Button Text</label>
            <input type="buttonText" name="buttonText" value={this.props.buttonText} />
          </fieldset>
          <fieldset>
            <label htmlFor="buttonLink">Button Link</label>
            <input type="buttonLink" name="buttonLink" value={this.props.buttonLink} />
          </fieldset>
          <FlatButton action="submit">Save</FlatButton>
          <div>
            <ReactUpload
              className="uploader"
              signingUrl="/s3/sign"
              signingUrlMethod="GET"
              accept="image/*"
              uploadRequestHeaders={{
                'x-amz-acl': 'public-read',
              }}
              signingUrlWithCredentials
              contentDisposition="auto"
            />
          </div>
        </form>
        {/* <Paper>

        </Paper> */}
      </Card>
    );
  }

}

CardCreator.propTypes = {
  dispatch: PropTypes.func.isRequired,
  timeStamp: PropTypes.string,
  text: PropTypes.string,
  buttonText: PropTypes.string,
  buttonLink: PropTypes.string,
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapDispatchToProps)(CardCreator);
