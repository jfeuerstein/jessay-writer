import React, { useRef, useEffect, useState } from 'react';
import './RichTextEditor.css';

function RichTextEditor({ value, onChange, placeholder, className, autoFocus }) {
  const editorRef = useRef(null);
  const [showToolbar, setShowToolbar] = useState(false);
  const [toolbarPosition, setToolbarPosition] = useState({ top: 0, left: 0 });

  useEffect(() => {
    if (editorRef.current && value !== editorRef.current.innerHTML) {
      editorRef.current.innerHTML = value || '';
    }
  }, [value]);

  useEffect(() => {
    if (autoFocus && editorRef.current) {
      editorRef.current.focus();
    }
  }, [autoFocus]);

  const handleInput = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const handleKeyDown = (e) => {
    // Keyboard shortcuts
    if (e.ctrlKey || e.metaKey) {
      switch (e.key.toLowerCase()) {
        case 'b':
          e.preventDefault();
          formatText('bold');
          break;
        case 'i':
          e.preventDefault();
          formatText('italic');
          break;
        case 'u':
          e.preventDefault();
          formatText('underline');
          break;
        case 'k':
          e.preventDefault();
          insertLink();
          break;
        default:
          break;
      }
    }
  };

  const handleMouseUp = () => {
    const selection = window.getSelection();
    if (selection && selection.toString().length > 0) {
      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      const editorRect = editorRef.current.getBoundingClientRect();

      setToolbarPosition({
        top: rect.top - editorRect.top - 40,
        left: rect.left - editorRect.left + (rect.width / 2) - 100,
      });
      setShowToolbar(true);
    } else {
      setShowToolbar(false);
    }
  };

  const formatText = (command) => {
    document.execCommand(command, false, null);
    editorRef.current.focus();
    handleInput();
  };

  const insertLink = () => {
    const url = prompt('enter url:');
    if (url) {
      document.execCommand('createLink', false, url);
      editorRef.current.focus();
      handleInput();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const text = e.clipboardData.getData('text/plain');
    document.execCommand('insertText', false, text);
  };

  return (
    <div className="rich-text-wrapper">
      {showToolbar && (
        <div
          className="format-toolbar"
          style={{
            top: `${toolbarPosition.top}px`,
            left: `${toolbarPosition.left}px`
          }}
        >
          <button
            type="button"
            onMouseDown={(e) => { e.preventDefault(); formatText('bold'); }}
            title="bold (ctrl+b)"
          >
            b
          </button>
          <button
            type="button"
            onMouseDown={(e) => { e.preventDefault(); formatText('italic'); }}
            title="italic (ctrl+i)"
          >
            i
          </button>
          <button
            type="button"
            onMouseDown={(e) => { e.preventDefault(); formatText('underline'); }}
            title="underline (ctrl+u)"
          >
            u
          </button>
          <button
            type="button"
            onMouseDown={(e) => { e.preventDefault(); formatText('strikeThrough'); }}
            title="strikethrough"
          >
            s
          </button>
          <button
            type="button"
            onMouseDown={(e) => { e.preventDefault(); insertLink(); }}
            title="link (ctrl+k)"
          >
            link
          </button>
        </div>
      )}
      <div
        ref={editorRef}
        className={className}
        contentEditable
        onInput={handleInput}
        onKeyDown={handleKeyDown}
        onMouseUp={handleMouseUp}
        onPaste={handlePaste}
        data-placeholder={placeholder}
        suppressContentEditableWarning
      />
    </div>
  );
}

export default RichTextEditor;
