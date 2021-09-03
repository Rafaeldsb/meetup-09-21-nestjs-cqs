import axios from 'axios';

axios
  .get('http://localhost:3000/subscription')
  .then(({ data }) => console.log(data));
