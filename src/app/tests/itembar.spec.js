import Vue from 'vue';
import Vuex from 'vuex'
import { shallow, mount } from 'vue-test-utils'
import itembar from '@/components/itembar.vue'

Vue.use(Vuex);

describe("Itembar component", () => {
    let wrapper;
    let getters;
    let store;
    let actions = {
        createItem: jest.fn(),
        updateItem: jest.fn(),
    }
    let mutations = {
        SET_ITEM_EDITMODE: jest.fn()
    };
    let state = {
        edit_mode: false,
        item: {
            _id: 4,
            name: "kibbeling",
            price: 1000
        },
    };

    beforeEach(() => {
        getters = {
            edit_mode: () => state.edit_mode,
            selected_item: () => state.item,
        }
        store = new Vuex.Store({
            getters,
            mutations,
            actions,
        })
    })

    it("Should show Add in title when edit_mode is false", () => {
        const wrapper = shallow(itembar, {store});

        expect(wrapper.text()).toContain('Add');
        expect(wrapper.text()).not.toContain('Edit');
    })

    it("Should show dropzone when edit_mode is false", () => {
        const wrapper = shallow(itembar, {store});
        const el = wrapper.find(".multiple__create").exists()
        expect(el).toBe(true);
    })
    
    it("Should show Edit in title when edit_mode is true", () => {
        const wrapper = shallow(itembar, {store, data: ({edit_mode: true})});
        
        expect(wrapper.text()).toContain('Edit');
        expect(wrapper.text()).not.toContain('Add');
    })
    
    it("Should hide dropzone edit_mode is true", () => {
        const wrapper = shallow(itembar, {store, data: ({edit_mode: true})});

        const el = wrapper.find(".multiple__create").exists()
        expect(el).toBe(false);
    })

    it("Should call closeActionBar on click of close", () => {
        const wrapper = shallow(itembar, {store});
        wrapper.vm.closeActionBar = jest.fn();
        wrapper.find(".close").trigger("click");

        expect(wrapper.vm.closeActionBar).toBeCalled();
    })

    it("Should commit SET_ITEM_EDITMODE when closeActionBar is called", () => {
        const wrapper = shallow(itembar, {store});
        wrapper.vm.closeActionBar();
        expect(mutations.SET_ITEM_EDITMODE).toBeCalled();
    })

    it("Should dispatch create action on save when type is created", () => {
        const wrapper = shallow(itembar, {store, data: ({ name: 'test', price: 10.50, type: 'create'})});
        wrapper.vm.save();

        expect(actions.createItem).toBeCalled();
    })
    
    it("Should dispatch update action on save when type is not created", () => {
        const wrapper = shallow(itembar, {store, data: ({ name: 'test', price: 10.50, type: 'edit'})});
        wrapper.vm.save();

        expect(actions.updateItem).toBeCalled();
    })
})