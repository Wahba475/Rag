/**
 * MessageBubble — Neobrutalism styled chat bubble.
 *
 * User  → right-aligned, primary yellow (#FDC800), hard shadow
 * Bot   → left-aligned,  white surface, hard shadow
 *
 * Design rules from SKILL.md:
 *  - 3px solid #1C293C border
 *  - 4px hard offset shadow
 *  - Inter font, font-semibold, text-[15px]
 */
export default function MessageBubble({ role, content }) {
  const isUser = role === 'user';

  return (
    <div className={`flex w-full ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        style={{
          border: '2.5px solid #1C293C',
          boxShadow: isUser
            ? '-4px 4px 0px 0px #1C293C'  // flipped for right-side
            : '4px 4px 0px 0px #1C293C',
          backgroundColor: isUser ? '#FDC800' : '#FFFFFF',
          color: '#1C293C',
        }}
        className="max-w-[72%] px-4 py-3 text-[15px] font-semibold leading-relaxed"
      >
        {content}
      </div>
    </div>
  );
}
