import http from 'k6/http';
import { sleep, check } from 'k6';

export let options = {
  vus: 150,
  duration: '1m'
};

export default function() {
  var randomNumber = Math.floor(Math.random() * 9000000);

  var res = http.get(`http://localhost:3003/artist/${randomNumber}`);
  check(res, {
    'status was 200': r => r.status == 200,
    'transaction time OK': r => r.timings.duration < 200
  });

  sleep(1);
}
