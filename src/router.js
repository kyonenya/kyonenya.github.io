export const getUrlQueries = () => {
    const queries = {};
    const queryStr = window.location.search.slice(1);  // 'foo=1&bar=2'、文頭の'?'を除外
  
    // クエリがない場合は、
    if (!queryStr) {
      return queries;  // 空のオブジェクトを返す。
    }
    
    // 複数のクエリを'&'で切って配列へと分解
    const queryArr = queryStr.split('&')  // ['foo=1', 'bar=2']
    queryArr.forEach((eachQueryStr) => {
      const keyAndValue = eachQueryStr.split('=');  // ['foo', '1']// '='でさらに分割してそれぞれ配列（key,value）へと格納
      // 配列からオブジェクトを生成、このとき値を日本語にデコードしておく
      queries[keyAndValue[0]] = decodeURIComponent(keyAndValue[1]);  // {foo: 1}
    });
  
    return queries;
  };