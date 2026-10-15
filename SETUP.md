# Trade Log — Firebase setup (free)

So you and your friends can sign in and see the same trades on any phone.

## 1. Create a Firebase project
1. Open https://console.firebase.google.com and sign in with Google.
2. **Add project** → name it e.g. `tradelog` → disable Google Analytics if you want → Create.
3. On the project overview, click the **Web** icon (`</>`) → register app nickname `Trade Log` → copy the `firebaseConfig` object.

## 2. Enable sign-in
1. Build → **Authentication** → Get started.
2. Sign-in method → enable **Google** → set a support email → Save.
3. (Optional) enable **Email/Password** → Save.

## 3. Create Firestore
1. Build → **Firestore Database** → Create database.
2. Start in **production mode** (or test mode for 30 days while you try it).
3. Pick a region close to you (e.g. `europe-west` or `us-central`).
4. Rules → paste this, then Publish (only the signed-in user can read/write their own data):

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{uid} {
      allow read, write: if request.auth != null && request.auth.uid == uid;
      match /trades/{tradeId} {
        allow read, write: if request.auth != null && request.auth.uid == uid;
      }
    }
  }
}
```

## 4. Allow your hosted domain
1. Authentication → Settings → **Authorized domains**.
2. Add: `bqab23.bot-keep.xyz` (and `localhost` if you test on a computer).

## 5. Paste config into the app
1. Open `firebase-config.js` in this folder.
2. Replace every `FIREBASE_*` value with the matching field from the Firebase console config.
3. Redeploy / re-upload the site (same files as usual: `index.html`, `manifest.json`, `icon.png`, `sw.js`, `firebase-config.js`).

Until you paste real keys, the app still works as **guest** (local-only on that phone).

## Free plan limits (Spark)
Enough for personal use and a few friends. If you ever hit limits, Firebase will show a warning in the console — upgrade only if you need to.

## What gets synced
- Profile doc `users/{yourUid}`: name, local currency, default USD rate, theme, updatedAt
- Trades `users/{yourUid}/trades/{tradeId}`: each buy/sell

Prices stay on the phone (fetched live from CoinGecko). Each Google account has its own private data.

## After pasting keys
1. Hard-refresh the site (or clear site data once) so the new service worker (`tl-v8`) loads.
2. Open the app → **Continue with Google** (or email) → your guest trades upload automatically if the cloud is empty.
3. On another phone, sign in with the same account → trades pull down.
