import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import App from 'App';
import { store, persister } from 'store';
import * as serviceWorker from 'serviceWorker';
import reportWebVitals from 'reportWebVitals';
import 'assets/scss/style.scss';
import Loader from 'components/Loader';
import { ErrorBoundary } from 'pages/ErrorManagement/ErrorBoundary';

ReactDOM.render(
  <Provider store={store}>
    {/* <PersistGate loading={<Loader />} persistor={persister}> */}
    <BrowserRouter basename={''}>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </BrowserRouter>
    {/* </PersistGate> */}
  </Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();

reportWebVitals();
