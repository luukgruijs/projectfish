import Vue from 'vue';
import Vuex from 'vuex'
import { shallow, mount } from 'vue-test-utils'
import users from '@/components/users.vue'

Vue.use(Vuex);

describe("Users component", () => {
    let wrapper;
    let getters;
    let store;
    let actions = {
        getUsers: jest.fn(),
        deleteUser: jest.fn(),
    }
    let mutations = {
        SET_USER_EDITMODE: jest.fn(),
        SET_SELECTED_USER: jest.fn()
    };
    let state = {
        users: [
            {
                _id: 1,
                email: "testadmin@projectfish.nl",
                name: "luuk gruijs",
                role: "admin",
                password: "test",
            },
            {
                _id: 2,
                email: "testuser@projectfish.nl",
                name: "luuk gruijs",
                role: "user",
                password: "test",
            },
        ]
    };

    beforeEach(() => {
        getters = {
            users: () => state.users,
        }
        store = new Vuex.Store({
            getters,
            mutations,
            actions,
        })
    })

    it("Should dispatch getUsers on create", () => {
        const wrapper = shallow(users, {store});
        expect(actions.getUsers).toBeCalled();
    })
    
    it("Should commit SET_USER_EDITMODE on openActionBar", () => {
        const wrapper = shallow(users, {store});
        wrapper.vm.openActionBar();

        expect(mutations.SET_USER_EDITMODE).toBeCalled();
    })

    it("Should commit SET_USER_EDITMODE on onEdit", () => {
        const wrapper = shallow(users, {store});
        wrapper.vm.onEdit(state.users[0]);

        expect(mutations.SET_USER_EDITMODE).toBeCalled();
    })

    it("Should dispatch deletUser on onDelete", () => {
        const wrapper = shallow(users, {store});
        wrapper.vm.onDelete(state.users[1]);

        expect(actions.deleteUser).toBeCalled();
    })
})