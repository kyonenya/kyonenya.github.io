export const enrich = (data) => {
  const result = [...data];
  for (let i = 0; i < result.length; i += 1) {
    result[i].index = i;
    result[i].id = result.length - i; // overwrite existing post id
  }

  return result.map((aResult) => {
    const aData = { ...aResult };
    aData.text = aData.text.replace(/——/g, '──'); // replace double-dash of ruled lines
    aData.title = aData.title.replace(/——/g, '──');
    aData.plainText = aData.text.replace(/<("[^"]*"|'[^']*'|[^'">])*>/g, '');
    return aData;
  });
};
