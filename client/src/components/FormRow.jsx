import { useState } from 'react';

/* eslint-disable react/prop-types */
const FormRow = ({ type, name, labelText, defaultValue = '', onChange }) => {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelText || name}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        className="form-input"
        defaultValue={defaultValue}
        onChange={onChange}
      />
    </div>
  );
};
export default FormRow;
