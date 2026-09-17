"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Underline } from "@tiptap/extension-underline";
import { Table, TableRow, TableCell, TableHeader } from "@tiptap/extension-table";
import { TextAlign } from "@tiptap/extension-text-align";
import ImageExtension from "@tiptap/extension-image";
import LinkExtension from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import { normalizeToHtml, getWordAndCharStats } from "@/lib/content";
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  Code,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Pilcrow,
  List,
  ListOrdered,
  Quote,
  Minus,
  Undo,
  Redo,
  Link as LinkIcon,
  Unlink,
  Image as ImageIcon,
  Loader2,
  FileCode,
  Table as TableIcon,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Plus,
  Trash2,
} from "lucide-react";

interface RichTextEditorProps {
  content: string;
  onChange: (html: string) => void;
  placeholder?: string;
  minHeight?: string;
}

export function RichTextEditor({
  content,
  onChange,
  placeholder = "Write your high-impact story or technical breakdown here...",
  minHeight = "360px",
}: RichTextEditorProps) {
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Normalize initial content to semantic HTML (handles both legacy markdown and existing HTML)
  const initialHtml = React.useMemo(() => normalizeToHtml(content || ""), []);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3, 4, 5, 6],
        },
      }),
      Underline,
      Table.configure({
        resizable: true,
        HTMLAttributes: {
          class: "Matii-table",
        },
      }),
      TableRow,
      TableHeader,
      TableCell,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      ImageExtension.configure({
        inline: false,
        HTMLAttributes: {
          class: "rounded-[4px] border border-zinc-200/80 my-4 max-w-full h-auto shadow-xs",
        },
      }),
      LinkExtension.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-[#292c2e] underline font-medium hover:text-[#98ff03] transition-colors",
        },
      }),
      Placeholder.configure({
        placeholder,
      }),
    ],
    content: initialHtml,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: `tiptap Matii-editor focus:outline-none p-5 font-inter text-zinc-800 leading-relaxed min-h-[${minHeight}]`,
      },
    },
  });

  // Synchronize when `content` changes from parent (e.g. switching articles in admin modal)
  useEffect(() => {
    if (!editor) return;
    const normalized = normalizeToHtml(content || "");
    const current = editor.getHTML();

    // Prevent cursor jumping if HTML is effectively the same
    if (normalized !== current) {
      // If both are empty representations, don't reset
      const isNormalizedEmpty = !normalized || normalized === "<p></p>";
      const isCurrentEmpty = !current || current === "<p></p>";
      if (isNormalizedEmpty && isCurrentEmpty) return;

      editor.commands.setContent(normalized, { emitUpdate: false });
    }
  }, [content, editor]);

  const setLink = useCallback(() => {
    if (!editor) return;
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("Enter destination URL:", previousUrl);

    if (url === null) return;
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }

    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  }, [editor]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editor) return;

    setIsUploadingImage(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", "Matii_articles");

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (res.ok && data.url) {
        editor.chain().focus().setImage({ src: data.url, alt: file.name }).run();
      } else {
        alert(data.error || "Failed to upload image to Cloudinary");
      }
    } catch (err) {
      console.error("Editor image upload error:", err);
      alert("Error uploading image");
    } finally {
      setIsUploadingImage(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleInsertImageUrl = () => {
    if (!editor) return;
    const url = window.prompt("Enter Cloudinary or web image URL:");
    if (url && url.trim()) {
      editor.chain().focus().setImage({ src: url.trim() }).run();
    }
  };

  const insertTable = () => {
    if (!editor) return;
    editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run();
  };

  if (!editor) {
    return (
      <div className="h-64 border border-zinc-200 rounded-[4px] bg-zinc-50 flex items-center justify-center text-zinc-400 text-xs font-mono">
        Initializing Rich Text Editor...
      </div>
    );
  }

  const isTableActive = editor.isActive("table");
  const stats = getWordAndCharStats(editor.getHTML());

  return (
    <div className="border border-zinc-300 rounded-[4px] overflow-hidden bg-white focus-within:border-[#292c2e] focus-within:ring-1 focus-within:ring-[#292c2e]/20 transition-all shadow-xs">
      {/* Hidden file input for Cloudinary image upload */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="hidden"
      />

      {/* Primary Toolbar */}
      <div className="bg-[#292c2e] px-3 py-2 border-b border-zinc-800 flex flex-wrap items-center justify-between gap-1 select-none text-white">
        <div className="flex flex-wrap items-center gap-1">
          {/* Paragraph */}
          <button
            type="button"
            title="Regular Paragraph"
            onClick={() => editor.chain().focus().setParagraph().run()}
            className={`p-1.5 rounded-[3px] transition-all active:scale-[0.96] ${editor.isActive("paragraph") && !editor.isActive("heading")
              ? "bg-[#98ff03] text-black"
              : "text-zinc-300 hover:bg-zinc-700 hover:text-white"
              }`}
          >
            <Pilcrow className="size-4" />
          </button>

          {/* Headings */}
          <button
            type="button"
            title="Heading 1"
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            className={`p-1.5 rounded-[3px] font-space text-xs font-bold transition-all active:scale-[0.96] ${editor.isActive("heading", { level: 1 })
              ? "bg-[#98ff03] text-black"
              : "text-zinc-300 hover:bg-zinc-700 hover:text-white"
              }`}
          >
            <Heading1 className="size-4" />
          </button>

          <button
            type="button"
            title="Heading 2"
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            className={`p-1.5 rounded-[3px] font-space text-xs font-bold transition-all active:scale-[0.96] ${editor.isActive("heading", { level: 2 })
              ? "bg-[#98ff03] text-black"
              : "text-zinc-300 hover:bg-zinc-700 hover:text-white"
              }`}
          >
            <Heading2 className="size-4" />
          </button>

          <button
            type="button"
            title="Heading 3"
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            className={`p-1.5 rounded-[3px] font-space text-xs font-bold transition-all active:scale-[0.96] ${editor.isActive("heading", { level: 3 })
              ? "bg-[#98ff03] text-black"
              : "text-zinc-300 hover:bg-zinc-700 hover:text-white"
              }`}
          >
            <Heading3 className="size-4" />
          </button>

          <button
            type="button"
            title="Heading 4"
            onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
            className={`p-1.5 rounded-[3px] font-space text-xs font-bold transition-all active:scale-[0.96] ${editor.isActive("heading", { level: 4 })
              ? "bg-[#98ff03] text-black"
              : "text-zinc-300 hover:bg-zinc-700 hover:text-white"
              }`}
          >
            <Heading4 className="size-4" />
          </button>

          <div className="w-[1px] h-4 bg-zinc-700 mx-1" />

          {/* Inline Marks */}
          <button
            type="button"
            title="Bold (Ctrl+B)"
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={`p-1.5 rounded-[3px] transition-all active:scale-[0.96] ${editor.isActive("bold")
              ? "bg-[#98ff03] text-black"
              : "text-zinc-300 hover:bg-zinc-700 hover:text-white"
              }`}
          >
            <Bold className="size-4" />
          </button>

          <button
            type="button"
            title="Italic (Ctrl+I)"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={`p-1.5 rounded-[3px] transition-all active:scale-[0.96] ${editor.isActive("italic")
              ? "bg-[#98ff03] text-black"
              : "text-zinc-300 hover:bg-zinc-700 hover:text-white"
              }`}
          >
            <Italic className="size-4" />
          </button>

          <button
            type="button"
            title="Underline (Ctrl+U)"
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className={`p-1.5 rounded-[3px] transition-all active:scale-[0.96] ${editor.isActive("underline")
              ? "bg-[#98ff03] text-black"
              : "text-zinc-300 hover:bg-zinc-700 hover:text-white"
              }`}
          >
            <UnderlineIcon className="size-4" />
          </button>

          <button
            type="button"
            title="Strikethrough"
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className={`p-1.5 rounded-[3px] transition-all active:scale-[0.96] ${editor.isActive("strike")
              ? "bg-[#98ff03] text-black"
              : "text-zinc-300 hover:bg-zinc-700 hover:text-white"
              }`}
          >
            <Strikethrough className="size-4" />
          </button>

          <button
            type="button"
            title="Inline Code"
            onClick={() => editor.chain().focus().toggleCode().run()}
            className={`p-1.5 rounded-[3px] transition-all active:scale-[0.96] ${editor.isActive("code")
              ? "bg-[#98ff03] text-black"
              : "text-zinc-300 hover:bg-zinc-700 hover:text-white"
              }`}
          >
            <Code className="size-4" />
          </button>

          <div className="w-[1px] h-4 bg-zinc-700 mx-1" />

          {/* Alignment */}
          <button
            type="button"
            title="Align Left"
            onClick={() => editor.chain().focus().setTextAlign("left").run()}
            className={`p-1.5 rounded-[3px] transition-all active:scale-[0.96] ${editor.isActive({ textAlign: "left" })
              ? "bg-[#98ff03] text-black"
              : "text-zinc-300 hover:bg-zinc-700 hover:text-white"
              }`}
          >
            <AlignLeft className="size-4" />
          </button>

          <button
            type="button"
            title="Align Center"
            onClick={() => editor.chain().focus().setTextAlign("center").run()}
            className={`p-1.5 rounded-[3px] transition-all active:scale-[0.96] ${editor.isActive({ textAlign: "center" })
              ? "bg-[#98ff03] text-black"
              : "text-zinc-300 hover:bg-zinc-700 hover:text-white"
              }`}
          >
            <AlignCenter className="size-4" />
          </button>

          <button
            type="button"
            title="Align Right"
            onClick={() => editor.chain().focus().setTextAlign("right").run()}
            className={`p-1.5 rounded-[3px] transition-all active:scale-[0.96] ${editor.isActive({ textAlign: "right" })
              ? "bg-[#98ff03] text-black"
              : "text-zinc-300 hover:bg-zinc-700 hover:text-white"
              }`}
          >
            <AlignRight className="size-4" />
          </button>

          <div className="w-[1px] h-4 bg-zinc-700 mx-1" />

          {/* Lists & Blocks */}
          <button
            type="button"
            title="Bullet List"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={`p-1.5 rounded-[3px] transition-all active:scale-[0.96] ${editor.isActive("bulletList")
              ? "bg-[#98ff03] text-black"
              : "text-zinc-300 hover:bg-zinc-700 hover:text-white"
              }`}
          >
            <List className="size-4" />
          </button>

          <button
            type="button"
            title="Numbered List"
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={`p-1.5 rounded-[3px] transition-all active:scale-[0.96] ${editor.isActive("orderedList")
              ? "bg-[#98ff03] text-black"
              : "text-zinc-300 hover:bg-zinc-700 hover:text-white"
              }`}
          >
            <ListOrdered className="size-4" />
          </button>

          <button
            type="button"
            title="Blockquote"
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className={`p-1.5 rounded-[3px] transition-all active:scale-[0.96] ${editor.isActive("blockquote")
              ? "bg-[#98ff03] text-black"
              : "text-zinc-300 hover:bg-zinc-700 hover:text-white"
              }`}
          >
            <Quote className="size-4" />
          </button>

          <button
            type="button"
            title="Code Block"
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            className={`p-1.5 rounded-[3px] transition-all active:scale-[0.96] ${editor.isActive("codeBlock")
              ? "bg-[#98ff03] text-black"
              : "text-zinc-300 hover:bg-zinc-700 hover:text-white"
              }`}
          >
            <FileCode className="size-4" />
          </button>

          <button
            type="button"
            title="Horizontal Divider"
            onClick={() => editor.chain().focus().setHorizontalRule().run()}
            className="p-1.5 rounded-[3px] text-zinc-300 hover:bg-zinc-700 hover:text-white transition-all active:scale-[0.96]"
          >
            <Minus className="size-4" />
          </button>

          {/* Tables */}
          <button
            type="button"
            title="Insert 3x3 Table"
            onClick={insertTable}
            className={`p-1.5 rounded-[3px] transition-all active:scale-[0.96] ${isTableActive
              ? "bg-[#98ff03] text-black"
              : "text-zinc-300 hover:bg-zinc-700 hover:text-white"
              }`}
          >
            <TableIcon className="size-4" />
          </button>

          <div className="w-[1px] h-4 bg-zinc-700 mx-1" />

          {/* Links & Media */}
          <button
            type="button"
            title="Insert/Edit Link"
            onClick={setLink}
            className={`p-1.5 rounded-[3px] transition-all active:scale-[0.96] ${editor.isActive("link")
              ? "bg-[#98ff03] text-black"
              : "text-zinc-300 hover:bg-zinc-700 hover:text-white"
              }`}
          >
            <LinkIcon className="size-4" />
          </button>

          {editor.isActive("link") && (
            <button
              type="button"
              title="Remove Link"
              onClick={() => editor.chain().focus().unsetLink().run()}
              className="p-1.5 rounded-[3px] text-red-400 hover:bg-zinc-700 transition-all active:scale-[0.96]"
            >
              <Unlink className="size-4" />
            </button>
          )}

          {/* Direct Cloudinary Image Upload Button */}
          <button
            type="button"
            disabled={isUploadingImage}
            title="Upload Image via Cloudinary"
            onClick={() => fileInputRef.current?.click()}
            className="p-1.5 px-2 bg-zinc-800 hover:bg-zinc-700 text-[#98ff03] rounded-[3px] inline-flex items-center gap-1 font-space text-[11px] font-bold uppercase transition-all active:scale-[0.96] disabled:opacity-50 cursor-pointer"
          >
            {isUploadingImage ? (
              <Loader2 className="size-3.5 animate-spin" />
            ) : (
              <ImageIcon className="size-3.5" />
            )}
            <span>{isUploadingImage ? "Uploading..." : "Add Image"}</span>
          </button>

          <button
            type="button"
            title="Insert Image by URL"
            onClick={handleInsertImageUrl}
            className="p-1.5 text-zinc-400 hover:text-white text-[10px] font-space uppercase transition-colors"
          >
            By URL
          </button>
        </div>

        {/* History Undo / Redo */}
        <div className="flex items-center gap-1">
          <button
            type="button"
            title="Undo (Ctrl+Z)"
            disabled={!editor.can().undo()}
            onClick={() => editor.chain().focus().undo().run()}
            className="p-1.5 rounded-[3px] text-zinc-300 hover:bg-zinc-700 hover:text-white disabled:opacity-30 transition-all active:scale-[0.96]"
          >
            <Undo className="size-3.5" />
          </button>

          <button
            type="button"
            title="Redo (Ctrl+Y)"
            disabled={!editor.can().redo()}
            onClick={() => editor.chain().focus().redo().run()}
            className="p-1.5 rounded-[3px] text-zinc-300 hover:bg-zinc-700 hover:text-white disabled:opacity-30 transition-all active:scale-[0.96]"
          >
            <Redo className="size-3.5" />
          </button>
        </div>
      </div>

      {/* Secondary Context Toolbar for Table Operations (when cursor is inside a table) */}
      {isTableActive && (
        <div className="bg-zinc-800 px-3 py-1.5 border-b border-zinc-700 flex flex-wrap items-center gap-2 text-xs font-space text-zinc-300 animate-in fade-in duration-150">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#98ff03] flex items-center gap-1">
            <TableIcon className="size-3" />
            <span>Table Tools:</span>
          </span>

          <button
            type="button"
            onClick={() => editor.chain().focus().addRowAfter().run()}
            className="px-2 py-0.5 bg-zinc-700 hover:bg-zinc-600 rounded text-white text-[11px] flex items-center gap-1 transition-colors"
          >
            <Plus className="size-3 text-[#98ff03]" />
            <span>Add Row</span>
          </button>

          <button
            type="button"
            onClick={() => editor.chain().focus().deleteRow().run()}
            className="px-2 py-0.5 bg-zinc-700 hover:bg-zinc-600 rounded text-zinc-200 text-[11px] transition-colors"
          >
            Delete Row
          </button>

          <div className="w-[1px] h-3 bg-zinc-600 mx-0.5" />

          <button
            type="button"
            onClick={() => editor.chain().focus().addColumnAfter().run()}
            className="px-2 py-0.5 bg-zinc-700 hover:bg-zinc-600 rounded text-white text-[11px] flex items-center gap-1 transition-colors"
          >
            <Plus className="size-3 text-[#98ff03]" />
            <span>Add Col</span>
          </button>

          <button
            type="button"
            onClick={() => editor.chain().focus().deleteColumn().run()}
            className="px-2 py-0.5 bg-zinc-700 hover:bg-zinc-600 rounded text-zinc-200 text-[11px] transition-colors"
          >
            Delete Col
          </button>

          <div className="w-[1px] h-3 bg-zinc-600 mx-0.5" />

          <button
            type="button"
            onClick={() => editor.chain().focus().deleteTable().run()}
            className="px-2 py-0.5 bg-red-950/60 hover:bg-red-900 border border-red-800/60 text-red-300 rounded text-[11px] flex items-center gap-1 transition-colors ml-auto"
          >
            <Trash2 className="size-3" />
            <span>Remove Table</span>
          </button>
        </div>
      )}

      {/* Editor Content Area */}
      <div className="min-h-[320px] bg-white cursor-text" onClick={() => editor.commands.focus()}>
        <EditorContent editor={editor} />
      </div>

      {/* Stats Bar */}
      <div className="px-4 py-2 bg-zinc-50 border-t border-zinc-200 flex items-center justify-between text-[11px] font-space text-zinc-400">
        <span className="flex items-center gap-1.5 text-[#292c2e]/70 font-medium">
          <span className="size-2 rounded-full bg-[#98ff03] inline-block shadow-xs" />
          Semantic HTML Engine active
        </span>
        <div className="flex items-center gap-3 tabular-nums font-mono">
          <span>{stats.wordCount} words</span>
          <span>•</span>
          <span>{stats.charCount} characters</span>
          <span>•</span>
          <span className="text-zinc-600">{stats.readTime}</span>
        </div>
      </div>
    </div>
  );
}

export default RichTextEditor;
