# Vsocdeの導入プラグイン
- [EJS Language Support](https://marketplace.visualstudio.com/items?itemName=leonzalion.vscode-ejs)
- [EJS Beautify](https://marketplace.visualstudio.com/items?itemName=j69.ejs-beautify)
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [Stylelint](https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint)
- [EditorConfig for VS Code](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig)

# コマンド
|command|purpose|
| ---- | ---- |
|yarn|必要パッケージのインストール|
|yarn start|開発時に実行するコマンド|
|yarn build|buildディレクトリに納品・公開用のファイルを生成するコマンド|
|yarn serve|publicディレクトリのファイルをbuildディレクトリにコピーし、サーバーを起動させる|
|yarn fix:css|cssの構文チェックから整形まで行うコマンド|
|yarn fix:js|jsの構文チェックから整形まで行うコマンド|

# Main Folders
| folder | purpose |
| ---- | ---- |
| build | `yarn build` を実行すると書き出される。主に納品・公開用のファイルとして扱う。 |
| dst | `yarn start` を実行すると書き出される。開発時にローカルサーバーから参照するファイル。 |
| src | 開発に使用するファイル。 |

# Node.jsのバージョン
12.22.12（npmは6.14.16を推奨）

●パッケージ「slash」をv4.0.0以上にアップデートしない。
https://github.com/sindresorhus/slash/releases

●パッケージ「gulp-imagemin」はv8.0.0以上にアップグレードしない。
https://crieit.net/posts/gulp-imagemin-become-pure-esm-package-20210817

# コーディング方針
- HTML: HTML5（EJS）
- CSS: CSS3（SCSS）
- JavaScript: ECMAScript5互換、jQueryも利用可能
- 改行コード: CR+LF
- インデント: 半角スペース2個
- 原則としてidにCSSを付与しない。
- 原則としてJavaScriptで使用するクラスには `js-` をprefixとして付与する。
- 原則としてファイル名のアルファベットは全て小文字とする。
## ブレイクポイント
サイトデザイン、もしくは案件に応じて変更してください。
デフォルトでは以下を設定しております。
| device | display resolution |
| ---- | ---- |
| PC | 1366px |
| Tablet Landscape | 1024px (XGA / iPad Landscape) |
| Tablet Portrait | 768px (iPad Portrait) |

ブレイクポイントの設定は「src/css/foundation/_variables.scss」を参照してください。
設定したブレイクポイントを用いた関数を「src/css/foundation/_mixin-utils.scss」で用意しております。
## html
- 全てのファイルを.EJSで記述する。
- リンクはルート相対パスで指定する。
## CSS
- 全てのファイルを.scssで記述する。
- 原則として全てのcssは `/css/main.css` に集約する。
  * 開発中は作業しやすいように適宜パーシャルに分割し `/css/main.css` で `@import` してください。
- CSS設計はFlocss、命名規則はBEMを採用する。
- ブラウザのfont-size設定を考慮し、基本的に px ではなく rem で設定する。<br>※ 参考 https://daib-log.com/unit/
- リセットcssは以下を参考に `/css/foundation/_normalize.scss` に設定済み。<br>※ 参考  http://meyerweb.com/eric/tools/css/reset/ v2.0 | 20110126
## JavaScript
- 原則として全てのJSは `/js/main.js` に集約する。
  * jQueryやjQueryに依存する外部ライブラリを利用したい場合は /js/vendor/下に配置する。
## 画像（PNG, JPEG, SVG）
- サイト全体の共通画像は `/images/` 配下に配置する。
- ビルド時に最適化を行うため制作段階では画質を落としたり圧縮したりする必要はありません<br>圧縮された画像はビルド後に /build/assets/images/no_compress/ 以下に配置されます。<br>※ 画像を圧縮させたくない場合は「no_compress」というフォルダを作成し、その配下に配置する。
## フォント
- Googleフォントを利用する場合はCDN + preload<br>それ以外のフォントを読み込ませる場合はサブセット化したものをCSS + preloadを使って読み込ませることを推奨（2022年3月現在）
  * 和文フォントファイルをCSS経由で読み込ませる場合、サブセット化を行い圧縮したものをCSSで読み込ませる。<br>また、headタグにwoff2ファイルのpreloadの記述を行うことでCore Web Vitals（LCP、CLS）への影響を軽減できる。
  * CDNを利用する場合、preloadの記述を行うことでCore Web Vitals（LCP、CLS）への影響を軽減できる。
### preload記述参考
①同サーバー内に配置する場合
```html
<link rel="preload" href="assets/font/noto-sans/NotoSansJP-Regular.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="assets/font/noto-sans/NotoSansJP-Bold.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="assets/font/noto-sans/NotoSansJP-Medium.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="assets/font/noto-sans/NotoSansJP-Light.woff2" as="font" type="font/woff2" crossorigin>
```
②CDNを利用する場合
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;400;500;700&display=swap" />
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;400;500;700&display=swap" media="print" onload="this.media='all'" />
```
※サブセット化参考（windows、mac共に以下ツールを利用できます）
https://wpqw.jp/snippet/webfont/
●サブセットフォントメーカー
https://opentype.jp/subsetfontmk.htm
●WOFFコンバータ
https://opentype.jp/woffconv.htm

# 概要
|name|purpose|
| ---- | ---- |
|build|yarn build を実行すると書き出される。主に納品・公開用のファイルとして扱う。<br>HTML、CSS、JavaScript、画像ファイルが圧縮されている。 |
|dst|yarn start を実行すると書き出される。開発時にローカルサーバーから参照するファイル。<br>※本ディレクトリ下にあるファイルは本番アップしない。 |
|src|開発に使用するファイル。|
|gulp|gulpやwebpackの設定ファイル。|
|public|その他ファイルを配置するディレクトリ。<br>yarn serveでbuildディレクトリにコピー＆ライブサーバーを起動できる。|
|.vscode|vscodeの設定ファイル。|
|gulpfile.js|gulpの設定ファイル。実行したいタスクを設定できる。<br>webpを利用したい場合は該当コメントを解除する。|
|.editorconfig|インデントや改行コードなど、コーディングスタイルを統一するための設定ファイル|
|.eslintrc.json|ESLint（JavaScript のための静的検証ツール、構文ミスチェック等）の設定ファイル|
|.htmlhintrc|HTMLのルール設定ファイル（build時にgulpのタスク上で利用される）|
|.node-version|node.jsのバーション設定（指定されたバージョンに自動で切り替わる）|
|.prettierrc|コード整形ツール「Prettier」を利用する上でのルールを設定するファイル|
|.stylelintrc.json|stylelint（CSSのための静的検証ツール、構文ミスチェック等）の設定ファイル|
## gulpディレクトリ下のファイルに関する説明
|name|purpose|
| ---- | ---- |
|conf.js|gulp、webpackの設定ファイル。対象（出力先）のファイルのパスを変更する場合は本ファイルを修正する。<br>231行目以降でbuild時の画像の圧縮度を設定できる。|
|plugins.js|gulpプラグインの読み込みを簡素化する（参考：https://www.nxworld.net/gulp-plugin-gulp-load-plugins.html）|
|tasks/clean.js|開発サーバー起動時（yarn start）もしくはビルド時（yarn build）にdst、buildディレクトリ下のファイルを全て消去する。|
|tasks/cleanCSS.js|ビルド時のCSSファイル圧縮、メディアクエリごとに並び替え、purgeのON/OFFを設定する。<br>未使用のCSSを削除したい場合は28〜36行目のコメントを解除する。|
|tasks/copy.js|開発サーバー起動時もしくはビルド時に、src（public）ディレクトリ配下にあるファイルをdst、buildディレクトリ下にコピーする。|
|tasks/imagemin-webp.js|srcディレクトリ下にある画像ファイル（png, jpg）をwebpに変換し、dst、buildディレクトリ下にコピーする。<br>webp変換時の圧縮度も設定できる。|
|tasks/imagemin.js|srcディレクトリ下にある画像ファイル（png, jpg）を圧縮し、dst、buildディレクトリ下にコピーする。|
|tasks/ejs.js|ejsをhtmlに変換する上での設定ファイル。|
|tasks/replace.js|ビルド後のHTMLのエラーチェック、ファイル名の変更を行う。<br>build時におけるhtmlの圧縮を行いたい場合は12~17行目のコメントを解除する。|
|tasks/sass.js|scssをcssに変換する上での設定ファイル。<br>IEに対応させる場合は該当コメントを解除する。|
|tasks/scripts.js|jsファイルのバンドル、トランスパイル（ES6→ES5の変換）を行う上での設定ファイル。|
|tasks/serve.js|開発サーバーを起動させる設定ファイル|
|tasks/vendorScripts.js|js/vendorディレクトリ下のjsファイルをdst、buildディレクトリ下にコピーする。|
|tasks/watch.js|開発サーバー起動時、srcディレクトリ下のファイルの変更があればブラウザをリロードさせる。|
## srcディレクトリ下のファイルに関する説明
|name|purpose|
| ---- | ---- |
|_layout|headやheader、footer等共通パーツを管理する。|
|css|本ディレクトリ直下にある ''main.scss'' で読み込ませるscssファイルを配置する。<br>ファイル名の先頭に「_」が含まれている場合、cssへの変換対象から外れる。<br>CSS設計はFLOCSS、命名規則はBEMを採用している。|
|file|画像以外のファイル（pdfやdoc、xlsx、mp4等）を配置する。<br>圧縮されずにdst、buildディレクトリにそのままコピーされる。|
|font|（CSS経由で読み込ませる場合のみ）フォントファイルを配置する。<br>dst、buildディレクトリにそのままコピーされる。
|images|画像ファイルを配置する。<br>no_compressフォルダ以下にある画像は圧縮されずにbuildディレクトリにそのままコピーされる。
|js|JavaScriptファイルを配置する。<br>main.jsでimportしてwebpackによる変換を行いたいJSファイルは「init」ディレクトリに、<br>そのまま利用するJSファイルは「vendor」ディレクトリに配置する。|
|data.json|各ページのmeta情報やパス、配置ディレクトリ等の情報を設定する。<br>こちらで設定したものを使ってejs内で分岐処理を行うことが可能。|
## cssディレクトリ下のファイルに関する説明
|name|purpose|
| ---- | ---- |
|foundation|ページ全体のデフォルトスタイル、変数、関数を定義する|
|layout|ページの共通レイアウトのスタイルを管理する。|
|object|（基本的に）サイト全体で再利用できるスタイルを管理する。|
|object/component/|小さな単位のモジュールのスタイルを管理する。|
|object/project/|上記のスタイルと他の要素によって構成される大きな単位のモジュールを管理する。|
|object/utility/|細かな調整に使えるクラスを管理する。|
|object/vendor/|外部からダウンロードしたスタイルを管理する。|
|object/page/|ページ固有のスタイルを管理する。|
|main.scss|上記のscssファイルをimportするscssファイル。<br>読み込みたいscssファイルの設定や、読み込み順は本ファイルで設定する。|
※main.css以外の親CSSファイルも追加することは可能です。

●Dart Sassを採用しているため、従来までと除算の記述が異なります。
参考：https://kaminarimagazine.com/web/2021/07/09/divide-by-slash-is-deprecated-and-will-be-removed/

●FLOCSS、BEMに関しては以下参考。そこまで厳密に設計しなくてもOKです。
参考：https://zenn.dev/yurukei20/articles/df151d3b276fbc
## jsディレクトリ下のファイルに関する説明
|name|purpose|
| ---- | ---- |
|init|main.js下で非同期に実行かつwebpackによる変換を通したいjsファイルを配置する。|
|modules|main.js（もしくはinitディレクト下のjsファイル）で読み込ませる外部ライブラリを配置する。<br>npm経由でダウンロードできない場合のみ利用する。|
|style|jsのライブラリに依存するスタイルを定義するcss（scss）ファイルを配置する。<br>main.js（もしくはinitディレクト下のjsファイル）でimportして使う。|
|vendor|jQueryやjQuery依存ライブラリ、もしくはjQueryで記述されたファイルを配置する。<br>※webpackでの変換を通さずにbuild時に圧縮されます。|
|main.js|上記のjsファイルをimportするjsファイル。webpackによる変換対象。|

# エラー解決まとめ
●build後のhtmlで読み込まれるはずの「main.min.css」もしくは「main.min.js」のパスが「main.css」もしくは「main.js」になってしまった。
→ejs内で「◯◯-main.css-◯◯」「◯◯-main.js-◯◯」のような文字の羅列がなくなるように修正する。

●yarn start後にホットリロードが効かない。
→各ローカル環境によって稀に効かなくなることがありますので、数回お試しください。