import { createBrowserHistory } from 'history';

declare const BASE_URL: string;

export default createBrowserHistory({ basename: BASE_URL });
