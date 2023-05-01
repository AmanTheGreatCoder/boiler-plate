import createConfirmation from './createConfirmation';

// create confirm function
const confirm = createConfirmation();

export default function(confirmation, options = {}) {
  console.log('here is your props',options)
  return confirm({ confirmation, options });
}
