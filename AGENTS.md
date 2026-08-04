# AI Agent Instructions for expo-minimum-app

This project is a React Native Expo app using Expo Router, React Native Paper, and TypeScript.

## Key project structure

- `src/routes/` — file-based routing with Expo Router.
  - `login.tsx` handles authentication.
  - `(secure)/_layout.tsx` protects authenticated routes and redirects to `/login` when no session exists.
  - `(secure)/(tabs)/_layout.tsx` defines the main bottom tab navigation.
- `src/components/` — reusable UI components and auth providers.
- `src/components/authentication/AuthContext.tsx` — the `SessionProvider` and `useSession()` hook.
- `src/hooks/useLog.ts` — centralized logging utility used throughout the app.
- `src/core/utils.tsx` — validation helpers used by forms.
- `src/constants/Colors.ts` — theme colors for light/dark modes.
- `src/plugins/android-manifest-attributes.js` — custom Expo plugin for Android manifest settings.

## Important conventions

- This repo is an Expo project with TypeScript and `@/*` path aliasing defined in `tsconfig.json`.
- The app theme is configured in `app/src/routes/_layout.tsx` using `react-native-paper` and `SafeAreaProvider`.
- Authentication state is stored via `useStorageState` in `AuthContext.tsx`; `useSession()` must only be used inside `SessionProvider`.
- `expo-router` route groups are used for auth flow separation: `(secure)` for protected screens, `login.tsx` for sign-in.
- Logging should use `useLog.info`, `useLog.warn`, `useLog.error`, etc.

## Useful commands

- `npm install`
- `npm start`
- `npm run android`
- `npm run ios`
- `npm test`
- `npm run lint`
- `npm run reset-project`

## Project-specific behavior

- `app.json` declares Expo plugins and app configuration, including camera and location permissions.
- `eas.json` defines development and production build profiles; the project uses local development clients and internal distribution for development builds.
- Keep route names and folder groupings consistent with Expo Router conventions.
- Prefer `Button`, `Text`, `TextInput`, etc. from `react-native-paper` for native styling consistency.

## References

- `README.md` contains the basic Expo setup and start/build instructions.
- `GEMINI.md` contains the basic IA Gemini instructions.