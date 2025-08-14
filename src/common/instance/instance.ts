import axios from 'axios';

const token = '2af30fbe-bab9-402b-b2a5-3125600f826e';
const apiKey = '0eb2706b-00ee-412b-ad11-dcbf500e19d9';

export const instance = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.1',
  headers: {
    Authorization: `Bearer ${token}`,
    'API-KEY': apiKey,
  },
});
