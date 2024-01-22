import React from 'react';

export const isBrowser = (): boolean => typeof window !== 'undefined';

//<Console log={"example to log"} />;
// export const Console = (prop) => (
//   console[Object.keys(prop)[0]](...Object.values(prop)), null // ➜ React components must return something
// );

export const scrollToBottom = () => {
  window.scrollTo({
    top: document.documentElement.scrollHeight,
    behavior: 'smooth',
  });
};
export const scrollToRef = (ref) => {
  window.scrollTo({
    top: ref.current.offsetTop,
    behavior: 'smooth',
  });
};

export function roundNumberUp(num, scale) {
  return Math.ceil(num * Math.pow(10, scale)) / Math.pow(10, scale);
}

export function generateRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function getTextWidth(text, font = '500 12px sans-serif') {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  context.font = font;
  return context.measureText(text).width;
}

function breakString(word, maxWidth, hyphenCharacter = '-') {
  const characters = word.split('');
  const lines = [];
  let currentLine = '';
  characters.forEach((character, index) => {
    const nextLine = `${currentLine}${character}`;
    const lineWidth = getTextWidth(nextLine);
    if (lineWidth >= maxWidth) {
      const currentCharacter = index + 1;
      const isLastLine = characters.length === currentCharacter;
      const hyphenatedNextLine = `${nextLine}${hyphenCharacter}`;
      lines.push(isLastLine ? nextLine : hyphenatedNextLine);
      currentLine = '';
    } else {
      currentLine = nextLine;
    }
  });
  return { hyphenatedStrings: lines, remainingWord: currentLine };
}

export function wrapLabel(label, maxWidth) {
  const words = label.split(' ');
  const completedLines = [];
  let nextLine = '';
  words.forEach((word, index) => {
    const wordLength = getTextWidth(`${word} `);
    const nextLineLength = getTextWidth(nextLine);
    if (wordLength > maxWidth) {
      const { hyphenatedStrings, remainingWord } = breakString(word, maxWidth);
      completedLines.push(nextLine, ...hyphenatedStrings);
      nextLine = remainingWord;
    } else if (nextLineLength + wordLength >= maxWidth) {
      completedLines.push(nextLine);
      nextLine = word;
    } else {
      nextLine = [nextLine, word].filter(Boolean).join(' ');
    }
    const currentWord = index + 1;
    const isLastWord = currentWord === words.length;
    if (isLastWord) {
      completedLines.push(nextLine);
    }
  });
  return completedLines.filter((line) => line !== '');
}
