
// mocks
const mock = () => {
    let storage = {};

    return {
      getItem: (key) => key in storage ? storage[key] : null,
      setItem: (key, value) => storage[key] = value || '',
      removeItem: (key) => delete storage[key],
      clear: () => storage = {},
    };
};
  
Object.defineProperty(window, 'localStorage', {value: mock()});
Object.defineProperty(window, 'sessionStorage', {value: mock()});


// populate sessionStorage with user object
const user = {
  _id: 5,
  email: "testadmin@projectfish.nl",
  name: "luuk gruijs",
  role: "admin",
  password: "test",
  token: 123,
}
window.sessionStorage.setItem('user', JSON.stringify(user))