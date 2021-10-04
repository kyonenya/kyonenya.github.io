import { datarable } from './types';

export const enrich = (data: datarable[]): datarable[] =>
  data.map((_aData, idx) => {
    const aData = { ..._aData };
    aData.id = data.length - idx;
    aData.index = idx;
    aData.text = aData.text.replace(/——/g, '──'); // ダブルダッシュ -> 罫線2つ
    aData.text = aData.text.replace(/　/g, ' '); // 全角スペース -> 半角スペース
    aData.title = aData.title.replace(/——/g, '──');
    aData.plainText = aData.text.replace(/<("[^"]*"|'[^']*'|[^'">])*>/g, '');
    return aData;
  });
