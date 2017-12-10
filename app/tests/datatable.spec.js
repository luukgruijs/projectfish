import Vue from 'vue';
import { shallow, mount } from 'vue-test-utils'
import datatable from '@/components/datatable.vue'

describe("datatable component", () => {
    let wrapper;
    let data = [
        {
            name: 'test',
            email: 'test@test.nl',
            role: 'admin',
        }
    ]

    const create = propsData => shallow(datatable, { propsData })

    beforeEach(() => {
        wrapper = create({
            data,
            fields: [
                'name', 'email', 'role'
            ], 
            deleteable: true
        })
    })

    it("Should call rowClicked on click of row", () => {
        wrapper.vm.rowClicked = jest.fn();
        wrapper.find('td').trigger("click");

        expect(wrapper.vm.rowClicked).toBeCalled();
    })

    it("Should emit rowClicked on click", () => {
        const stub = jest.fn();

        wrapper.vm.$on("rowClicked", stub);
        wrapper.vm.rowClicked(data[0]);

        expect(stub).toBeCalledWith(data[0]);
    })

    it("Should call deleteClicked on click of deleteButton", () => {
        wrapper.vm.deleteClicked = jest.fn();
        wrapper.find('.close').trigger("click");

        expect(wrapper.vm.deleteClicked).toBeCalled();
    })

    it("Should emit deleteClicked on click", () => {
        const stub = jest.fn();

        wrapper.vm.$on("rowClicked", stub);
        wrapper.vm.rowClicked(data[0]);

        expect(stub).toBeCalledWith(data[0]);
    })
})