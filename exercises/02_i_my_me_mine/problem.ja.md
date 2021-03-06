この課題では、与えられた人数に応じた応答を行うモジュールを作成します。
モジュールに対して唯一の引数として渡される配列には人の名前が列挙されています。

```javascript
module.exports = function addressRecepients (persons) {
  var properAddressing
  // ... figure out how to properly address
  return properAddressing
}
```

引数 `persons` に列挙されるのは、0人であったり、1人であったり、複数人であったりします。
いずれの場合にも対応出来るようなモジュールを作成するのが目標となります。

言語判定に用いる `en` 等のアルファベット2文字の言語指定子は、環境変数 `process.env.LANG` に定義されるものを利用します。

以下のファイルには、およそ必要とされる複数の言語での応答文が定義されています:

    {rootdir}/data/addressation.json

`.json` に定義されている言語指定子をキーとするオブジェクトには以下のような構造で応答文が入っています:

```javascript
{
  "0": "Hello unknown!",
  "1": "Hello %s!",
  "2": "Hello %s, Hello %s!",
  "3": "Hello %s, %s and %s!",
  "4": "Hello everyone!"
}
```

もし引数である配列の中身が0人であった場合は、上記オブジェクト内の `"0"` を出力に利用します。
また同じように、1人であれば `"1"` を利用します。
それ以降も同様ですが、配列の長さがオブジェクトに定義されている上限人数(上記例では4まで)を超える場合には、配列の長さを上限人数であるとみなして出力を行ってください。
