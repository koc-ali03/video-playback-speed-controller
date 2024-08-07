# Video Playback Speed Controller

A browser extension to control the playback speed of videos, either through the popup or keyboard shortcuts

![Dark mode screenshot of the extension in Firefox](screenshots/dark%20mode%20screenshot%20(firefox).png)

## Installation for Firefox

### Manual installation
1. Download the latest version in the src folder (`manifest-v2` for Firefox)
2. Go to the `about:debugging` page, "This Firefox" tab
3. Click "Load Temporary Add-on"
4. Pick the manifest.json file from the folder you just downloaded

### Installing it from addons.mozilla.org
1. Click [here](addons.mozilla.org/firefox/addon/video-playback-speed-controlle) to visit the official Firefox extensions page
2. Click "Add to Firefox"

## Installation for Chrome/Chromium

### Manual installation
1. Download the latest version in the src folder (`manifest-v3` for Chrome)
2. Go to the `chrome://extensions` page
3. Enable Developer Mode from the top right corner
4. Click "Load unpacked"
5. Select the folder you just downloaded

### Installing it from Chrome Web Store
1. Click [here](chromewebstore.google.com/detail/jcdpmjpdnamijajkfkijombgkbchmdof) to visit the official Chrome extensions page
2. Click "Add to Chrome"

## Usage

- Click the extension icon in the toolbar
- Use the popup to adjust the playback speed (and the step) of the current video (or all videos on the page)
- You can also use the + and - keys on your keyboard to change the speed without bothering with the popup
- The step is 0.25 by default, but you can change that through the popup

## Changelog

For details on updates and changes, see [CHANGELOG.md](CHANGELOG.md).
