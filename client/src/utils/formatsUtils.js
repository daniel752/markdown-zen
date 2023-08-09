export const makeUnderscoreSpace = value => {
  return value.replace(/_/g, ' ');
};

export const convertListToMultiSelectFormat = list => {
  return list.map(item => {
    return {
      label: item,
      value: item,
    };
  });
};
