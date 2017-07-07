import React from 'react';
import Consumer from '../gamepad/Consumer';

export default class GamepadLogger extends React.Component {
   static propTypes = {};

   static defaultProps = {};

   render() {
      return (
         <Consumer>
            {gamepads =>
               (<ul>
                  {gamepads.map(gamepad =>
                     (<div key={gamepad.id}>
                        <h1>
                           Gamepad {gamepad.id}
                        </h1>
                        <h2>Buttons</h2>
                        {gamepad.buttons &&
                           gamepad.buttons.length > 0 &&
                           <ul>
                              {gamepad.buttons.map(button =>
                                 (<li key={button.id}>
                                    {button.id}: {button.value}
                                 </li>),
                              )}
                           </ul>}

                        <h2>Axes</h2>
                        {gamepad.axes &&
                           gamepad.axes.length > 0 &&
                           <ul>
                              {gamepad.axes.map(axis =>
                                 (<li key={axis.id}>
                                    {axis.id}: {axis.value}
                                 </li>),
                              )}
                           </ul>}
                     </div>),
                  )}
               </ul>)}
         </Consumer>
      );
   }
}
