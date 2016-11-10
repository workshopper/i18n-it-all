To pass this exercise you need to write a module that exports two methods:
`formatWeight` and `formatDistance` where `formatWeight` formats a value for
a weight depending on a locale and `formatDistance` formats a distances
depending on a locale.

この課題では、以下のような2つの関数を持つモジュールを作成します。
`formatWeight`: 「重量」を地域に対応した単位で出力します。
`formatDistance`: 「距離」を地域に対応した単位で出力します。

```javascript
exports.formatWeight = function (amountInKg) {
  var formattedForCountry
  // ... figure out how to properly address
  return formattedForCountry
}
exports.formatDistance = function (amountInMeter) {
  var formattedForCountry
  // ... figure out how to properly address
  return formattedForCountry
}
```

To determine the locale, the `process.env.LANG` environment variable will
be set to one of the following codes: `en-us`, `en-uk`, `ja-jp` or `de-de`.
言語指定子は、環境変数 `process.env.LANG` に定義されるものを利用します。
次のいずれかの値に設定してください: `en-us`, `en-uk`, `ja-jp`, `de-de`.

In the US (`en-us`) pounds are used for weights and abbreviated with `lb`.
`1lb` is equal to `0.45359237kg`. Distances are measured in feet, abbreviated with `ft` and `1ft` is equal to `0.3048m`.

米国(`en-us`)では、重量の単位としてポンドを使用します。これは `lb` と略されます。`1lb` は `0.45359237kg` です。
距離の単位はフィートです。これは `ft` と略されます。`1ft` は `0.3048m` です。

In the UK (`en-uk`) kilograms are used for weights but usually noted with the
weight in pounds as well. For example: `3lb (1.36kg)`. Distances are measured
in imperial `ft`.
英国(`en-uk`)では、重量の単位としてキログラムが使われますが、ポンドも併用される事に留意しなければなりません。例えば `3lb (1.36kg)` というように表記します。
距離の単位はフィートです。`ft`と略されます。

In Japan (`ja-jp`) kilograms are used for weights and abbreviated with `kg`.
`m` are used for meters, the distance unit.
日本(`ja-jp`)では、重量の単位としてキログラムのみが使用されます。`kg`と略されます。
距離の単位はメートルが使用されます。`m`と略されます。

In Germany (`de-de`) kilograms are used for weights and abbreviated with `kg`.
`m` are used for meters, the distance unit. In Germany they display numbers
with following formatting `4 294 967.295,000` while the UK, US and Japan use
`4,294,967,295.00`.
ドイツ(`de-de`)では、重量の単位としてキログラムが使用されます。`kg`と略されます。
距離の単位はメートルが使用されます。`m`と略されます。ただし、ドイツでは数字の区切り文字が他の国と異なります。
例えば `4,294,967,295.00` は `4 294 967.295,000` と表記します。

When displaying numbers make sure that they are rounded to the next
percentile. `12.4567` → `12.46`.
数字を表示する際には、小数点2桁目までとし、以降を四捨五入してください。例えば `12.4567` → `12.46` というように。

---

## Background
## 課題の背景

The majority of the world officially uses the "Metric System" _(meter, liter,
...)_ , aka. SI-units. A few countries use the "Imperial System" _(feet,
pound,...)_. There are other systems, which makes our work not easier.
For good localization it is important to think about what the differences in
usage are:

世界的には多くの国々がメートル法(メートル、リットル、グラムなど)を公式の単位として採用しています。
また、一部の国々では帝国単位(フィート、ポンド、ヤードなど)が採用されています。
そして、そのどちらにも属さない単位もあり、我々の仕事を困難にしています。
より良い国際対応の為には、言語以外においても国や地域ごとの違いに気を配る事が重要です。
例えば：

- The name might be different for a unit: i.e english: `meter`,
    french: `mètre`, german: `Meter`.
- 単位の名前の表記が異なるかもしれない：
    例えばメートルは英語では `meter` と表記されますが、フランス語では `mètre`、ドイツ語では `Meter` といった具合です。

- Some countries have exceptions in usage: i.e. in Japan they measure
    room-size in `Tatami`; New Zealand uses the metric system for almost
    everything except for altiude and feet in aviation. [1]
- 一部の国々では特定の用途にのみ使用される単位もあります：
    例えば日本では部屋の広さを畳の枚数に換算して表現したりしますし、
    メートル法を採用しているはずのニュージーランドでは航空機の高度と足のサイズだけはメートル法で表記しません。 [1]

- Some countries have double notations for some units: i.e. In great britain
    it is common practice to label food weight in kg **and** lbs:
    "£2.18/kg 99p/Lb"
- 一部の国々では二重表記も見られます：
    英国では、食品の重量をキログラムとポンドの両方で表記しています。
    例えば "£2.18/kg 99p/Lb" といった具合です。


[1]: https://en.wikipedia.org/wiki/Metrication_in_New_Zealand

## Hints
## ヒント

Because of the immense complexity this subject, the Node.js community has not
come up with a reliable library that takes all countries and units into
account. However there are libraries for unit conversion that work for limited
sets.

この問題が非常に大きく複雑である為、Node.jsコミュニティではすべての国と地域を考慮した信頼性の高いライブラリは用意されていません。
しかしながら、ある程度限定された単位変換をサポートするライブラリは存在します。

One such library is `js-quantities` and version `1.6.3` is bundled with this
workshopper:

そのようなライブラリの一つが、 `js-quantities` です。
本ワークショップにはバージョン `1.6.3` が同梱されています：

```javascript
require('{rootdir}/node_modules/js-quantities')
```

The readme is available here:
当該ライブラリの説明書は以下のファイルです：

    {rootdir}/node_modules/js-quantities/README.md

Formatting numbers _can_ be done using the `Intl.NumberFormat` support that
has been added in Node.js `0.12`.
(区切り位置や区切り文字などの)数字表記に関する整形は、Node.js `0.12` にて追加された `Intl.NumberFormat` を利用する事が出来ます。

https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/NumberFormat

**However** note this will not work _out-of-the-box_. For `NumberFormat` to
work with this workshopper to work you need to specify the `NODE_ICU_DATA`
environment variable to point to `ICU_DATA` before you run/verify this
exercise. You can get the lastest ICU data here:

**しかし** 、これは一筋縄ではいきません。
`NumberFormat` をワークショッパー内で稼働させる為には、 `NODE_ICU_DATA` を設定する必要があります。
`NODE_ICU_DATA` は環境変数 `ICU_DATA` を指すので、この課題に着手・解決する前に、環境変数 `ICU_DATA` を設定してください。
最新のICUデータは下記にて取得可能です：

https://ssl.icu-project.org/datacustom/

If you don't have an internet connection you can also use:
もしインターネットへの接続環境がない場合は、下記のデータを利用することもできます：

    {rootdir}/data/icudt57l.dat
