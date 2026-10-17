# AGENTS.md

応答は日本語で行う。

- GitHub Pages向けのVanilla TypeScript MPA + 自作SSGサイト。
- React等は使っていない。HTML文字列を生成して `#root` に描画する設計。
- `index.html` と `posts/*.html` はSSGの生成物。手で編集するのは共通テンプレートの `template.html`。

## コードスタイル

- 関数や変数にむやみに切り出さず、インラインで書く。ワンライナー寄りに簡潔に書く。
- 関数型スタイルで書く。再代入を避け、ループより非破壊的な配列操作を使う。
- フレームワークや大きな依存を追加しない。

## Code App（iOS）で起きた失敗

`npm run dev` をiOSの[Code App](https://code.thebaselab.com/)（Node.js v18.19.0）でも動かす。ネイティブモジュールは入れられない。

- `ts-node/register` が `ERR_DOMAIN_CALLBACK_NOT_AVAILABLE` で落ちた（`process.setUncaughtExceptionCaptureCallback()` が有効なまま起動し、`domain` と共存できない）。サーバー側TSは `jiti` で読む。
- `WebAssembly` が未定義で、webpack既定の `md4` ハッシュが `ReferenceError: WebAssembly is not defined` で落ちた。`webpack.config.mjs` の `output.hashFunction: 'sha256'` を外さない。古いwebpackではOpenSSL 3で `ERR_OSSL_EVP_UNSUPPORTED` にもなるので、webpack系を古い版へ戻したらCode Appで再確認する。
- Nodeの `child_process.spawn()` が `spawn EPERM` で落ちた。Nodeから外部CLIや別プロセスを起動する構成にしない。
- `Intl.RelativeTimeFormat('ja-JP')` が日本語のロケールデータを持たず、「2日前」が「2 days ago」になった。SSGで使う文字列の整形に `Intl` を使わない（`fromNow` は単位の対応表で組み立てている）。

## Textastic（iPad）でのプレビュー

iPadの[Textastic](https://www.textasticapp.com/)でHTMLを `file://` のままプレビューしても動くようにする。プレビューはWebKitで、開いたフォルダ以下のファイルをJSから読める。

- JS・CSS・JSONは相対パスで読む（`posts/[id].html` からは `../`）。`/posts.json` のような絶対パスにすると `file:///posts.json` を読みに行って壊れる。
- WindowsのChrome・Edgeは `file://` からのモジュールスクリプトと `fetch()` を拒否するので、そこでJSの描画部分が出ないのはデグレではない。

## コードレビュー

- GitHubのPRでは、該当する変更行にインラインコメントを付ける。
- レビュー依頼ではコミット・pushをしない。修正案はコメントで示す。
- ベストプラクティスの具体例と学習リソースを示す。
- 指摘には `[must]`（セキュリティ、バグ、重大な設計問題）、`[recommend]`（性能、可読性の大きな改善）、`[nits]`（スタイル、タイポ）を付ける。
