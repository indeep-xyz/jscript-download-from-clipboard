download from clipboard
====

Installation
----

管理者権限で _install.bat_ を実行してください。

### 注意

レジストリを書き換えます。そういうつもりで作っていませんが、万が一、何らかのトラブルが起きても開発者および公開者は一切の責任を負わないものとします。

Usage
----

1. クリップボードにダウンロードしたいファイルの URL を格納する。
2. フォルダ内の何もないところで右クリック。
3. 項目内から _download from clipboard_ を選択。

少しすると、フォルダ内にファイルがダウンロードされます。

### 補足

- 改行区切りで URL を格納している場合、順番に処理をおこないます。
- クリップボードにダウンロード可能な URL がない場合は、エラーを通知して終了します。

Options
----

オプション設定を行いたい場合は、 _bin_ ディレクトリにある _main-options.js.template_ のファイル名を _main-options.js_ に変更して中身を書き換えてください。

EXT
----

### youtube-dl

- _bin/EXT_ に _youtube-dl.exe_ を置くと YouTube の動画をダウンロードできるようになります。
- URL は動画とプレイリストが使用可能です。

Author
----

[indeep-xyz](http://indeep.xyz/)