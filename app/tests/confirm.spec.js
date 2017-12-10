import Vue from 'vue';
import { shallow, mount } from 'vue-test-utils'
import confirm from '@/components/confirm.vue'

describe("Confirm component", () => {
    let wrapper;

    const create = propsData => shallow(confirm, { propsData })

    beforeEach(() => {
        wrapper = create({
            message: 'Are you sure you want to delete this item?',
        })
    })

    it("Should call delete on click of delete button", () => {
        wrapper.vm.confirm = jest.fn();
        wrapper.findAll('button').at(1).trigger("click");

        expect(wrapper.vm.confirm).toBeCalled();
    })

    it("Should emit confirm on click delete button", () => {
        const stub = jest.fn();

        wrapper.vm.$on("confirm", stub);
        wrapper.vm.confirm(true);

        expect(stub).toBeCalledWith(true);
    })

    it("Should call cancel on click of cancel button", () => {
        wrapper.vm.cancel = jest.fn();
        wrapper.findAll('button').at(0).trigger("click");

        expect(wrapper.vm.cancel).toBeCalled();
    })

    it("Should emit cancel on click cancel button", () => {
        const stub = jest.fn();

        wrapper.vm.$on("cancel", stub);
        wrapper.vm.cancel(false);

        expect(stub).toBeCalledWith(false);
    })
})