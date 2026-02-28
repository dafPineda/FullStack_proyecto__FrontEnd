import { API } from '@/config';

export default async function getInstructorId(id) {
  const res = await fetch(`${API}/instructors/${id}`);

  if (!res.ok) {
    throw new Error('Not Found Instructor');
  }
  return res.json();
}