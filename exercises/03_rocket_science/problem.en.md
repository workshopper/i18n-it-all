To pass this exercise you need to write a module that exports two methods:
`formatWeight` and `formatDistance` where `formatWeight` formats a value for 
a weight depending on a locale and `formatDistance` formats a distances
depending on a locale.

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

In the US (`en-us`) pounds are used for weights and abbreviated with `lb`.
`1lb` is equal to `0.45359237kg`. Distances are measured in feet, abbreviated with `ft` and `1ft` is equal to `0.3048m`.

In the UK (`en-uk`) kilograms are used for weights but usually noted with the 
weight in pounds as well. For example: `3lb (1.36kg)`. Distances are measured 
in imperial `ft`.

In Japan (`ja-jp`) kilograms are used for weights and abbreviated with `kg`.
`m` are used for meters, the distance unit.

In Germany (`de-de`) kilograms are used for weights and abbreviated with `kg`. 
`m` are used for meters, the distance unit. In Germany they display numbers
with following formatting `4 294 967.295,000` while the UK, US and Japan use
`4,294,967,295.00`.

When displaying numbers makes round the numbers to the next
percentile. `12.4567` → `12.46`.

---

## Background

The majority of the world officially uses the "Metric System" _(meter, liter, 
...)_ , aka. SI-units. A few countries use the "Imperial System" _(feet, 
pound,...)_. There are other systems, which makes our work not easier.
For good localization it is important to think about what the differences in
usage are:

- The name might be different for a unit: i.e english: `meter`,
    french: `mètre`, german: `Meter`.
- Some countries have exceptions in usage: i.e. in Japan they measure 
    room-size in `Tatami`; New Zealand uses the metric system for almost 
    everything except for altiude and feet in aviation. [1]
- Some countries have double notations for some units: i.e. In great britain
    it is common practice to label food weight in kg **and** lbs:
    "£2.18/kg 99p/Lb"

[1] https://en.wikipedia.org/wiki/Metrication_in_New_Zealand

## Hints

Because of the immense complexity this subject, the Node.js community has not 
come up with a reliable library that takes all countries and units into 
account. However there are libraries for unit conversion that work for limited
sets.

One such library is `js-quantities` and it is packed with this workshopper:

    {rootdir}/node_modules/js-quantities

The readme is available here:

    {rootdir}/node_modules/js-quantities/README.md

Formatting numbers _can_ be done using the `Intl.NumberFormat` support that
has been added in Node.js `0.12`.

https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/NumberFormat

**However** note this will not work _out-of-the-box_. For `NumberFormat` to 
work with this workshopper to work you need to specify the `NODE_ICU_DATA` 
environment variable to point to `ICU_DATA` before you run/verify this 
exercise. You can get the lastest ICU data here:

https://ssl.icu-project.org/datacustom/

If you don't have an internet connection you can also use:

    {rootdir}/data/icudt57l.dat
