const { contaLetraMaisFrequenteRaul, contaLetraMaisFrequenteKelvin3, contaLetraMaisFrequenteKelvin4, contaLetraMaisFrequenteKelvin2, contaLetraMaisFrequenteLari3, contaLetraMaisFrequenteClayton, contaLetraMaisFrequentePedro, contaLetraMaisFrequenteLari, contaLetraMaisFrequenteLari2, contaLetraMaisFrequenteKelvin } = require('./exe.js');

function shuffleWord(word) {
    return [...word].sort(() => Math.random() - 0.5).join('')
}

function generateWord(map) {
    let word = '';
    for (const { char, count } of map) {
        if (count > 1) {
            word += char.repeat(count);
            continue;
        }
        word += char;
    }
    return shuffleWord(word);
}

function matchOutputFor(input, expectedOutput, callback) {
    const output = callback(input);
    return {
        match: output === expectedOutput,
        output
    };
}

function pickRandomCharFromAlphabet() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUWXYZ';
    return chars[Math.floor(Math.random() * chars.length)];
}

function pickRandomCharExcept(char) {
    let random = pickRandomCharFromAlphabet();
    while (random === char) {
        random = pickRandomCharFromAlphabet();
    }
    return random;
}

function generateWordMapWithMostFrequentChar(mostFrequentChar) {
    const mostFrequentCount = 10;
    const map = [{
        char: mostFrequentChar,
        count: mostFrequentCount
    }];
    const distinctCharCount = 5;
    let currentCharCount = mostFrequentCount - 2;
    const alreadyPickedChars = new Set();
    for (let i = 0; i < distinctCharCount; i++) {
        let char = pickRandomCharExcept(mostFrequentChar);
        while (alreadyPickedChars.has(char)) {
            char = pickRandomCharExcept(mostFrequentChar);
        }
        if (char === mostFrequentChar) {
            continue;
        }
        map.push({ char, count: currentCharCount });
        currentCharCount -= 1;
        alreadyPickedChars.add(char);
    }
    return map;
}

function getDurationInMilliseconds(start) {
    const NS_PER_SEC = 1e9;
    const NS_TO_MS = 1e6;
    const diff = process.hrtime(start);

    return (diff[0] * NS_PER_SEC + diff[1]) / NS_TO_MS;
}

let cachedCases = null;

function getCases(cache, count) {
    if (cache && cachedCases !== null) {
        return cachedCases;
    }
    const cases = [];
    for (let i = 0; i < count; i++) {
        const char = pickRandomCharFromAlphabet();
        const map = generateWordMapWithMostFrequentChar(char);
        const word = generateWord(map);
        cases.push({ input: word, expectedOutput: char });
    }
    if (cache) {
        cachedCases = cases;
        return cachedCases;
    }
    return cases;
}

function checkExe(callback, useSameCases = true, casesCount = 100, showFailsCount = 3) {
    const cases = getCases(useSameCases, casesCount);
    // console.log(`${casesCount} cases generated...`);
    // console.log('matching cases...');
    let matches = 0;
    const startTime = process.hrtime();
    let failsDisplayed = 0;
    for (const { input, expectedOutput } of cases) {
        const { match, output } = matchOutputFor(input, expectedOutput, callback);
        if (match) {
            matches += 1;
            continue;
        }
        if (failsDisplayed < showFailsCount) {
            console.log(`failed on case: "${input}" expected: "${expectedOutput}" but received "${output}"`);
            failsDisplayed += 1;
        }
    }
    const executionTime = getDurationInMilliseconds(startTime);
    // console.table({
    //     matches,
    //     fails: casesCount - matches,
    //     casesCount,
    //     executionTime: executionTime.toFixed(2) + 'ms',
    //     callbackName: callback.name,
    // })

    return executionTime
}

function getAvgExecutionTime(executionTimes, callback, casesCount) {
    const times = [];

    for (let i = 0; i < executionTimes; i++) {
        times.push(checkExe(callback, false, casesCount, 2));
    }

    return (times.reduce((acc, time) => acc + time, 0) / times.length);
}

console.log('avg kelvin v1: ' + getAvgExecutionTime(6, contaLetraMaisFrequenteKelvin, 100000).toFixed(4) + 'ms');
console.log('avg kelvin v2: ' + getAvgExecutionTime(6, contaLetraMaisFrequenteKelvin2, 100000).toFixed(4) + 'ms');
console.log('avg kelvin v3: ' + getAvgExecutionTime(6, contaLetraMaisFrequenteKelvin3, 100000).toFixed(4) + 'ms');
console.log('avg kelvin v4: ' + getAvgExecutionTime(6, contaLetraMaisFrequenteKelvin4, 100000).toFixed(4) + 'ms');