// Paste your Firebase web app config here (see SETUP.md).
// Leave the FIREBASE_* placeholders to run in guest/local-only mode.
window.FIREBASE_CONFIG = {
  apiKey: "AIzaSyDfW4gvUR7EPJur4pMJ7Szgbncn7K3IrbU",
  authDomain: "tradelog-f0402.firebaseapp.com",
  projectId: "tradelog-f0402",
  storageBucket: "tradelog-f0402.firebasestorage.app",
  messagingSenderId: "980313307385",
  appId: "1:980313307385:web:4373576f0ce00e3fa70a28"
};
window.firebaseConfigured = function () {
  const c = window.FIREBASE_CONFIG;
  return !!(c && c.apiKey && !String(c.apiKey).startsWith("FIREBASE_"));
};
