import App from 'App';
import 'assets/scss/style.scss';
import { ErrorBoundary } from 'pages/ErrorManagement/ErrorBoundary';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import reportWebVitals from 'reportWebVitals';
import * as serviceWorker from 'serviceWorker';
import { store } from 'store';

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();

reportWebVitals();
