export const enrich = (
  data: {
    id: number;
    index?: number;
    date: string;
    title: string;
    text: string;
    plainText?: string;
    tags: string[];
  }[]
) => {
  return data.map((_aData, index) => {
    const aData = { ..._aData };
    aData.id = data.length - index;
    aData.index = index;
    aData.text = aData.text.replace(/——/g, '──'); // replace double-dash of ruled lines
    aData.title = aData.title.replace(/——/g, '──');
    aData.plainText = aData.text.replace(/<("[^"]*"|'[^']*'|[^'">])*>/g, '');
    return aData;
  });
};
