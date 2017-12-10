import Vue from 'vue';
import Vuex from 'vuex'
import { shallow, mount } from 'vue-test-utils'
import userbar from '@/components/userbar.vue'

Vue.use(Vuex);

describe("Userbar component", () => {
    let wrapper;
    let getters;
    let store;
    let actions = {
        createUser: jest.fn(),
        updateUser: jest.fn(),
    }
    let mutations = {
        SET_USER_EDITMODE: jest.fn()
    };
    let state = {
        edit_mode: false,
        user: {
            _id: 5,
            email: "testadmin@projectfish.nl",
            name: "luuk gruijs",
            role: "admin",
            password: "test",
            token: 123,
        },
    };

    beforeEach(() => {
        getters = {
            user_edit_mode: () => state.edit_mode,
            selected_user: () => state.user,
        }
        store = new Vuex.Store({
            getters,
            mutations,
            actions,
        })
    })

    it("Should show Add in title when edit_mode is false", () => {
        const wrapper = shallow(userbar, {store});

        expect(wrapper.text()).toContain('Add');
        expect(wrapper.text()).not.toContain('Edit');
    })

    it("Should show dropzone when edit_mode is false", () => {
        const wrapper = shallow(userbar, {store});
        const el = wrapper.find(".multiple__create").exists()
        expect(el).toBe(true);
    })
    
    it("Should show Edit in title when edit_mode is true", () => {
        const wrapper = shallow(userbar, {store, data: ({edit_mode: true})});
        
        expect(wrapper.text()).toContain('Edit');
        expect(wrapper.text()).not.toContain('Add');
    })
    
    it("Should hide dropzone edit_mode is true", () => {
        const wrapper = shallow(userbar, {store, data: ({edit_mode: true})});

        const el = wrapper.find(".multiple__create").exists()
        expect(el).toBe(false);
    })

    it("Should call closeActionBar on click of close", () => {
        const wrapper = shallow(userbar, {store});
        wrapper.vm.closeActionBar = jest.fn();
        wrapper.find(".close").trigger("click");

        expect(wrapper.vm.closeActionBar).toBeCalled();
    })

    it("Should commit SET_USER_EDITMODE when closeActionBar is called", () => {
        const wrapper = shallow(userbar, {store});
        wrapper.vm.closeActionBar();
        expect(mutations.SET_USER_EDITMODE).toBeCalled();
    })

    it("Should dispatch create action on save when edit_mode is false", () => {
        const wrapper = shallow(userbar, {store, data: ({ name: 'luuk', email: 'testuser@projectfish.nl', edit_mode: false})});
        wrapper.vm.saveUser();

        expect(actions.createUser).toBeCalled();
    })
    
    it("Should dispatch update action on save when edit_mode is true", () => {
        const wrapper = shallow(userbar, {store, data: ({ name: 'luuk', email: 'testuser@projectfish.nl', edit_mode: true, _id: 5})});
        wrapper.vm.saveUser();

        expect(actions.createUser).toBeCalled();
    })
})