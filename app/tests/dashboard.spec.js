import Vue from 'vue';
import Vuex from 'vuex';
import { Vue as resources } from './mocks/requests'
import VueResource from "vue-resource"
import { shallow, mount } from 'vue-test-utils'
import dashboard from '@/components/dashboard.vue'

Vue.use(Vuex);

describe("Dashboard component", () => {

    let wrapper;

    beforeEach(() => {
        wrapper = shallow(dashboard);

        // ignore chart rendering
        wrapper.vm.drawItemsChart = jest.fn()
        wrapper.vm.drawOrderChart = jest.fn()
    })

    it("Should have orders, users and latest_orders", () => {
        expect(wrapper.vm.orders).toBeDefined();
        expect(wrapper.vm.users).toBeDefined();
        expect(wrapper.vm.latest_orders).toBeDefined();
    })
})
