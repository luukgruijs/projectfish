import Vue from 'vue';
import Vuex from 'vuex'
import { shallow, mount } from 'vue-test-utils'
import order_now from '@/components/order_now.vue'

Vue.use(Vuex);

describe("Order now component", () => {
    let wrapper;
    let getters;
    let store;
    let actions = {
        getItems: jest.fn(),
        getSetting: jest.fn(),
        addTobasket: jest.fn(),
        removeFromBasket: jest.fn(),
        sendOrder: jest.fn()
    }
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
        ],
        basket: [
            {
                _id: 2,
                name: "zalm",
                price: 1000   
            }
        ],
        setting: {
            budget: 1500
        }
    };

    beforeEach(() => {
        getters = {
            basket: () => state.basket,
            basket_total: () => 1000,
            items: () => state.items,
            setting: () => state.setting,
        }
        store = new Vuex.Store({
            getters,
            actions,
        })
    })

    it("Should call getItems and getSetting on created", () => {
        wrapper = shallow(order_now, {store});
        
        expect(actions.getItems).toBeCalled();
        expect(actions.getSetting).toBeCalled();
    })
    
    it("Should render 2 items in overview", () => {
        wrapper = shallow(order_now, {store});
        const rows = wrapper.findAll(".items .item");

        expect(rows).toHaveLength(2);
    })
    
    it("Should call addToBasket on click item in overview", () => {
        wrapper = shallow(order_now, {store});
        wrapper.vm.addToBasket = jest.fn();
        
        wrapper.find(".items .item").trigger("click");
        expect(wrapper.vm.addToBasket).toBeCalled();
    })

    it("Should dispatch AddToAction on click of item in overview", () => {
        wrapper = shallow(order_now, {store});
        wrapper.find(".items .item").trigger("click");
        
        expect(actions.addTobasket).toBeCalled();
    })
    
    it("Should dispatch removeFromBasket on click of active item in overview", () => {
        wrapper = shallow(order_now, {store});
        const item = wrapper.find(".items .item");
        
        // get active class
        item.trigger("click");

        // removes active class
        item.trigger("click");

        expect(actions.removeFromBasket).toBeCalled();
    })

    it("Should show items in basket", () => {
        wrapper = shallow(order_now, {store});
        const el = wrapper.find('.basket__inner .item').exists();
        expect(el).toBe(true);
    })

    it("Should show order submit button when items in basket", () => {
        wrapper = shallow(order_now, {store});
        const el = wrapper.find('.submit__order').exists();
        expect(el).toBe(true);
    })

    it("Should call SubmitOrder on click send order button", () => {
        wrapper = shallow(order_now, {store});
        
        wrapper.vm.submitOrder = jest.fn();
        wrapper.find('.button.action').trigger("click");

        expect(wrapper.vm.submitOrder).toBeCalled();
    })

    it("Should dispatch sendOrder on submitOrder", () => {
        wrapper = shallow(order_now, {store});
        
        wrapper.vm.submitOrder()

        expect(actions.sendOrder).toBeCalled();
    })
})