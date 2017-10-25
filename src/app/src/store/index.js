import Vue from 'vue';
import Vuex from 'vuex';
import createLogger from 'vuex/dist/logger';

import login from './login';
import lunchorders from './lunchorders';
import items from './items';
import users from './users';
import settings from './settings';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  modules: {
    login,
    lunchorders,
    items,
    users,
    settings,
  },
  strict: debug,
  plugins: debug ? [createLogger()] : [],
});