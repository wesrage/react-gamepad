import React from 'react';
import withGamepad from '../gamepad/withGamepad';
import gamepadPropType from '../gamepad/propType';

class GamepadLogger extends React.Component {
   static propTypes = {
      gamepads: gamepadPropType,
   };

   render() {
      const gamepad = this.props.gamepads[0];
      if (!gamepad) {
         return null;
      }
      return (
         <div>
            <h1>
               {gamepad.id}
            </h1>
            <h2>Buttons</h2>
            {gamepad.buttons &&
               gamepad.buttons.length > 0 &&
               <ul>
                  {gamepad.buttons.map(button =>
                     <li key={button.id}>
                        {button.id}: {button.value}
                     </li>,
                  )}
               </ul>}

            <h2>Axes</h2>
            {gamepad.axes &&
               gamepad.axes.length > 0 &&
               <ul>
                  {gamepad.axes.map(axis =>
                     <li key={axis.id}>
                        {axis.id}: {axis.value}
                     </li>,
                  )}
               </ul>}
         </div>
      );
   }
}

export default withGamepad(GamepadLogger);
