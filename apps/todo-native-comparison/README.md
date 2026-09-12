# Todo Native Comparison

A deliberately small React Native implementation of the same Todo domain as `apps/todo-app`, intended to make Angular ↔ React Native concepts easy to compare.

## Why Expo?

React Native recommends using a framework such as Expo for new applications. This app pins its mobile runtime independently from the older root workspace dependencies so the comparison can use a current Expo/React Native stack without forcing a broad upgrade of the existing Angular monorepo.

## Run it

Requires Node 22.13+ for Expo SDK 57.

From the workspace root:

```bash
npx nx run todo-native-comparison:install
npx nx run todo-native-comparison:start
```

Then open it in an iOS simulator, Android emulator, or Expo Go when compatible with the SDK.

You can also use:

```bash
npx nx run todo-native-comparison:ios
npx nx run todo-native-comparison:android
npx nx run todo-native-comparison:typecheck
```

## What this demonstrates

- `useState` for local state
- render-derived values for simple UI state
- `useEffect` only for synchronization with an external system (`AsyncStorage`)
- `FlatList` for native list virtualization
- accessibility roles/state on custom interactions
- `SafeAreaView` and keyboard-aware mobile layout
- immutable state updates
- a pure shared TypeScript domain helper under `libs/shared/todo-comparison`

See `docs/angular-react-native-todo-comparison.md` for the direct Angular comparison.
