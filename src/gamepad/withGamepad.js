import React from 'react';
import gamepadsPropType from './propType';

export default function withGamepad(Component) {
   return class WrappedComponent extends React.Component {
      static contextTypes = {
         gamepads: gamepadsPropType,
      };

      render() {
         return <Component gamepads={this.context.gamepads} {...this.props} />;
      }
   };
}
