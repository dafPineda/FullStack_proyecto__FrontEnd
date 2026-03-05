import { API } from '@/config';
import { getToken } from '@/lib/auth';

export async function DeleteInstructor(id) {
  const token = getToken();
    const res = await fetch(`${API}/instructors/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${token}`
      }
    });
  if (!res.ok) {
    throw new Error('Error: Instructors are not visibles');
  }
}