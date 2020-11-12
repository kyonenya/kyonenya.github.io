export const process = data => {
  for (let i = 0; i < data.length; i++) {
    data[i].index = i;
    data[i].id = data.length - i; // overwrite existing post id
  }
  
  return data.map(aData => {
    aData.text = aData.text.replace(/——/g, '──'); // replace double-dash of ruled lines
    aData.title = aData.title.replace(/——/g, '──');
    aData.plainText = aData.text.replace(/<("[^"]*"|'[^']*'|[^'">])*>/g, '');
    
    return aData;
  });
};
