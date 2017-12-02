import Vue from 'vue';
import Vuex from 'vuex'
import { shallow, mount } from 'vue-test-utils'
import settingsbar from '@/components/settingsbar.vue'

Vue.use(Vuex);

describe("Settingsbar component", () => {
    let wrapper;
    let getters;
    let store;
    let actions = {
        updateSetting: jest.fn(),
    }
    let mutations = {
        SET_SETTING_EDITMODE: jest.fn()
    };
    let state = {
        edit_mode: true,
        setting: {
            _id: 4,
            budget: 800,
        },
    };

    beforeEach(() => {
        getters = {
            setting_edit_mode: () => state.edit_mode,
            setting: () => state.setting,
        }
        store = new Vuex.Store({
            getters,
            mutations,
            actions,
        })
    })

    it("Should call closeActionbar on click of close", () => {
        wrapper = shallow(settingsbar, {store})
        wrapper.vm.closeActionBar = jest.fn()

        wrapper.find(".close").trigger("click");

        expect(wrapper.vm.closeActionBar).toBeCalled();
    })

    it("Should commit SET_SETTING_EDITMODE on call closeActionBar", () => {
        wrapper = shallow(settingsbar, {store})
        wrapper.vm.closeActionBar();

        expect(mutations.SET_SETTING_EDITMODE).toBeCalled();
    })

    it("Should call editSettings on click submit button", () => {
        wrapper = shallow(settingsbar, {store})
        wrapper.vm.editSettings = jest.fn()

        wrapper.find(".button.action").trigger("click");

        expect(wrapper.vm.editSettings).toBeCalled();
    })

    it("Should dispatch an update call on editSettings", () => {
        wrapper = shallow(settingsbar, {store})
        wrapper.vm.editSettings()

        expect(actions.updateSetting).toBeCalled();
    })

})