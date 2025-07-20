export const cardData = {
  numbers: [
    { id: 1, name: 'number one', content: '1' },
    { id: 2, name: 'number two', content: '2' },
    { id: 3, name: 'number three', content: '3' },
    { id: 4, name: 'number four', content: '4' },
    { id: 5, name: 'number five', content: '5' },
    { id: 6, name: 'number six', content: '6' },
  ],
  emotions: [
    { id: 1, name: 'happy face', content: '😊' },
    { id: 2, name: 'sad face', content: '😢' },
    { id: 3, name: 'angry face', content: '😡' },
    { id: 4, name: 'surprised face', content: '🤩' },
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