import PropTypes from 'prop-types';
import React from 'react';
import withGamepad from './withGamepad';
import gamepadsPropType from './propType';

class Consumer extends React.Component {
   static propTypes = {
      children: PropTypes.func.isRequired,
      gamepads: gamepadsPropType,
   };

   render() {
      return this.props.children(this.props.gamepads);
   }
}

export default withGamepad(Consumer);
