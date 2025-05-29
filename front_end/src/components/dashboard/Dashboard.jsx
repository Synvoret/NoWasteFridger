import axios from 'axios';
import { useEffect } from 'react'
import axiosInstance from '../../axiosinstance';

function Dashboard() {
  useEffect(() => {
    const fetchProtectedData = async () => {
      try {
        const response = await axiosInstance.get('/protected-view/');
      } catch (error) {
        console.error('Error fetching protected data:', error);
      }
    }

    fetchProtectedData();
  })
  return (
    <div className='text-light container'>Dashboard</div>
  )
}

export default Dashboard