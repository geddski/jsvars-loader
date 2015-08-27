# jsvars-loader
[webpack](http://webpack.github.io/) loader for [postcss](https://github.com/postcss/postcss) for sharing style variables in both JS and CSS. Depends on [postcss-simple-vars](https://github.com/postcss/postcss-simple-vars).

This loader allows you to define CSS styles in a common place, and then use those styles in both your JavaScript and your CSS. 

## Setup

Install this webpack loader:
```shell
npm install jsvars-loader --save
```

Configure webpack to use this loader first thing (before postcss) when loading CSS files:

```js
module: {
    loaders: [
      { test: /\.css$/, loader: "postcss-loader!jsvars-loader" }
    ]
  }
```

Make sure you've got the [postcss-simple-vars](https://github.com/postcss/postcss-simple-vars) plugin enabled in your webpack config:

```js
postcss: [
    require('postcss-simple-vars')
  ]
```

Create a JS file with some styles you'd like to reuse:

```js
module.exports = {
  layout: {
    list: {
      width: '330',
      spacing: '10'
    }
  },
  color: {
    list: {
      background: 'rgba(255,255,255,1)'
    }
  }
};
```

From the JS side of things you can simply `require` this file and use it.

From your CSS you "import" these variables by calling `jsvars(<path to your vars file>)`. You can then use these variables in your CSS with the `$(<variable name>)` syntax:

```css
jsvars(common/styles.js)

.list{
  width: $(layout-list-width)px;
  background: $(color-list-background);
}
```

Deeply nested style properties are accessed by using dashes e.g. `layout-list-width`.

License: MIT