import Vue from 'vue';
import Vuex from 'vuex';
import createLogger from 'vuex/dist/logger';

import login from './login';
import items from './items';
import users from './users';
import settings from './settings';
import ordernow from './ordernow';
import orders from './orders';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  modules: {
    login,
    items,
    users,
    settings,
    ordernow,
    orders
  },
  strict: debug,
  plugins: debug ? [createLogger()] : [],
});