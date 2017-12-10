import Vue from 'vue';
import Vuex from 'vuex'
import { shallow, mount } from 'vue-test-utils'
import order from '@/components/order.vue'

Vue.use(Vuex);

describe("Order now component", () => {
    let wrapper;
    let getters;
    let store;
    let mocks =  { 
        $route: {
            params: {
                id: 1,
            }
        }
    }
    let actions = {
        getOrder: jest.fn(),
    }
    let state = {
       users: [
            {
                _id: 5,
                email: "testadmin@projectfish.nl",
                name: "luuk gruijs",
                role: "admin",
                password: "test",
                token: 123,
            }
       ],
       order: {
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
       }
    };

    beforeEach(() => {
        getters = {
            selected_order: () => state.order,
            users: () => state.users,
        }
        store = new Vuex.Store({
            getters,
            actions,
        })
    })

    it("Should call getOrder on created", () => {
        const wrapper = shallow(order, {store, mocks});
        expect(actions.getOrder).toBeCalled();
    })

    it("Should create count_items with fish = 2", () => {
        const wrapper = shallow(order, {store, mocks});

        wrapper.vm.generateGraph = jest.fn();

        wrapper.vm.countItems();

        const items = {
            fish: 2,
        }

        expect(wrapper.vm.count_items).toEqual(items);
    })

    it("Should call generateGraph after countItems", () => {
        const wrapper = shallow(order, {store, mocks});
        wrapper.vm.generateGraph = jest.fn();  
        wrapper.vm.countItems();

        expect(wrapper.vm.generateGraph).toBeCalled();
    })
})
