import Vue from "vue";
import VueResource from "vue-resource"

Vue.use(VueResource)

let requests = [
    {
        method: 'GET',
        url: 'orders',
        response: [
            {
                _id: "1",
                amount: 1000,
                created_at: new Date(),
                user: 2,
                items: [
                    {
                        name: "zalm",
                        category: "fish",
                        price: 1000,
                        quantity: 1
                    }
                ]
            }
        ]
    },
    {
        method: 'GET',
        url: 'users',
        response: [
            {
                _id: 2,
                email: "testuser@projectfish.nl",
                name: "luuk gruijs",
                role: "user",
                password: "test",
            },
            {
                _id: 3,
                email: "testadmin@projectfish.nl",
                name: "luuk gruijs",
                role: "admin",
                password: "test",
            }
        ]
    }
]

Vue.http.interceptors.unshift((request, next) => {
    let req = requests.find((item) => {
        return (request.method === item.method && request.url === item.url);
    });

    if (!req) {
        next(request.respondWith({status: 404, statusText: 'Not found!'}));
    } else {
      next(
        request.respondWith(
          req.response,
          {status: 200}
        )
      );
    }
 });

export default Vue;
