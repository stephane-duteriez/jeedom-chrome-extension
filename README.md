# React Jeedom Extension

## Getting Started

1. `npm i` to install dependancies
2. `npm start` to start running the fast development mode Webpack build process that bundle files into the `dist` folder
3. `npm i --save-dev <package_name>` to install new packages

## Loading The Chrome Extension

1. Open Chrome and navigate to `chrome://extensions/`
2. Toggle on `Developer mode` in the top right corner
3. Click `Load unpacked`
4. Select the entire `dist` folder

# Important Initial Steps

1. `git init` to start a new git repo for tracking your changes, do an initial base commit with all the default files
2. Update `package.json`, important fields include `author`, `version`, `name` and `description`
3. Update `manifest.json`, important fields include `version`, `name` and `description`
4. Update `webpack.commmon.js`, the title in the `getHtmlPlugins` function should be your extension name

# Production Build

1. `npm run build` to generate a minimized production build in the `dist` folder
2. ZIP the entire `dist` folder (e.g. `dist.zip`)
3. Publish the ZIP file on the Chrome Web Store Developer Dashboard!

## Important Default Boilerplate Notes

- Folders get flattened, static references to images from HTML do not need to be relative (i.e. `icon.png` instead of `../static/icon.png`)
- Importing local ts/tsx/css files should be relative, since Webpack will build a dependancy graph using these paths
- Update the manifest file as per usual for chrome related permissions, references to files in here should also be flattened and not be relative

# Jeedom Chrome extension

## Description

- Show data from your jeedom instance as a badge, or in a popup.

## Technical background

- Chrome forbid the use of the note secure http request, so there need to be a https link to your jeedom server. (Jeedom market place offer the service for a fee)
- You will need the url to access the server, and the api-key of the jeedom instance
- the popup refresh when you open it, the badge refresh every minutes

## ToDo

- use \* for to hide the api-key?
- setting for refresh rate
- jeedom action in the popup
- button to test api-key
- show error message if network connection doesn’t work
- improve design
