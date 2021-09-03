import axios from 'axios';

axios.post('http://localhost:3000/lead').then(({ data }) => console.log(data));
