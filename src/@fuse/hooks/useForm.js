import _ from '@lodash';
import { useCallback, useState } from 'react';

function useForm(initialState, onSubmit, rules) {
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState({});

  const handleChange = useCallback((event) => {
    event.persist();
    setForm((_form) =>
      _.setIn(
        { ..._form },
        event.target.name,
        event.target.type === 'checkbox' ? event.target.checked : event.target.value
      )
    );
  }, []);

  const resetForm = useCallback(() => {
    if (!_.isEqual(initialState, form)) {
      setForm(initialState);
    }
    setErrors({});
  }, [form, initialState]);

  const setInForm = useCallback((name, value) => {
    setForm((_form) => _.setIn(_form, name, value));
  }, []);

  const handleSubmit = useCallback(
    (event) => {
      if (event) {
        event.preventDefault();
      }
      if (onSubmit) {
        if (rules) {
          if (Object.keys(rules(form)).length === 0) {
            setErrors({});
            onSubmit();
          } else {
            setErrors(rules(form));
          }
        } else {
          onSubmit();
        }
      }
    },
    [onSubmit]
  );

  return {
    form,
    handleChange,
    handleSubmit,
    resetForm,
    setForm,
    setInForm,
    errors,
    setErrors,
  };
}

export default useForm;
