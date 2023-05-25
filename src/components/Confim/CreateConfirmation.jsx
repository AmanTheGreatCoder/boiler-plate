import React from 'react';
import ReactDOM from 'react-dom';
import ResponsiveDialog from './ResponsiveDialog';

const createConfirmation = (unmountDelay = 1000) => {
  return (props) => {
    const wrapper = document.body.appendChild(document.createElement('div'));
    const promise = new Promise((proceed) => {
      try {
        ReactDOM.render(
          <ResponsiveDialog proceed={proceed} dismiss={dismiss} {...props} />,
          wrapper
        );
      } catch (e) {
        throw e;
      }
    });

    function dismiss() {
      setTimeout(() => {
        ReactDOM.unmountComponentAtNode(wrapper);
        wrapper.remove();
      }, unmountDelay);
    }

    return promise.then((result) => {
      dismiss();
      return result;
    });
  };
};

export default createConfirmation;
