# SonicVault - Custom Sound Library

## 1. How to Add Your Own Sounds

To replace the demo sounds with your own custom audio files, follow these steps:

### A. Add the Files
1.  Create a folder named `sounds` inside the `public` folder in your project root.
    *   Structure: `public/sounds/`
2.  Paste your audio files (`.mp3`, `.wav`, etc.) into this folder.
    *   Example: `public/sounds/my-custom-bell.mp3`

### B. Update the Code
1.  Open the file `constants.ts`.
2.  Find the `SOUND_LIBRARY` array.
3.  Add a new entry for your file:

```typescript
{
  id: 'unique-id-here', // Use a unique string (e.g. '101')
  filename: 'my-custom-bell.mp3', // MUST match the file name in public/sounds/
  title: 'My Custom Bell',
  category: SoundCategory.UI, // Choose a category
  description: 'A description for the UI',
  duration: '0:05'
}
```

### C. Remove Demo Links
In `constants.ts`, look for `DEMO_URL_MAP`. To use your local files instead of the internet demo files, simply delete the entries inside this map or set it to an empty object `{}`.

---

## 2. How to Publish to GitHub

1.  **Initialize Git:**
    Open your terminal in the project folder and run:
    ```bash
    git init
    git add .
    git commit -m "Initial commit"
    ```

2.  **Create Repository:**
    Go to [GitHub.com](https://github.com), sign in, and create a new empty repository.

3.  **Push Code:**
    Follow the instructions shown by GitHub to push your existing code:
    ```bash
    git branch -M main
    git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
    git push -u origin main
    ```

---

## 3. How to Deploy to Vercel

1.  Go to [Vercel.com](https://vercel.com) and sign up/login.
2.  Click **"Add New..."** -> **"Project"**.
3.  Select **"Import"** next to the GitHub repository you just created.
4.  Leave the build settings as default (Framework: Vite/React).
5.  Click **"Deploy"**.

Your website will be live in a few minutes!
