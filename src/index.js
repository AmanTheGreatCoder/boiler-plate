import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import App from "App";
import { store, persister } from "store";
import * as serviceWorker from "serviceWorker";
import reportWebVitals from "reportWebVitals";
import "assets/scss/style.scss";
import Loader from "components/Loader";

ReactDOM.render(
  <Provider store={store}>
    {/* <PersistGate loading={<Loader />} persistor={persister}> */}
    <BrowserRouter basename={""}>
      <App />
    </BrowserRouter>
    {/* </PersistGate> */}
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

// If you want to start measuring performance in your app, pass a function
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
