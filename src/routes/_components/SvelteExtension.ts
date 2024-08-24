import { Node, mergeAttributes } from '@tiptap/core';
import { SvelteNodeViewRenderer } from '$lib';

import CounterComponent from './Counter.svelte';
import EditableComponent from './Editable.svelte';
import { TextSelection } from '@tiptap/pm/state';

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    media: {
      addNode: () => ReturnType;
    };
  }
}

export const SvelteCounterExtension = Node.create({
  name: 'SvelteCounterComponent',
  group: 'block',
  atom: true,
  selectable: true,
  draggable: true,
  allowGapCursor: true,
  inline: false,

  addAttributes() {
    return {
      count: {
        default: 0,
      },
    };
  },

  parseHTML() {
    return [{ tag: 'svelte-counter-component' }];
  },

  renderHTML({ HTMLAttributes }) {
    return ['svelte-counter-component', mergeAttributes(HTMLAttributes)];
  },

  addNodeView() {
    return SvelteNodeViewRenderer(CounterComponent);
  },

  addCommands() {
    return {
      addNode:
        () =>
          ({ editor, tr }) => {
            const { to } = editor.state.selection;

            const node = editor.schema.nodes['SvelteCounterComponent'].create();

            tr.insert(to, node);

            tr.setSelection(TextSelection.create(tr.doc, to + node.nodeSize + 1));

            return true;
          }
    };
  },
});

export const SvelteEditableExtension = Node.create({
  name: 'SvelteEditableComponent',
  group: 'block',
  content: 'inline*',
  draggable: true,

  parseHTML() {
    return [{ tag: 'svelte-editable-component' }];
  },

  renderHTML({ HTMLAttributes }) {
    return ['svelte-editable-component', mergeAttributes(HTMLAttributes), 0];
  },

  addNodeView() {
    return SvelteNodeViewRenderer(EditableComponent);
  },
});
