import Vue from 'vue';
import Vuex from 'vuex'
import { shallow, mount } from 'vue-test-utils'
import orders from '@/components/orders.vue'

Vue.use(Vuex);

describe("Orders component", () => {
    let wrapper;
    let getters;
    let store;
    let mocks =  { 
        $router: {
            push: jest.fn()
        }
    }
    let actions = {
        getOrders: jest.fn(),
    }
    let state = {
        orders: [
            {
                _id: 1,
                created_at: new Date(),
                orders: [
                    {
                        _id: 2,
                        amount: 1000,
                        items: [
                            {
                                name: "fish",
                                price: 1000
                            }
                        ],
                    },
                    {
                        _id: 3,
                        amount: 1000,
                        items: [
                            {
                                name: "fish",
                                price: 1000
                            }
                        ],
                    }
                ]
            },
        ]
    };

    beforeEach(() => {
        getters = {
            orders: () => state.orders,
        }
        store = new Vuex.Store({
            getters,
            actions,
        })
    })

    it("Should dispatch getOrders on create", () => {
        const wrapper = shallow(orders, {store});
        expect(actions.getOrders).toBeCalled();
    })

    it("Should change route to route/:id on call forward", () => {
        const wrapper = shallow(orders, {store, mocks});
        wrapper.vm.forward(state.orders[0])

        const path = {path: 'orders/1'};

        expect(mocks.$router.push).toBeCalledWith(path)
    })
})