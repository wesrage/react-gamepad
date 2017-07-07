/* eslint-disable react/jsx-filename-extension */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { render } from 'react-dom';
import Provider from './gamepad/Provider';
import GamepadLogger from './components/GamepadLogger';
import './index.html';

const component = (
   <Provider>
      <div>
         <GamepadLogger />
         <GamepadLogger />
      </div>
   </Provider>
);

const target = document.getElementById('root');

render(component, target);
