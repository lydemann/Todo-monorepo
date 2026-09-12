# Angular vs React Native: Todo comparison

This repository already contains a production-style Angular Todo application in `apps/todo-app`. The `apps/todo-native-comparison` project adds a deliberately focused React Native implementation so the same concepts can be compared side by side.

## Run both

### Angular

```bash
pnpm install
npm run start:mock
```

The Angular app already includes routing, mocks, Playwright/Cypress testing, a domain layer and NgRx SignalStore.

### React Native

The native comparison app uses Expo SDK 57 / React Native 0.86 and therefore requires Node 22.13+.

```bash
npx nx run todo-native-comparison:install
npx nx run todo-native-comparison:start
```

## Concept mapping

| Angular implementation | React Native implementation | What to notice |
| --- | --- | --- |
| `TodoListFacadeService` + NgRx SignalStore | `useTodos()` custom hook | Both expose state and domain actions behind a small API. |
| `signal()` / SignalStore state | `useState()` | Local React state causes the component using it to re-render. |
| `computed()` | derive during render; memoize only when useful | Angular tracks dependencies; React re-runs the component. |
| `rxMethod()` / resource service | async calls from hooks/data layer | Keep external I/O outside presentational components. |
| Angular template | TSX | React uses JavaScript expressions directly in the render function. |
| `@for` / template loops | `FlatList` | Native lists need virtualization for scale. |
| `(click)` | `onPress` | Native interaction uses press semantics rather than DOM click events. |
| HTML semantics/ARIA | accessibility roles and state | Native accessibility maps to VoiceOver/TalkBack instead of the DOM accessibility tree. |
| browser storage/service worker | `AsyncStorage` + native lifecycle/offline layer | Mobile persistence and connectivity are first-class concerns. |

## Angular state: SignalStore

The existing Angular implementation is a useful modern baseline. `libs/todo-app/domain/src/lib/todo-list/todo-list-facade.service.ts` uses an NgRx SignalStore with state, computed selectors and methods. The facade then exposes only the state and actions that the UI needs.

That is a good pattern because the component does not need to know how data loading or optimistic deletion is implemented.

## React Native state: custom hook

The native implementation keeps the demo intentionally smaller. `useTodos()` owns local state and exposes actions:

```tsx
const {
  todos,
  remainingCount,
  addTodo,
  toggleTodo,
  deleteTodo,
} = useTodos();
```

For a larger application I would split server state from client/UI state and use the project's chosen server-state library rather than growing one giant hook.

## `computed()` versus render-derived values

Angular:

```ts
completedTodos: computed(() => todoList().filter(todo => todo.completed))
```

React:

```tsx
const remainingCount = todos.filter(todo => !todo.completed).length;
```

For a cheap calculation, React normally does not need an equivalent piece of state. The component runs again when `todos` changes, so the derived value is recalculated. `useMemo` is an optimization tool, not a requirement for correctness.

## `useEffect` is not `ngOnInit`

The React Native demo uses Effects only at an external-system boundary: loading and saving persistent data with `AsyncStorage`.

It does **not** use an Effect to keep derived values in sync with other state. That avoids the common React anti-pattern of creating duplicated state.

## UI: DOM versus native primitives

Angular renders browser elements. React Native renders native platform UI through primitives such as `View`, `Text`, `TextInput` and `Pressable`.

For the list, the native app uses `FlatList` rather than mapping all items into a `ScrollView`, because `FlatList` virtualizes the rendered window.

## What should be shared in a monorepo?

Share pure TypeScript where the domain is truly platform-independent: contracts, validation, domain transformations, API clients that do not depend on browser/native globals, and test fixtures.

Do not force UI sharing between Angular and React Native. The rendering systems are different and platform-native interaction is a feature, not a problem to abstract away.

The small `libs/shared/todo-comparison` library demonstrates this boundary with a pure `Todo` type and immutable domain functions.

## Architecture takeaway

The framework syntax differs, but the architecture principles transfer directly:

- keep state ownership explicit;
- derive state instead of duplicating it;
- isolate I/O;
- use immutable updates;
- keep UI components focused;
- make accessibility part of the component contract;
- share pure domain code, not platform UI;
- add a state library only when the complexity requires it.
