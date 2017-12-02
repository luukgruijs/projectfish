import Vue from 'vue';
import Vuex from 'vuex'
import { shallow, mount } from 'vue-test-utils'
import settings from '@/components/settings.vue'

Vue.use(Vuex);

describe("Settings component", () => {
    let wrapper;
    let getters;
    let store;
    let actions = {
        getSetting: jest.fn(),
    }
    let mutations = {
        SET_SETTING_EDITMODE: jest.fn(),
    }
    let state = {
        setting: {
            _id: 1,
            budget: 1000,
        },
    };

    beforeEach(() => {
        getters = {
            setting: () => state.setting,
        }
        store = new Vuex.Store({
            getters,
            mutations,
            actions,
        })
    })

    it("Should dispatch getSetting on create", () => {
        const wrapper = shallow(settings, {store});
        expect(actions.getSetting).toBeCalled();
    })

    it("Should call openActionBar on click edit settings", () => {
        const wrapper = shallow(settings, {store});
        wrapper.vm.openActionBar = jest.fn();
        wrapper.find(".header a").trigger("click");

        expect(wrapper.vm.openActionBar).toBeCalled();
    })

    it("Should commit SET_SETTING_EDITMODE on call openActionBar", () => {
        const wrapper = shallow(settings, {store});

        wrapper.vm.openActionBar()

        expect(mutations.SET_SETTING_EDITMODE).toBeCalled();
    })
})