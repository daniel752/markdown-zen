/* eslint-disable react/prop-types */
import { useState } from 'react';
import { MultiSelect } from 'react-multi-select-component';

const FormRowMultiSelect = ({ name, labelText, list, defaultValue = [] }) => {
  const [selected, setSelected] = useState(defaultValue);

  const makeUnderscoreSpace = value => {
    return value.replace(/_/g, ' ');
  };

  const convertListToMultiSelectFormat = list => {
    const formattedList = [];
    for (const item in list) {
      formattedList.push({
        label: makeUnderscoreSpace(item).toLowerCase(),
        value: item.toLowerCase(),
      });
    }
    return formattedList;
  };
  return (
    <div className="form-row">
      <label className="form-label" htmlFor={name}>
        {labelText}
      </label>
      <MultiSelect
        options={convertListToMultiSelectFormat(list)}
        value={selected}
        onChange={setSelected}
        labelledBy="Select"
      />
      <input
        type="hidden"
        name={name}
        value={JSON.stringify(
          selected.map(item => {
            return item.value;
          }),
        )}
      />
    </div>
  );
};

export default FormRowMultiSelect;
