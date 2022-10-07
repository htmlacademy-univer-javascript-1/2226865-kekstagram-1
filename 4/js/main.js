const sentences = [
  'Всё отлично!',
  'В целом всё неплохо.Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра.В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают.Как можно было поймать такой неудачный момент ? !'
];

const names = [
  'Артём',
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон'
];

const imgDescriptions = [
  'Очень красивая фотография',
  'Очень не красивая фотография',
  'Красивая фотография',
  'Некрасивая фотография',
  'Просто фотография',
  'Фотография котика'
];

const photosPattern = 'photos/{{i}}.jpg';
const avatarPattern = 'img/avatar-{{случайное число от 1 до 6}}.svg';

const createComment = () => {
  let message = '';
  const sentencesNumber = random(1, 2);
  for (let i = 0; i < sentencesNumber; i++) {
    message += ` ${randomArrayElement(sentences)}`;
  }
  return {
    id: random(0, 25000000),
    avatar: stringByPattern(avatarPattern, random(1, 6)),
    message: message,
    name: randomArrayElement(names),
  };
};

const createComments = () => {
  const comments = [];
  const commentsNumber = random(1, 3);
  for (let i = 0; i < commentsNumber; i++) {
    comments[i] = createComment();
  }
  return comments;
};

const createUser = () => ({
  id: random(1, 25),
  url: stringByPattern(photosPattern, random(1, 25)),
  description: randomArrayElement(imgDescriptions),
  likes: random(15, 200),
  comments: createComments()
});

function randomArrayElement(array) {
  return array[random(0, array.length - 1)];
}

function random (min, max) {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}

function stringByPattern(pattern, i) {
  const leftBracket = pattern.indexOf('{');
  const rightBracket = pattern.lastIndexOf('}');
  return pattern.substring(0, leftBracket) + i + pattern.substring(rightBracket + 1, pattern.length);
}

// eslint-disable-next-line no-unused-vars
function checkStringLength(string, maxLength) {
  return string.length <= length;
}

// eslint-disable-next-line no-console
console.log(createUser());
