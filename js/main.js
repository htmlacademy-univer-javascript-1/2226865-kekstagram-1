import {receivePostsAsync} from './network.js';
import {renderThumbnails} from './thumbnails.js';
import './uploadForm.js';

receivePostsAsync(renderThumbnails);
