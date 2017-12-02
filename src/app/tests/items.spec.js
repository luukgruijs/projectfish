import Vue from 'vue';
import Vuex from 'vuex'
import { shallow, mount } from 'vue-test-utils'
import items from '@/components/items.vue'

Vue.use(Vuex);

describe("Items component", () => {
    let wrapper;
    let getters;
    let store;
    let actions = {
        getItems: jest.fn(),
        deleteItem: jest.fn(),
    }
    let mutations = {
        SET_ITEM_EDITMODE: jest.fn(),
        SET_SELECTED_ITEM: jest.fn()
    };
    let state = {
        items: [
            {
                _id: 1,
                name: "kibbeling",
                price: 1000   
            },
            {
                _id: 2,
                name: "zalm",
                price: 1000   
            },
        ]
    };

    beforeEach(() => {
        getters = {
            items: () => state.items,
        }
        store = new Vuex.Store({
            getters,
            mutations,
            actions,
        })
    })

    it("Should dispatch getItems on create", () => {
        const wrapper = shallow(items, {store});
        expect(actions.getItems).toBeCalled();
    })
    
    it("Should commit SET_ITEM_EDITMODE on openActionBar", () => {
        const wrapper = shallow(items, {store});
        wrapper.vm.openActionBar();

        expect(mutations.SET_ITEM_EDITMODE).toBeCalled();
    })

    it("Should commit SET_SELECTED_ITEM on onEdit", () => {
        const wrapper = shallow(items, {store});
        wrapper.vm.onEdit(state.items[0]);

        expect(mutations.SET_SELECTED_ITEM).toBeCalled();
    })

    it("Should dispatch deleteItem on onDelete", () => {
        const wrapper = shallow(items, {store});
        wrapper.vm.onDelete(state.items[0]);
        expect(actions.deleteItem).toBeCalled();
    })
})