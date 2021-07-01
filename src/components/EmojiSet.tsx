import { memo, useEffect } from 'react';
import { useAppSelector } from '../store/hooks';

interface EmojiSetProps {
  emojis: { [key: string]: any };
  onClickEmoji: (keyEmoji: string) => {} | void;
}

function EmojiSet({ emojis, onClickEmoji }: EmojiSetProps) {
  const userProfile = useAppSelector(state => state.user.userProfile);
  useEffect(() => {
    console.log('use Memo render');
  }, []);

  return (
    <div>
      {Object.keys(emojis)
        .sort()
        .map(key => (
          <span
            key={key}
            onClick={() => onClickEmoji(key)}
            style={{
              background: emojis[key][userProfile.uid]
                ? 'rgba(255,255,255, 0.4)'
                : 'rgba(255,255,255, 0.1)',
              padding: '6px 12px',
              marginRight: 6,
              borderRadius: 12,
            }}
          >
            {key}
            {'  '}
            {Object.keys(emojis[key]).length
              ? Object.keys(emojis[key]).length
              : ''}
          </span>
        ))}
    </div>
  );
}

export default memo(EmojiSet);
