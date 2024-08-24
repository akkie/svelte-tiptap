<script lang="ts">
  import { onMount } from 'svelte';
  import { get, type Readable } from 'svelte/store';
  import StarterKit from '@tiptap/starter-kit';
  import cx from 'clsx';
  import { Editor, EditorContent, createEditor } from '$lib';
  import Placeholder from '@tiptap/extension-placeholder';

  import { SvelteCounterExtension, SvelteEditableExtension } from './_components/SvelteExtension';

  let editor: Readable<Editor>;

  onMount(() => {
    editor = createEditor({
      extensions: [
        StarterKit,
        SvelteCounterExtension,
        SvelteEditableExtension,
        Placeholder.configure({
          placeholder: '',
        }),
      ],
      editorProps: {
        attributes: {
          class: 'border-2 border-black rounded-b-md p-3 outline-none',
        },
      },
    });
  });

  $: menuItems = [
    {
      name: 'node',
      command: () => get(editor).chain().addNode().run(),
      content: 'N',
      active: () => true,
    },
  ];
</script>

<svelte:head>
  <title>Tiptap Svelte</title>
</svelte:head>

<h1 class="mb-2 font-bold">Editor with Nodeview Renderer</h1>

{#if editor}
  <div class="border-black border-2 border-b-0 rounded-t-md p-2 flex gap-1">
    {#each menuItems as item (item.name)}
      <button
        type="button"
        class={cx('hover:bg-black hover:text-white w-7 h-7 rounded', {
          'bg-black text-white': item.active(),
        })}
        on:click={item.command}
      >
        {item.content}
      </button>
    {/each}
  </div>
{/if}

<EditorContent editor={$editor} />
