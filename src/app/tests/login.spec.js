
import { shallow } from 'vue-test-utils'
import Vue from 'vue'
import login from '@/components/login.vue'

describe("login component", () => {

    let wrapper;
    
    beforeEach(() => {
        wrapper = shallow(login)
    });

    it('Email and password is defined', () => {
        expect(typeof login.data).toBe('function')
        const data = login.data()

        expect(data.email).toBe("")
        expect(data.password).toBe("")
    })

    it('Calls login on click', () => {
        wrapper.vm.login = jest.fn();
        wrapper.find('.button').trigger('click');

        expect(wrapper.vm.login).toBeCalled()
    })

    it('Sets data properties on form input', () => {
        const email = wrapper.find("input[type='text']");
        email.element.value = 'testadmin@projectfish.nl';
        email.trigger('input')

        const password = wrapper.find("input[type='password']")
        password.element.value = 'test'
        password.trigger('input');

        expect(wrapper.vm.email).toBe("testadmin@projectfish.nl")
        expect(wrapper.vm.password).toBe("test")
    })
})