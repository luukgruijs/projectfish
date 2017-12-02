import Vue from 'vue'
import Vuex from 'vuex'
import { shallow, mount } from 'vue-test-utils'
import navbar from '@/components/navbar.vue'

Vue.use(Vuex);

describe("Navbar component", () => {

    let wrapper
    let state
    let getters
    let store
    let user = {
        token: '123',
        role: 'admin',
    }

    beforeEach(() => {
      getters = {
        current_user: () => user,
      }
      store = new Vuex.Store({
        getters
      })
    })

    it('Should have computed current_user', () => {
        const wrapper = shallow(navbar, {store});
        expect(wrapper.vm.current_user).toBeDefined()
    })

    it('Should show navbar when token is present', () => {
        const wrapper = shallow(navbar, {store});
        const el = wrapper.find('.navbar').exists();
        expect(el).toBe(true);
    })

    it('Should hide navbar when token is not present', () => {
        user.token = '';
        const wrapper = shallow(navbar, {store});
        const el = wrapper.find('.navbar').exists();
        expect(el).toBe(false);
    })

    it('Should call logout on logout', () => {
        user.token = '123';
        
        const wrapper = shallow(navbar, {store});
        wrapper.vm.logout = jest.fn();
        wrapper.find('.logout').trigger('click');

        expect(wrapper.vm.logout).toBeCalled();
    })
})