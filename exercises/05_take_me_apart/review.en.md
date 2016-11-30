## Review

You can use the code you wrote already in the production pipeline. You might
want to improve the performance by writing the code in an async fashion.

### Frontend & Backend

This technique is very important _(and standard)_ if your repository contains both
Frontend and Backend code. As developer, you usually want to be able to maintain
the same translations for both sides.

For performance reasons you might not want to send all the translations to the
Frontend.

Also, for security reasons you might want to separate security sensitive
translations (welcome mails for private guests, pricing documents, etc.) to
be only loaded to the Frontend once the permission for this data is given.

### Dynamic Keys

Using scripts to look for the usage of translation is usually a good idea.
However, if you have dynamic use of translation like the following can undercut
your efforts:

```javascript
__('exercise.' + exercise.name)
```

In this case your parser has one of two options:

1. **Ignore this statement** (or give a warning). This is problematic because it would be really good to know which keys are needed.
2. **Treat this use as an error.** This is problematic because you might actually need to use translations like this sometimes.

With a bit of work at the parser it would be possible to create patterns like:

```
exercise.*
*.exercise
*.exercise.*.error
```

... and check extract the available translation fields for all possible exercise
combinations.

### XGetText

`gettext` is the is the standard tool for translation in C. The original
`xgettext` is a tool that extracts the `gettext` usage in C and C++ files.
In NPM there is a list of other `xgettext` variants for other file formats:

    https://www.npmjs.com/search?q=xgettext
