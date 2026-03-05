import getInstructorId from '@/app/utils/api/getInstructorId'
import { jwtDecode } from 'jwt-decode';
import { getToken } from '@/lib/auth';
import Link from 'next/link';

export default async function Instructor({ params }) {
  const { id } = await params
  const instructor = await getInstructorId(id)

   const token = getToken();
   let role = ""
    if (token) {
        const decoded = jwtDecode(token);
        role = decoded.role; 
    } 

  return (
    <main className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
        <div className='flex'>
          <h1 className="text-2xl text-black font-bold mb-6 border-b pb-2">
            Instructor #{instructor.id}
          </h1>
            <Link href={`/instructors/Edit/${instructor.id}`}>
              <button className='text-black border h-6 ml-auto'>&#9998;</button>
            </Link>
          {/* {role === "admin" &&(
          )} */}

        </div>
        <div className="flex flex-col gap-3 text-lg">
          <p className=' text-black'>
            <span className="font-semibold">Nombre:</span> {instructor.name}
          </p>
          <p className=' text-black'>
            <span className="font-semibold">📞 Teléfono:</span> {instructor.phone}
          </p>
          <p className=' text-black'>
            <span className="font-semibold">📧 Email:</span> {instructor.mail}
          </p>
          <p className='text-black'>
            <span className="font-semibold text-black">🕒 Turno:</span> {instructor.turn || "N/A"}
          </p>
          <p className="flex items-center gap-2">
            <span className="font-semibold  text-black">Estado:</span>
            {instructor.active ? (
              <span className="bg-green-500 text-white px-2 py-1 rounded text-sm">
                ✅Activo
              </span>
            ) : (
              <span className="bg-red-500 text-white px-2 py-1 rounded text-sm">
                ❌Inactivo
              </span>
            )}
          </p>

        </div>

      </div>

    </main>
  )
}