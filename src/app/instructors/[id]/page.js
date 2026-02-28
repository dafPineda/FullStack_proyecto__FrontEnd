import  getInstructorId  from '@/app/utils/api/getInstructorId'

export default async function Instructor({ params }) {
  const param = await params;
  const id = param.id;

  const instructor = await getInstructorId(id);
  return (
    <main>
      <h1>{instructor.id}: {instructor.name}</h1>
      <p>📞 {instructor.phone} </p>
      <p>📧 {instructor.mail} </p>
      <p>🕛 { instructor.turn}</p>
      <p> Active: {instructor.active ? "✅" : "❌"}</p>
    </main>
  );
}