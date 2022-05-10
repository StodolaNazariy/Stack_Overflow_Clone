import REDUCER_NAMES from './reducer_names';
import ROUTES from './routes';
import CONTENT from './content';

const default_avatar = process.env.PUBLIC_URL + '/icons/avatar_default.png';
const Tabs = [...CONTENT.tabs];

export { REDUCER_NAMES, ROUTES, default_avatar, CONTENT, Tabs };
