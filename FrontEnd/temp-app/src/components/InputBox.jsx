import { useState } from 'react';
import { SendHorizontal } from 'lucide-react';

/**
 * InputBox — Neobrutalism text input + send button.
 * Enter (no Shift) → sends. Disabled while loading.
 */
export default function InputBox({ onSend, disabled }) {
  const [text, setText] = useState('');

  const submit = () => {
    if (!text.trim() || disabled) return;
    onSend(text.trim());
    setText('');
  };

  const onKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      submit();
    }
  };

  return (
    <div className="flex items-end gap-3">
      <textarea
        value={text}
        onChange={e => setText(e.target.value)}
        onKeyDown={onKeyDown}
        disabled={disabled}
        rows={2}
        placeholder="Ask a question about your document…"
        className="nb-focus flex-1 resize-none bg-white text-ink font-medium text-[15px]
                   px-4 py-3 placeholder:text-ink/40 disabled:opacity-50
                   focus:outline-none"
        style={{ border: '2.5px solid #1C293C', boxShadow: '3px 3px 0 #1C293C' }}
      />

      <button
        onClick={submit}
        disabled={disabled || !text.trim()}
        className="nb-hover nb-focus flex items-center justify-center
                   bg-secondary text-surface p-3 shrink-0
                   disabled:opacity-40 disabled:pointer-events-none"
        style={{ border: '2.5px solid #1C293C', boxShadow: '3px 3px 0 #1C293C' }}
        aria-label="Send message"
      >
        <SendHorizontal size={20} strokeWidth={2.5} />
      </button>
    </div>
  );
}
