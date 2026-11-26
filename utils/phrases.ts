/** Phrases the bot reacts to, in the order their replies are sent. `label` is what the reply names. */
export const COUNTED_PHRASES = [
    { label: 'kys', pattern: 'kys' },
    { label: 'drz hubu', pattern: 'drz\\s+hubu' },
] as const;

/** Lowercases and strips diacritics, so "Drž hubu" and "DRZ HUBU" both read as "drz hubu". */
function normalize(text: string): string {
    return text.normalize('NFD').replace(/\p{M}/gu, '').toLowerCase();
}

/** Whole-word matchers: "kys" must not fire inside "kyslík" or "kysela". */
const MATCHERS = COUNTED_PHRASES.map(({ label, pattern }) => ({
    label,
    regex: new RegExp(`(?<![\\p{L}\\p{N}])${pattern}(?![\\p{L}\\p{N}])`, 'u'),
}));

/**
 * Labels of the counted phrases found in `content`, each at most once, in `COUNTED_PHRASES` order.
 */
export function findCountedPhrases(content: string): string[] {
    const text = normalize(content);
    return MATCHERS.filter(({ regex }) => regex.test(text)).map(({ label }) => label);
}
