const wordEndingWithSymbolPattern = /[A-Za-z0-9-_]+([.,])$/;

const partitionText = (text, maxWords) => {

    if (!text) {
        return '';
    }

    const results = [];
    const words = text.split(' ');

    for (let i = 0; i < words.length; i = i + maxWords) {
        results.push(words.slice(i, i + maxWords))
    }

    return results;
};

export const processText = (config) => {
    const {
        text,
        alternator,
        maxWords = 5,
        normalTextPrefix,
        alternatedTextPrefix,
    } = config;
    const results = [];
    const partitionedText = partitionText(text, maxWords);

    for (let i = 0; i < partitionedText.length; i++) {
        results.push('\n')

        if (alternator(i, partitionedText)) {
            if (normalTextPrefix) {
                results.push(normalTextPrefix);
            }

            results.push(partitionedText[i])
        } else {
            const reversedSentence = partitionedText[i].reverse();

            for (let i = 0; i < reversedSentence.length; i++) {
                const wordEndingWithSymbolIdx = reversedSentence.findIndex((v) => wordEndingWithSymbolPattern.test(v));
                if (wordEndingWithSymbolIdx !== -1) {
                    const word = reversedSentence[wordEndingWithSymbolIdx];
                    let symbol = word.match(wordEndingWithSymbolPattern)[1];
                    reversedSentence[wordEndingWithSymbolIdx] = `${symbol}${word.slice(0, word.length - 1)}`;
                }
            }

            results.push(reversedSentence);

            if (alternatedTextPrefix) {
                results.push(alternatedTextPrefix);
            }
        }
    }

    return results.flat().join(' ');
}

export const processLtr = (text, direction = true) => processText({
    text,
    alternator: (i) => !(i % 2),
    ...(direction ? {
        alternatedTextPrefix: '⏪',
        normalTextPrefix: '⏩',
    } : {})
});

export const processRtl = (text, direction = true) => processText({
    text,
    alternator: (i) => i % 2,
    ...(direction ? {
        alternatedTextPrefix: '⏩',
        normalTextPrefix: '⏪'
    } : {}),
});