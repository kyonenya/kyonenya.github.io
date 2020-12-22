import { datarable } from './types';

export const enrich = (data: datarable[]): datarable[] => {
  return data.map((_aData, idx) => {
    const aData = { ..._aData };
    aData.id = data.length - idx;
    aData.index = idx;
    aData.text = aData.text.replace(/——/g, '──'); // replace double-dash of ruled lines
    aData.title = aData.title.replace(/——/g, '──');
    aData.plainText = aData.text.replace(/<("[^"]*"|'[^']*'|[^'">])*>/g, '');
    return aData;
  });
};
