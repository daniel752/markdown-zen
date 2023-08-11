export const downloadFile = (uri, name) => {
  const link = document.createElement('a');
  link.download = name;
  link.href = uri;
  link.click();
  document.removeChild(link);
};
