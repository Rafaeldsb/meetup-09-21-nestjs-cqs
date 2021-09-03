import axios from 'axios';

axios
  .post('http://localhost:3000/subscription')
  .then(({ data }) => console.log(data));
