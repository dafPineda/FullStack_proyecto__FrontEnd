import { API } from '@/config';
import { getToken } from '@/lib/auth';

export default async function editInstructor(id, data) {  
    const token = getToken()
    const res = await fetch(`${API}/instructors/${id}`, {
        method: 'PUT',
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(data)
    });
  if (!res.ok) {
    throw new Error('Not Found Instructor');
  }
  return res.json()

}