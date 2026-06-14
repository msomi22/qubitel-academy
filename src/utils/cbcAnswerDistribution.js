export const MIXED_CORRECT_ANSWER_SLOTS = [
    0, 2, 1, 3,
    0, 3, 2, 1,
    1, 3, 0, 2,
    3, 1, 2, 0,
    2, 0, 3, 1
  ];
  
  export function placeCorrectAnswerAt(options, correctAnswer, targetIndex) {
    if (!Array.isArray(options)) {
      throw new Error('placeCorrectAnswerAt requires an options array.');
    }
  
    if (!Number.isInteger(targetIndex) || targetIndex < 0 || targetIndex >= options.length) {
      throw new Error(`Target answer index ${targetIndex} is outside options range 0-${options.length - 1}.`);
    }
  
    const currentIndex = options.findIndex((option) => option === correctAnswer);
  
    if (currentIndex === -1) {
      throw new Error(`Correct answer "${correctAnswer}" must exactly match one of the provided options.`);
    }
  
    const orderedOptions = [...options];
  
    if (currentIndex !== targetIndex) {
      [orderedOptions[currentIndex], orderedOptions[targetIndex]] = [
        orderedOptions[targetIndex],
        orderedOptions[currentIndex]
      ];
    }
  
    return orderedOptions;
  }
  
  export function targetAnswerSlotForQuestion(index) {
    return MIXED_CORRECT_ANSWER_SLOTS[index % MIXED_CORRECT_ANSWER_SLOTS.length];
  }