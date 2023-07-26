# Swup Base Theme

Base class for creating [swup](https://swup.js.org) themes.

## Creating a Theme

To create a new theme, use the official [swup theme template](https://github.com/swup/theme-template). It comes with detailed instructions and the required tooling.

## Usage

```js
import Theme from '@swup/theme';

export default class ThemeName extends Theme {
  name = 'ThemeName';
  mount() {}
  unmount() {}
}
```

## Commands

The base theme provides a few simple command line tools to help with bundling and linting.

### Bundling

Bundle the theme for production using [microbundle](https://github.com/developit/microbundle), creating ESM and UMD builds.

```bash
# Bundle and transpile theme code
swup-plugin bundle

# Bundle theme code in watch mode
swup-plugin dev
```

### Linting & formatting

Lint the theme code using [prettier](https://prettier.io/) and swup's recommended rules.

```bash
# Lint theme code
swup-plugin lint

# Fix and format any lint errors
swup-plugin format
```

### Package info

Check that the theme's package.json file contains the required information for microbundle: input, output, export map, amd name, etc.

```bash
# Check theme package info
swup-plugin check
```
