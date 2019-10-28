import http from 'k6/http';
import { check, sleep } from 'k6'

export let options = {
    stages: [
        { duration: "20s", target: 40 },
        { duration: "20s", target: 60 },
        { duration: "20s", target: 0 },
    ],
    thresholds: {
        "http_req_duration": ["p(80)<150"]
    },
};

export default function() {
    let res = http.get("https://badgeuse-intelligente1.herokuapp.com/");
    check(res, {
        "status was 200": (r) => r.status === 200
    });
    sleep(1);
}