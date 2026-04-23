# 🍺 Utepils-meter Widget

A Scriptable iOS home screen widget for [utepils-ten.vercel.app](https://utepils-ten.vercel.app) — instantly tells you whether it's time to grab a cold one and head outside.

<img width="200" height="200" alt="utepils-widget" src="https://github.com/user-attachments/assets/700db563-1628-41a2-8e1f-ff3d92f0783e" />



## Requirements

- iPhone with iOS 14+
- [Scriptable](https://apps.apple.com/app/scriptable/id1405459188) (free on the App Store)


## Installation

1. Install [Scriptable](https://apps.apple.com/app/scriptable/id1405459188) from the App Store
2. Open Scriptable and tap **+** to create a new script
3. Paste the contents of [`utepils_widget.js`](./utepils_widget.js) into the editor
4. Name the script `Utepils` and tap **Done**
5. Tap the script once to run it and verify it works — a widget preview should appear


## Adding to your home screen

1. Long-press your home screen and tap **+**
2. Search for **Scriptable**
3. Select the **Small** widget size and tap **Add Widget**
4. Long-press the widget → **Edit Widget**
5. Set **Script** to `Utepils`
6. Set **When Interacting** to `Open URL`
7. Set **URL** to utepils-ten.vercel.app (this will make so you are redirected to the site when clicking the widget)
8. Tap outside to save
