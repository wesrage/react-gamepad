import PropTypes from 'prop-types';
import { Component } from 'react';
import equals from 'deep-equal';
import gamepadsPropType from './propType';

function getGamepads() {
   if (!navigator.getGamepads) {
      return [];
   }
   return Array.from(navigator.getGamepads() || [])
      .filter(gamepads => !!gamepads)
      .map(gamepad => ({
         id: gamepad.index,
         axes: gamepad.axes.map((value, index) => ({
            id: index,
            value,
         })),
         buttons: gamepad.buttons.map((button, index) => ({
            id: index,
            pressed: button.pressed,
            value: button.value,
         })),
      }));
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
      return this.state;
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
      const gamepads = getGamepads().map((gamepad) => {
         const oldGamepad = this.state.gamepads.find(g => g.id === gamepad.id);
         return {
            ...gamepad,
            buttons: gamepad.buttons.map((button) => {
               const oldButton =
                  oldGamepad &&
                  oldGamepad.buttons.find(b => b.id === button.id);
               return {
                  ...button,
                  triggered: oldButton && button.pressed && !oldButton.pressed,
                  released: oldButton && !button.pressed && oldButton.pressed,
               };
            }),
         };
      });

      if (!equals(gamepads, this.state.gamepads)) {
         this.setState({ gamepads });
      }
   };

   loop = () => {
      this.looping = requestAnimationFrame(this.loop);
      this.updateGamepads();
   };

   render() {
      return this.props.children;
   }
}
