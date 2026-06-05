export function emoji(value) {
  return { type: 'emoji', value };
}

export function textVisual(value) {
  return { type: 'text', value };
}

export const alphabetSounds = [
  { letter: 'A', letterName: 'ay', sound: '/a/', soundText: 'short a', examples: ['apple', 'ant', 'axe', 'alligator', 'ambulance'], visuals: ['🍎', '🐜', '🪓', '🐊', '🚑'] },
  { letter: 'B', letterName: 'bee', sound: '/b/', soundText: 'b', examples: ['ball', 'boy', 'banana', 'bag', 'bed'], visuals: ['⚽', '👦', '🍌', '🎒', '🛏️'] },
  { letter: 'C', letterName: 'see', sound: '/k/', soundText: 'k', examples: ['cat', 'cup', 'car', 'cake', 'cow'], visuals: ['🐱', '🥤', '🚗', '🍰', '🐄'] },
  { letter: 'D', letterName: 'dee', sound: '/d/', soundText: 'd', examples: ['dog', 'duck', 'door', 'doll', 'drum'], visuals: ['🐶', '🦆', '🚪', '🧸', '🥁'] },
  { letter: 'E', letterName: 'ee', sound: '/e/', soundText: 'short e', examples: ['egg', 'elephant', 'elbow', 'engine', 'envelope'], visuals: ['🥚', '🐘', '💪', '🚂', '✉️'] },
  { letter: 'F', letterName: 'eff', sound: '/f/', soundText: 'f', examples: ['fish', 'fan', 'frog', 'flower', 'fox'], visuals: ['🐟', '🪭', '🐸', '🌸', '🦊'] },
  { letter: 'G', letterName: 'gee', sound: '/g/', soundText: 'g', examples: ['goat', 'girl', 'gate', 'gift', 'gum'], visuals: ['🐐', '👧', '🚪', '🎁', '🍬'] },
  { letter: 'H', letterName: 'aitch', sound: '/h/', soundText: 'h', examples: ['hat', 'hen', 'house', 'hand', 'horse'], visuals: ['🎩', '🐔', '🏠', '✋', '🐴'] },
  { letter: 'I', letterName: 'eye', sound: '/i/', soundText: 'short i', examples: ['insect', 'ink', 'igloo', 'ill', 'invitation'], visuals: ['🐞', '🖋️', '🧊', '🤒', '💌'] },
  { letter: 'J', letterName: 'jay', sound: '/j/', soundText: 'j', examples: ['jug', 'jam', 'jump', 'jacket', 'juice'], visuals: ['🏺', '🍓', '🤸', '🧥', '🧃'] },
  { letter: 'K', letterName: 'kay', sound: '/k/', soundText: 'k', examples: ['kite', 'king', 'key', 'kettle', 'kangaroo'], visuals: ['🪁', '👑', '🔑', '🫖', '🦘'] },
  { letter: 'L', letterName: 'ell', sound: '/l/', soundText: 'l', examples: ['lion', 'leaf', 'leg', 'lamp', 'lemon'], visuals: ['🦁', '🍃', '🦵', '💡', '🍋'] },
  { letter: 'M', letterName: 'em', sound: '/m/', soundText: 'm', examples: ['man', 'moon', 'mango', 'milk', 'mat'], visuals: ['👨', '🌙', '🥭', '🥛', '🟫'] },
  { letter: 'N', letterName: 'en', sound: '/n/', soundText: 'n', examples: ['net', 'nose', 'nest', 'nurse', 'nine'], visuals: ['🥅', '👃', '🪺', '🧑‍⚕️', '9️⃣'] },
  { letter: 'O', letterName: 'oh', sound: '/o/', soundText: 'short o', examples: ['orange', 'ox', 'octopus', 'olive', 'ostrich'], visuals: ['🍊', '🐂', '🐙', '🫒', '🐦'] },
  { letter: 'P', letterName: 'pee', sound: '/p/', soundText: 'p', examples: ['pen', 'pig', 'pot', 'pencil', 'pumpkin'], visuals: ['🖊️', '🐷', '🍲', '✏️', '🎃'] },
  { letter: 'Q', letterName: 'cue', sound: '/kw/', soundText: 'kw', examples: ['queen', 'quick', 'quilt', 'quail', 'question'], visuals: ['👸', '⚡', '🛏️', '🐦', '❓'] },
  { letter: 'R', letterName: 'ar', sound: '/r/', soundText: 'r', examples: ['rabbit', 'rain', 'ring', 'robot', 'road'], visuals: ['🐰', '🌧️', '💍', '🤖', '🛣️'] },
  { letter: 'S', letterName: 'ess', sound: '/s/', soundText: 's', examples: ['sun', 'snake', 'sock', 'soap', 'star'], visuals: ['☀️', '🐍', '🧦', '🧼', '⭐'] },
  { letter: 'T', letterName: 'tee', sound: '/t/', soundText: 't', examples: ['tap', 'table', 'tiger', 'tomato', 'toy'], visuals: ['🚰', '🪵', '🐯', '🍅', '🧸'] },
  { letter: 'U', letterName: 'you', sound: '/u/', soundText: 'short u', examples: ['umbrella', 'under', 'up', 'uncle', 'unhappy'], visuals: ['☂️', '⬇️', '⬆️', '👨', '☹️'] },
  { letter: 'V', letterName: 'vee', sound: '/v/', soundText: 'v', examples: ['van', 'vase', 'vest', 'violin', 'vegetable'], visuals: ['🚐', '🏺', '🦺', '🎻', '🥦'] },
  { letter: 'W', letterName: 'double you', sound: '/w/', soundText: 'w', examples: ['water', 'window', 'watch', 'worm', 'watermelon'], visuals: ['💧', '🪟', '⌚', '🪱', '🍉'] },
  { letter: 'X', letterName: 'ex', sound: '/ks/', soundText: 'ks', examples: ['box', 'fox', 'six', 'ox', 'taxi'], visuals: ['📦', '🦊', '6️⃣', '🐂', '🚕'] },
  { letter: 'Y', letterName: 'why', sound: '/y/', soundText: 'y', examples: ['yellow', 'yes', 'yoyo', 'yam', 'yoghurt'], visuals: ['🟡', '✅', '🪀', '🍠', '🥣'] },
  { letter: 'Z', letterName: 'zed', sound: '/z/', soundText: 'z', examples: ['zebra', 'zip', 'zoo', 'zero', 'zigzag'], visuals: ['🦓', '🤐', '🦁', '0️⃣', '〰️'] }
];

export const shortVowels = [
  { letter: 'A', letterName: 'ay', sound: '/a/', soundText: 'short a', examples: ['apple', 'ant', 'cat', 'bag', 'hat'], visuals: ['🍎', '🐜', '🐱', '🎒', '🎩'] },
  { letter: 'E', letterName: 'ee', sound: '/e/', soundText: 'short e', examples: ['egg', 'bed', 'pen', 'hen', 'net'], visuals: ['🥚', '🛏️', '🖊️', '🐔', '🥅'] },
  { letter: 'I', letterName: 'eye', sound: '/i/', soundText: 'short i', examples: ['insect', 'pig', 'sit', 'fish', 'pin'], visuals: ['🐞', '🐷', '🪑', '🐟', '📍'] },
  { letter: 'O', letterName: 'oh', sound: '/o/', soundText: 'short o', examples: ['orange', 'dog', 'pot', 'box', 'fox'], visuals: ['🍊', '🐶', '🍲', '📦', '🦊'] },
  { letter: 'U', letterName: 'you', sound: '/u/', soundText: 'short u', examples: ['umbrella', 'cup', 'sun', 'bus', 'hut'], visuals: ['☂️', '🥤', '☀️', '🚌', '🏚️'] }
];

export function optionVisualsFromEmoji(values = []) {
  return values.map((value) => emoji(value));
}

export function completePhonicsOptions({
  options = [],
  optionVisuals = [],
  item = null,
  soundItems = []
} = {}) {
  const nextOptions = [...options];
  const nextVisuals = [...optionVisuals];
  const used = new Set(nextOptions.map((option) => String(option).toLowerCase()));
  const itemExamples = new Set((item?.examples || []).map((example) => example.toLowerCase()));
  const visualByExample = new Map(
    soundItems.flatMap((soundItem) => (
      soundItem.examples.map((example, index) => [
        example.toLowerCase(),
        soundItem.visuals[index]
      ])
    ))
  );

  if (nextOptions.every((option) => /^[A-Z]$/.test(String(option)))) {
    for (const letter of soundItems.map((soundItem) => soundItem.letter)) {
      if (!used.has(letter.toLowerCase()) && letter !== item?.letter) {
        nextOptions.push(letter);
        nextVisuals.push(textVisual(letter));
        break;
      }
    }
  }

  for (const soundItem of soundItems) {
    for (const example of soundItem.examples) {
      if (nextOptions.length >= 4) {
        break;
      }

      const key = example.toLowerCase();
      if (!used.has(key) && !itemExamples.has(key)) {
        nextOptions.push(example);
        nextVisuals.push(emoji(visualByExample.get(key) || '⭐'));
        used.add(key);
      }
    }
  }

  while (nextOptions.length < 4) {
    const fallback = `Option ${nextOptions.length + 1}`;
    nextOptions.push(fallback);
    nextVisuals.push(textVisual(fallback));
  }

  return {
    options: nextOptions,
    optionVisuals: nextVisuals
  };
}

export function readAloudWithOptions(question, options = []) {
  return `${question} ${options.map((option, index) => (
    `Option ${String.fromCharCode(65 + index)}: ${option}.`
  )).join(' ')}`;
}

export function phonicsMetadata(item, extra = {}) {
  return {
    letter: item.letter,
    letterName: item.letterName,
    sound: item.sound,
    soundText: item.soundText,
    exampleWord: item.examples?.[0],
    exampleVisual: item.visuals?.[0],
    ...extra
  };
}
