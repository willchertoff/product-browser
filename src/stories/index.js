import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import App from '../index';

storiesOf('product-broswer', module)
  .add('default', () =>
    <App />
  )
