export const cardData = {
  emotions: [
    { id: 1, name: 'happy', content: '😊' },
    { id: 2, name: 'sad', content: '😢' },
    { id: 3, name: 'excited', content: '🎉' },
    { id: 4, name: 'surprised', content: '😮' },
  ],
  numbers: [
    { id: 1, name: 'one', content: '1' },
    { id: 2, name: 'two', content: '2' },
    { id: 3, name: 'three', content: '3' },
    { id: 4, name: 'four', content: '4' },
    { id: 5, name: 'five', content: '5' },
    { id: 6, name: 'six', content: '6' },
  ],
  shapes: [
    { id: 1, name: 'circle', content: '⭕' },
    { id: 2, name: 'square', content: '⬛' },
    { id: 3, name: 'triangle', content: '▲' },
    { id: 4, name: 'star', content: '⭐' },
  ]
};

export const sounds = {
  flip: new Audio('/sounds/flipcard-91468.mp3'),
  match: new Audio('/sounds/correct-6033.mp3'),
  win: new Audio('/sounds/goodresult-82807.mp3')
};