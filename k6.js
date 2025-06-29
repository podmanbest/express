import http from 'k6/http';
import { check } from 'k6';

export let options = {
  stages: [
    {
      duration: '30s',
      target: 1000, // 3000 VU selama 30 detik
    },
  ],
};

export default function () {
  const res = http.get('http://localhost:5000/');
  check(res, {
    'status is 200': (r) => r.status === 200,
  });
}

// k6 run k6.js
