# Storybook

Storybook is a utility to test components in isolation. This not only makes it very useful for creating new components, but also let's you automate tests very easily (e2e, snapshot, a11y, etc.). Furthermore it can be used to create a styleguide.

## Sample Story

A very simple story of `<app-button [text]="'Hello Button'"></app-button>` of `Button` from `@todo-app/shared/ui` would look like this:

```typescript
// button.story.ts
import { storiesOf } from '@storybook/angular';
import { Button } from './button.component.ts';

storiesOf('UI/My Button', module).add('with text', () => ({
	component: Button,
	props: {
		text: 'Hello Button',
	},
}));
```

The `UI` prefix in the story name makes it being added under the UI header in Storybook 5+. This allows us to arrange them properly to the package they belong.
