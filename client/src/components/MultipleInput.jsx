import { useState } from 'react';

const MultipleInput = ({
  label,
  placeholder,
  name,
  defaultValues = [],
  onChange = null,
  onValueRemove = null,
}) => {
  const [inputValue, setInputValue] = useState('');
  const [values, setValues] = useState(defaultValues);

  const handleInputChange = event => {
    setInputValue(event.target.value);
  };

  const handleInputKeyDown = event => {
    console.log(values);
    if (event.key === 'Enter' && inputValue.trim() !== '') {
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
    if (inputValue.trim() !== '') {
      setValues([...values, inputValue.trim()]);
      setInputValue('');
    }
  };

  return (
    <div className="multi-input">
      <div className="form-row">
        <label htmlFor={name} className="form-label">
          {label}
        </label>
        <p className="input-helper">
          press enter after each {name === 'tags' ? 'tag' : 'category'}
        </p>
        <input
          type="text"
          className="form-input"
          placeholder={placeholder}
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleInputKeyDown}
          onBlur={handleBlur}
        />
      </div>
      <div className="tags-container">
        {values?.length > 0 && values[0] !== ''
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
