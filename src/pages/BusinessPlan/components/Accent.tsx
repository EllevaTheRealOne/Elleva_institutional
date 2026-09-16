import React from "react";

interface AccentProps {
  /** The full text. */
  text: string;
  /** The fragment of `text` to colour. Drawn plain when it is not found. */
  accent?: string;
}

/**
 * Colours one fragment of a headline, the way the deck lights up the words
 * that carry the claim. Both strings come from the locale file, so the accent
 * is only applied when it genuinely occurs in this language's text.
 */
export const Accent: React.FC<AccentProps> = ({ text, accent }) => {
  if (!accent) return <>{text}</>;
  const at = text.indexOf(accent);
  if (at < 0) return <>{text}</>;

  return (
    <>
      {text.slice(0, at)}
      <span className="bp-accent">{accent}</span>
      {text.slice(at + accent.length)}
    </>
  );
};
