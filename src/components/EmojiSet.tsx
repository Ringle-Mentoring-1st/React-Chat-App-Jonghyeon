interface EmojiSetProps {
  emojis: { [key: string]: any };
  onClickEmoji: (keyEmoji: string) => {} | void;
}

function EmojiSet({ emojis, onClickEmoji }: EmojiSetProps) {
  return (
    <div>
      {Object.keys(emojis)
        .sort()
        .map(key => (
          <span
            key={key}
            onClick={() => onClickEmoji(key)}
            style={{
              background: 'rgba(255,255,255, 0.1)',
              padding: '6px 12px',
              marginRight: 6,
              borderRadius: 12,
            }}
          >
            {key} {'  '}{' '}
            {Object.keys(emojis[key]).length
              ? Object.keys(emojis[key]).length
              : ''}
          </span>
        ))}
    </div>
  );
}

export default EmojiSet;
