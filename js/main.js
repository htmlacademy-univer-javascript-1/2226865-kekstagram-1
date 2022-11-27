import {receivePostsAsync} from './network.js';
import {renderThumbnails} from './thumbnails.js';
import './photouploading/form.js';

receivePostsAsync(renderThumbnails);
