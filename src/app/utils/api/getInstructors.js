import { API } from '@/config';

export async function getInstructors() {
  
  const res = await fetch(`${API}/instructors`);
  if (!res.ok) {
    throw new Error('Error: Instructors are not visibles');
  }

  return res.json()
}