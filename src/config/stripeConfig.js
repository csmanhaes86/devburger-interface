import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(
  'pk_test_51QzKR32Lazj0edXryvJtIr7KBMGl8DIlSXTWBUe4Ooowd2BptjlvZceuI4IiGENAXMPyPxn5MRcxa3YbQgtTJl7700I0alwsNX',
);

export default stripePromise;

