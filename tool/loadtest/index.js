import http from 'k6/http';
const API_ENDPOINT = "http://localhost:4000/api"
// command interface : k6 run --vus 50 --iterations 500 app.js
export default function () {
    const url = API_ENDPOINT + "/service/service/list";
    //   const payload = JSON.stringify({
    //     email: 'johndoe@example.com',
    //     password: 'PASSWORD',
    //   });

    const params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    // http.post(url, payload, params);
    http.get(url, params)
}