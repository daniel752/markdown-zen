/* eslint-disable react/prop-types */
import { useState } from 'react';

const MultipleInput = ({
  label,
  placeholder,
  name,
  defaultValues = [],
  onChange = null, // In case parent compnent needs to handle onChange event
  onValueRemove = null, // In case parent component needs to update when a value is removed
  inputVerifier = null, // Verifies every input in parent component after the 'enter' key is pressed and value is not empty
  showValues = true,
  isRemoveOnBlur = true,
  isDisabled = false,
}) => {
  const [inputValue, setInputValue] = useState('');
  const [values, setValues] = useState(defaultValues);

  const handleInputChange = event => {
    setInputValue(event.target.value);
  };

  const handleInputKeyDown = event => {
    if (event.key === 'Enter' && inputValue.trim() !== '') {
      if (inputVerifier && !inputVerifier(inputValue)) {
        return;
      }
      setValues([...values, inputValue.trim()]);
      setInputValue('');
      event.preventDefault();
      if (onChange) onChange(event);
    }
  };

  const handleValueRemove = valueToRemove => {
    const updatedValues = values.filter(value => value !== valueToRemove);
    setValues(updatedValues);
    if (onValueRemove) onValueRemove(updatedValues);
  };

  const handleBlur = () => {
    if (isRemoveOnBlur && inputValue.trim() !== '') {
      setValues([...values, inputValue.trim()]);
      setInputValue('');
    }
  };

  return (
    <div className="multi-input">
      <div className="form-row">
        <label htmlFor={name} className="form-label">
          {name || label}
        </label>
        <p>press enter after each value</p>
        <input
          type="text"
          className="form-input"
          placeholder={placeholder}
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleInputKeyDown}
          onBlur={handleBlur}
          disabled={isDisabled}
        />
      </div>
      <div className="tags-container">
        {showValues && values?.length > 0 && values[0] !== ''
          ? values.map((value, index) => (
              <div key={index} className="tag">
                {value}
                <button
                  type="button"
                  onClick={() => handleValueRemove(value)}
                  className="tag-remove-btn"
                >
                  X
                </button>
              </div>
            ))
          : null}
      </div>
      <input type="hidden" name={name} id={name} value={values} />
    </div>
  );
};

export default MultipleInput;
