import Axios from 'axios';

const token = localStorage.getItem('token');

export default Axios.create({
  headers: { Authorization: `${token}` },
});
