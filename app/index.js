import React from 'react';
import ReactDOM from 'react-dom';
import { Counter } from 'components';

import 'theme/index.css';

const Main = () => (<Counter initialValue = {0}/>);

ReactDOM.render(<Main />, document.querySelector('main'));

if(process.env.NODE_ENV === 'production' && !!offlineRuntime) {
  offlineRuntime.install({
    onUpdating     : () => undefined,
    onUpdateReady  : () => offlineRuntime.applyUpdate(),
    onUpdated      : () => { window.onbeforeunload = null; window.location.reload(); },
    onUpdateFailed : () => undefined,
  });
}
