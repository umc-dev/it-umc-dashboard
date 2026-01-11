"use client";

import { useEffect } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Image from "@tiptap/extension-image";
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  List,
  ListOrdered,
  Undo2,
  Redo2,
  Heading1,
  Heading2,
  Heading3,
  Quote,
  Code,
  ImageIcon,
} from "lucide-react";

interface TiptapEditorProps {
  value: string;
  onValueChange: (value: string) => void;
}

export function TiptapEditor({ value, onValueChange }: TiptapEditorProps) {
  const editor = useEditor({
    extensions: [StarterKit, Underline, Image],
    content: value,
    immediatelyRender: false,
    onUpdate({ editor }) {
      onValueChange(editor.getHTML());
    },
  });

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value);
    }
  }, [value, editor]);

  if (!editor) return null;

  // Handler insert image via prompt
  const handleInsertImage = () => {
    const url = prompt("Masukkan URL gambar:");
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  return (
    <div className="space-y-2 text-foreground">
      {/* Toolbar */}
      <div className="flex flex-wrap gap-2 border rounded-lg p-2 bg-input">
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          active={editor.isActive("bold")}
          icon={<Bold size={18} />}
        />

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          active={editor.isActive("italic")}
          icon={<Italic size={18} />}
        />

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          active={editor.isActive("underline")}
          icon={<UnderlineIcon size={18} />}
        />

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleStrike().run()}
          active={editor.isActive("strike")}
          icon={<Strikethrough size={18} />}
        />

        <Divider />

        <ToolbarButton
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          active={editor.isActive("heading", { level: 1 })}
          icon={<Heading1 size={18} />}
        />

        <ToolbarButton
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          active={editor.isActive("heading", { level: 2 })}
          icon={<Heading2 size={18} />}
        />

        <ToolbarButton
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          active={editor.isActive("heading", { level: 3 })}
          icon={<Heading3 size={18} />}
        />

        <Divider />

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          active={editor.isActive("bulletList")}
          icon={<List size={18} />}
        />

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          active={editor.isActive("orderedList")}
          icon={<ListOrdered size={18} />}
        />

        <Divider />

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          active={editor.isActive("codeBlock")}
          icon={<Code size={18} />}
        />

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          active={editor.isActive("blockquote")}
          icon={<Quote size={18} />}
        />

        <Divider />

        {/* Tambahkan tombol insert image */}
        <ToolbarButton
          onClick={handleInsertImage}
          icon={<ImageIcon size={18} />}
        />

        <Divider />

        <ToolbarButton
          onClick={() => editor.chain().focus().undo().run()}
          icon={<Undo2 size={18} />}
        />

        <ToolbarButton
          onClick={() => editor.chain().focus().redo().run()}
          icon={<Redo2 size={18} />}
        />
      </div>

      {/* Editor */}
      <div className="border rounded-lg p-3 min-h-[200px] bg-input">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}

function ToolbarButton({
  onClick,
  icon,
  active,
}: {
  onClick: () => void;
  icon: React.ReactNode;
  active?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`p-2 rounded hover:bg-accent transition ${
        active ? "bg-accent text-accent-foreground" : "text-muted-foreground"
      }`}
    >
      {icon}
    </button>
  );
}

function Divider() {
  return <div className="w-px h-6 bg-border mx-1" />;
}
