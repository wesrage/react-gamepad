import PropTypes from 'prop-types';
import { Component } from 'react';
import gamepadsPropType from './propType';

function getGamepads() {
   if (navigator.getGamepads) {
      return Array.from(navigator.getGamepads() || []);
   }
   return [];
}

export default class Provider extends Component {
   static propTypes = {
      children: PropTypes.node.isRequired,
   };

   static childContextTypes = {
      gamepads: gamepadsPropType,
   };

   state = {
      gamepads: [],
   };

   getChildContext() {
      return {
         gamepads: this.state.gamepads.filter(gamepad => !!gamepad).map(gamepad => ({
            id: gamepad.id,
            axes: gamepad.axes.map((value, index) => ({
               id: index,
               value,
            })),
            buttons: gamepad.buttons
               .map((button, index) => ({
                  id: index,
                  pressed: button.pressed,
                  value: button.value,
               }))
               .filter(button => button.pressed),
         })),
      };
   }

   componentDidMount() {
      window.addEventListener('gamepadconnected', this.updateGamepads);
      this.loop();
   }

   componentWillUnmount() {
      window.addEventListener('gamepaddisconnected', this.updateGamepads);
      cancelAnimationFrame(this.looping);
   }

   updateGamepads = () => {
      this.setState({
         gamepads: getGamepads(),
      });
   };

   loop = () => {
      this.looping = requestAnimationFrame(this.loop);
      this.updateGamepads();
   };

   render() {
      return this.props.children;
   }
}
