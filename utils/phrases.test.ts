import { describe, expect, test } from 'bun:test';
import { findCountedPhrases } from './phrases.ts';

describe('findCountedPhrases', () => {
    test('finds kys as a whole word, any case', () => {
        expect(findCountedPhrases('kys')).toEqual(['kys']);
        expect(findCountedPhrases('KYS!!')).toEqual(['kys']);
        expect(findCountedPhrases('no tak kys, fakt')).toEqual(['kys']);
    });

    test('finds drž hubu with or without diacritics and extra spaces', () => {
        expect(findCountedPhrases('drž hubu')).toEqual(['drz hubu']);
        expect(findCountedPhrases('Drz  Hubu')).toEqual(['drz hubu']);
        expect(findCountedPhrases('už drž\nhubu.')).toEqual(['drz hubu']);
    });

    test('ignores the phrases inside other words', () => {
        expect(findCountedPhrases('kyslík')).toEqual([]);
        expect(findCountedPhrases('kysela okurka')).toEqual([]);
        expect(findCountedPhrases('drzhubu')).toEqual([]);
        expect(findCountedPhrases('drž hubulka')).toEqual([]);
    });

    test('reports each phrase once, both when both appear', () => {
        expect(findCountedPhrases('kys kys kys')).toEqual(['kys']);
        expect(findCountedPhrases('drž hubu a kys')).toEqual(['kys', 'drz hubu']);
    });

    test('returns nothing for unrelated messages', () => {
        expect(findCountedPhrases('ahoj')).toEqual([]);
        expect(findCountedPhrases('')).toEqual([]);
    });
});
