import _ from 'lodash';

const transformErrors = (errorsBackend) => {
  const errors = {};
  const keys = Object.keys(errorsBackend);

  // eslint-disable-next-line array-callback-return
  keys.map((k) => {
    if (errorsBackend[k]) {
      // eslint-disable-next-line prefer-destructuring
      errors[k] = errorsBackend[k][0];
    }
  });

  return _.mapKeys(errors, (v, k) => k);
};

export default transformErrors;
