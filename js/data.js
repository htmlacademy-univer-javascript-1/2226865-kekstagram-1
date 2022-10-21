import {random, randomArrayElement, stringByPattern} from './util.js';

const SENTENCES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const NAMES = [
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

const IMG_DESCRIPTIONS = [
  'Очень красивая фотография',
  'Очень некрасивая фотография',
  'Красивая фотография',
  'Некрасивая фотография',
  'Просто фотография',
  'Фотография котика'
];

const PHOTOS_PATTERN = 'photos/{{i}}.jpg';
const AVATAR_PATTERN = 'img/avatar-{{случайное число от 1 до 6}}.svg';

const createComment = () => {
  let message = '';
  const sentencesNumber = random(1, 2);
  for (let i = 0; i < sentencesNumber; i++) {
    message += ` ${randomArrayElement(SENTENCES)}`;
  }
  return {
    id: random(0, 25000000),
    avatar: stringByPattern(AVATAR_PATTERN, random(1, 6)),
    message: message,
    name: randomArrayElement(NAMES),
  };
};

const createComments = () => Array.from({length: random(1, 3)}, createComment);

const createPost = () => ({
  id: random(1, 25),
  url: stringByPattern(PHOTOS_PATTERN, random(1, 25)),
  description: randomArrayElement(IMG_DESCRIPTIONS),
  likes: random(15, 200),
  comments: createComments()
});

const createPosts = () => Array.from({length: 25}, createPost);

export {createPosts, createPost};
