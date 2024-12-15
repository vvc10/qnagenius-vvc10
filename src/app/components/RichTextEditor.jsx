import React, { useRef } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TextStyle from '@tiptap/extension-text-style';
import Underline from '@tiptap/extension-underline';
import Image from '@tiptap/extension-image';
import TextAlign from '@tiptap/extension-text-align';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import { common, createLowlight } from 'lowlight';
import { Button } from "@/app/components/ui/button";
import { Bold, Italic, UnderlineIcon, Code2, Strikethrough, Heading1, Heading2, Heading3, List, ListOrdered, AlignLeft, AlignCenter, AlignRight, ImageIcon } from 'lucide-react';

const lowlight = createLowlight(common);

function RichTextEditor({ content, onChange }) {
  const fileInputRef = useRef(null);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        codeBlock: false,
      }),
      TextStyle,
      Underline,
      Image,
      TextAlign.configure({
        types: ['paragraph', 'heading'],
      }),
      CodeBlockLowlight.configure({
        lowlight,
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  if (!editor) {
    return null;
  }

  const handleFileUpload = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result;
        if (typeof content === 'string') {
          editor.chain().focus().setImage({ src: content }).run();
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const addImage = () => {
    const choice = window.prompt('Choose image source: (1) URL or (2) File Upload');
    if (choice === '1') {
      const url = window.prompt('Enter the URL of the image:');
      if (url) {
        editor.chain().focus().setImage({ src: url }).run();
      }
    } else if (choice === '2') {
      fileInputRef.current?.click();
    }
  };

  const editorStyles = `
    .ProseMirror {
      min-height: 300px;
      padding: 1rem;
    }
    .ProseMirror p {
      margin-bottom: 1em;
    }
    .ProseMirror li {
      margin-bottom: 0.5em;
      font-size: 1em;
      line-height: 1.5;
      padding-left: 0.5em;
    }
    .ProseMirror ul, .ProseMirror ol {
      margin-bottom: 1em;
      padding-left: 1.5em;
    }
    .ProseMirror ul {
      list-style-type: disc;
    }
    .ProseMirror ol {
      list-style-type: decimal;
    }
    .ProseMirror h1 {
      font-size: 2em;
      font-weight: bold;
      margin: 1em 0 0.5em;
    }
    .ProseMirror h2 {
      font-size: 1.5em;
      font-weight: bold;
      margin: 1em 0 0.5em;
    }
    .ProseMirror h3 {
      font-size: 1.17em;
      font-weight: bold;
      margin: 1em 0 0.5em;
    }
    .ProseMirror img {
      max-width: 100%;
      height: auto;
      margin: 1em 0;
    }
    .ProseMirror pre {
      background-color: rgb(30, 30, 30);
      border-radius: 0.5em;
      color: #fff;
      font-family: 'JetBrainsMono', monospace;
      padding: 0.75em 1em;
      margin: 1em 0;
    }
    .ProseMirror pre code {
      color: inherit;
      padding: 0;
      background: none;
      font-size: 0.9em;
    }
    .ProseMirror code {
      background-color: rgba(97, 97, 97, 0.1);
      color: #616161;
      padding: 0.25em 0.5em;
      border-radius: 0.25em;
      font-size: 0.9em;
      font-family: 'JetBrainsMono', monospace;
    }
  `;

  return (
    <div className="border rounded-md p-2">
      <style>{editorStyles}</style>
      <div className="flex flex-wrap gap-2 mb-2 border-b pb-2">
        <Button
          size="icon"
          variant="ghost"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive('bold') ? 'bg-muted' : ''}>
          <Bold className="h-4 w-4" />
        </Button>

        <Button
          size="icon"
          variant="ghost"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={editor.isActive('italic') ? 'bg-muted' : ''}>
          <Italic className="h-4 w-4" />
        </Button>

        <Button
          size="icon"
          variant="ghost"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={editor.isActive('underline') ? 'bg-muted' : ''}>
          <UnderlineIcon className="h-4 w-4" />
        </Button>

        <Button
          size="icon"
          variant="ghost"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={editor.isActive('strike') ? 'bg-muted' : ''}>
          <Strikethrough className="h-4 w-4" />
        </Button>

        <Button
          size="icon"
          variant="ghost"
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={editor.isActive('heading', { level: 1 }) ? 'bg-muted' : ''}>
          <Heading1 className="h-4 w-4" />
        </Button>

        <Button
          size="icon"
          variant="ghost"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={editor.isActive('heading', { level: 2 }) ? 'bg-muted' : ''}>
          <Heading2 className="h-4 w-4" />
        </Button>

        <Button
          size="icon"
          variant="ghost"
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={editor.isActive('heading', { level: 3 }) ? 'bg-muted' : ''}>
          <Heading3 className="h-4 w-4" />
        </Button>

        <Button
          size="icon"
          variant="ghost"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive('bulletList') ? 'bg-muted' : ''}>
          <List className="h-4 w-4" />
        </Button>

        <Button
          size="icon"
          variant="ghost"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive('orderedList') ? 'bg-muted' : ''}>
          <ListOrdered className="h-4 w-4" />
        </Button>

        <Button
          size="icon"
          variant="ghost"
          onClick={() => editor.chain().focus().setTextAlign('left').run()}
          className={editor.isActive({ textAlign: 'left' }) ? 'bg-muted' : ''}>
          <AlignLeft className="h-4 w-4" />
        </Button>

        <Button
          size="icon"
          variant="ghost"
          onClick={() => editor.chain().focus().setTextAlign('center').run()}
          className={editor.isActive({ textAlign: 'center' }) ? 'bg-muted' : ''}>
          <AlignCenter className="h-4 w-4" />
        </Button>

        <Button
          size="icon"
          variant="ghost"
          onClick={() => editor.chain().focus().setTextAlign('right').run()}
          className={editor.isActive({ textAlign: 'right' }) ? 'bg-muted' : ''}>
          <AlignRight className="h-4 w-4" />
        </Button>

        <Button
          size="icon"
          variant="ghost"
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={editor.isActive('codeBlock') ? 'bg-muted' : ''}>
          <Code2 className="h-4 w-4" />
        </Button>

        <Button
          size="icon"
          variant="ghost"
          onClick={addImage}>
          <ImageIcon className="h-4 w-4" />
        </Button>
      </div>

      <EditorContent editor={editor} className="min-h-[300px] prose max-w-none border p-4 rounded-md" />

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        accept="image/*"
        style={{ display: 'none' }}
      />
    </div>
  );
}

export default RichTextEditor;