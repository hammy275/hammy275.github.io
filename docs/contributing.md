---
nav_order: 5
---

# Contributing

Want to help with ImmersiveMC? There are plenty of ways to help!

## Bug Reports and Suggestions

If you find a bug, you can tell me about it on the ImmersiveMC Discord server! Create a new thread in either `#support` or `#suggestions` detailing the bug you found and a way to reproduce the bug.

If you have an idea or suggestion for ImmersiveMC, you can tell me about it on the ImmersiveMC Discord server in the `#suggestions` channel!

## Localization

Do you speak a language that ImmersiveMC doesn't support, and want to see it supported? If so, this is the guide for you! Simply follow [the steps below](#steps-to-help-with-localization)!

### Some Notes Before Helping With Localization

Please do keep in mind that I make money through ads run on mod distribution platforms (such as CurseForge or Modrinth) from distributing ImmersiveMC. If you do not feel comfortable contributing due to that, that is absolutely okay! 

As for licensing, ImmersiveMC is, as of writing, released under the LGPL-3.0 license. This means that if anyone makes changes to ImmersiveMC and wants to release those changes, they must make those changes available under the same LGPL-3.0 license. However, ImmersiveMC has changed licenses before and may change it again (though I plan to always keep it under an OSI-approved license, keeping ImmersiveMC forever open-source). When contributing, you may:

- Give me permission to change the license in the future to an OSI-approved license without your permission at the time of change. You are free to retract this at any time.
- Require me to ask your permission before making license changes. Note however, that if I do change the license, and I am unable to secure your permission, I will remove your contributions until such permission is given (if ever).
- Something else. Please mention what this something else is before I accept your contribution.

If you don't pick an option, I will assume that you would like me to ask of your permission before switching licenses; it's your work after all!

### Steps to Help With Localization

1. On the Minecraft Wiki, on the [list of languages Minecraft supports](https://minecraft.fandom.com/wiki/Language), find your language. Note down its "In-game" locale code.
2. On ImmersiveMC's GitHub page, browse to `common/src/main/resources/assets/immersivemc/lang`. [Click here](https://github.com/hammy275/immersive-mc/tree/HEAD/common/src/main/resources/assets/immersivemc/lang) if you want to be taken directly to that page.
3. Download the `en_us.json` file. This can be done most easily by clicking the file, then clicking the button with a down arrow in it. You can additionally simply copy-paste all the text shown into a text file in your text editor of choice.
4. Back on the page you visited in step 2, see if there is a file named `YOUR_LOCALE_CODE.json`, where `YOUR_LOCALE_CODE` is the "in-game" locale code you found in step 1. If it exists, then someone has already translated ImmersiveMC to that language, though it may be missing some strings found in ImmersiveMC, follow the [continuing a translation](#continuing-a-translation) guide below. Otherwise, someone has not translated anything in ImmersiveMC to that language; follow the [creating a translation](#creating-a-translation) guide below.

### Creating a Translation

1. Continuing from step 4 above, copy-paste the downloaded `en_us.json` file from step 3 above, and rename it to `YOUR_LOCALE_CODE.json`, where `YOUR_LOCALE_CODE` is the "in-game" locale code you found in step 1 above.
2. Open the `YOUR_LOCALE_CODE.json` file you just renamed. You can open it in a text editor of your choice. You should see a file starting with a `{`, followed by a large amount of key-value pairs. These key-value pairs look something like `"key.categories.immersivemc.vr": "ImmersiveMC VR Bindings"`. In this example, the key is `"key.categories.immersivemc.vr"`, which is what is typed in the code to reference the translation. The value in this example is `"ImmersiveMC VR Bindings"`, which is what is shown to the user where that key would be used. In the case of this example, the key is shown in Minecraft's "Controls" menu, to reference the list of all controls ImmersiveMC adds to the game.
3. Change all the values to the translation for your language! Be sure to _NOT_ remove any quotation marks or other punctuation.
4. Contribute your changes by opening a PR for them on GitHub, or sending them to the ImmersiveMC Discord server. If you send them on the Discord server, be sure to ping me (@hammy275)!

### Continuing a Translation

1. Download the file for your locale code in the same way you downloaded in the `en_us.json` file in step 3.
2. Open the file you just downloaded, and open it in a text editor of your choice. You should see a file starting with a `{`, followed by a large amount of key-value pairs. These key-value pairs look something like `"key.categories.immersivemc.vr": "ImmersiveMC VR Bindings"`. In this example, the key is `"key.categories.immersivemc.vr"`, which is what is typed in the code to reference the translation. The value in this example is `"ImmersiveMC VR Bindings"`, which is what is shown to the user where that key would be used. In the case of this example, the key is shown in Minecraft's "Controls" menu, to reference the list of all controls ImmersiveMC adds to the game.
3. Open the `en_us.json` file you downloaded above in step 3.
4. Between the `en_us.json` file and the file for your locale, look for any keys that are in the `en_us.json` file that are NOT in your locale's file.
5. For any keys you find in step 4 that cannot be found in your locale's file but can be found in `en_us.json`, copy-past the entire line from `en_us.json` into your locale's file. From there, change the value to the translation for your language. Be sure to _NOT_ remove any quotation marks or other punctuation.
6. Contribute your changes by opening a PR for them on GitHub, or sending them to the ImmersiveMC Discord server. If you send them on the Discord server, be sure to ping me (@hammy275)!