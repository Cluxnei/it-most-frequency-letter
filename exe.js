function contaLetraMaisFrequenteClayton(palavra) {
    let novaPalavra = palavra.split('')
    let maior = novaPalavra[0]
    let resposta = ''
    let contResposta = 0

    for (let i = 0; i < novaPalavra.length; i++) {
        let contMaior = 0
        let cont = 0
        for (let j = 0; j < novaPalavra.length; j++) {
            if (novaPalavra[j] == maior) {
                contMaior++
            }
        }
        if (contMaior >= cont) {
            maior = novaPalavra[i]
            cont = contMaior
        }
        contMaior = 0
        if (cont > contResposta) {
            contResposta = cont
            resposta = maior
        }
    }
    return resposta
}

function contaLetraMaisFrequentePedro(palavra) {
    let letra = "A";
    let vector = [
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z",
    ];
    let vectorValue = new Array(26).fill(0);
    let index = 0;
    let i = 0;
    let maior = 0;

    while (i < palavra.length) {
        if (palavra[i] == vector[index]) {
            vectorValue[index]++;
            if (maior < vectorValue[index]) {
                maior = vectorValue[index];
                letra = vector[index];
            }
            i++;
            index = 0;
        } else {
            index++;
        }
    }
    return letra;
}

function contaLetraMaisFrequenteKelvin(palavra) {
    const codes = [];
    let maxCount = 0;
    let maxCode = 0;
    for (let i = 0; i < palavra.length; i++) {
        const char = palavra[i];
        const code = char.charCodeAt(0);
        if (codes[code]) {
            codes[code] += 1;
        } else {
            codes[code] = 1;
        }
        if (codes[code] > maxCount) {
            maxCount = codes[code];
            maxCode = code;
        }
    }
    return String.fromCharCode(maxCode);
}

function contaLetraMaisFrequenteKelvin2(palavra) {
    const codes = [];
    let maxCount = 0, maxCode = 0;
    for (let i = 0; i < palavra.length; i++) {
        const code = palavra.charCodeAt(i);
        if (codes[code]) {
            codes[code] += 1;
        } else {
            codes[code] = 1;
        }
        if (codes[code] > maxCount) {
            maxCount = codes[code];
            maxCode = code;
        }
    }
    return String.fromCharCode(maxCode);
}

function contaLetraMaisFrequenteKelvin3(palavra) {
    let charMask = 0;
    const charCounts = [];
    let maxCount = 0, maxChar = 0;

    for (let i = 0; i < palavra.length; i++) {
        const charCode = palavra.charCodeAt(i);
        const charBit = 1 << charCode; // Create a bit mask for the current character

        if ((charMask & charBit) === 0) { // Check if the character has already been seen
            charMask |= charBit; // Set the corresponding bit in the mask to mark the character as seen
            charCounts[charCode] = 1; // Initialize the count of the current character
        } else { // If the character has been seen before, increment its count and update maxCount and maxChar if necessary
            charCounts[charCode]++; // Increment the count of the current character
            if (charCounts[charCode] > maxCount) {
                maxCount = charCounts[charCode];
                maxChar = charCode;
            }
        }
    }
    return String.fromCharCode(maxChar);
}

function contaLetraMaisFrequenteKelvin4(palavra) {
    let charMask = 0;
    const charCounts = new Uint8Array(256);
    let maxCount = 0, maxChar = 0;

    for (let i = 0; i < palavra.length; i++) {
        const charCode = palavra.charCodeAt(i);
        const charBit = 1 << charCode; // Create a bit mask for the current character

        if ((charMask & charBit) === 0) { // Check if the character has already been seen
            charMask |= charBit; // Set the corresponding bit in the mask to mark the character as seen
            charCounts[charCode] = 1; // Initialize the count of the current character
        } else { // If the character has been seen before, increment its count and update maxCount and maxChar if necessary
            charCounts[charCode]++; // Increment the count of the current character
            if (charCounts[charCode] > maxCount) {
                maxCount = charCounts[charCode];
                maxChar = charCode;
            }
        }
    }
    return String.fromCharCode(maxChar);
}


function contaLetraMaisFrequenteLari(palavra) {
    const letterCount = {};
    let maxCount = 0;
    let frequentLetter = "";

    for (let letter of palavra) {
        if (letterCount[letter]) {
            letterCount[letter]++;
        } else {
            letterCount[letter] = 1;
        }

        if (letterCount[letter] > maxCount) {
            maxCount = letterCount[letter];
            frequentLetter = letter;
        }

    }

    return frequentLetter;

}


function contaLetraMaisFrequenteLari3(palavra) {
    const letterCount = [...palavra].reduce((map, letter) => {
        map.set(letter, map.has(letter) ? map.get(letter) + 1 : 1);
        return map;
    }, new Map());

    let maxCount = 0;
    let frequentLetter = '';

    letterCount.forEach((count, letter) => {
        if (count > maxCount) {
            maxCount = count;
            frequentLetter = letter;
        }
    });

    return frequentLetter;

}

function contaLetraMaisFrequenteLari2(palavra) {
    const letterCount = {};
    let maxCount = 0;
    let frequentLetter = "";

    for (let i = 0; i < palavra.length; i++) {
        const letter = palavra[i];
        letterCount[letter] = (letterCount[letter] || 0) + 1;
        if (letterCount[letter] > maxCount) {
            maxCount = letterCount[letter];
            frequentLetter = letter;
        }
    }

    return frequentLetter;

}

function contaLetraMaisFrequenteRaul(string) {
    const characters = {};
    let max = 0,
        maxChar = '';

    for (let i = 0; i < string.length; i++) {
        const char = string[i];
        characters[char] = characters[char] + 1 || 1;
    }
    const keys = Object.keys(characters);
    for (let i = 0; i < keys.length; i++) {
        const char = keys[i];
        if (characters[char] > max) {
            max = characters[char];
            maxChar = char;
        }
    }

    return maxChar;
}


module.exports = { contaLetraMaisFrequenteKelvin4, contaLetraMaisFrequenteKelvin2, contaLetraMaisFrequenteKelvin3, contaLetraMaisFrequenteLari3, contaLetraMaisFrequenteRaul, contaLetraMaisFrequenteClayton, contaLetraMaisFrequentePedro, contaLetraMaisFrequenteLari, contaLetraMaisFrequenteLari2, contaLetraMaisFrequenteKelvin }