import { getInstructors } from "../utils/api/getInstructors"
import Link from 'next/link';

export default async function Instructors(){
    const instructors = await getInstructors();
    return(
        <main>
            <h1>Instructors</h1>
            {instructors.length === 0 && <p>No hay instructores</p>}
            <p>Total de instructores: {instructors.length}</p>

            <ul className="list-disc">
                {instructors.map((instructor) => (
                    <li key={instructor.id} className="flex mt-3">
                        {instructor.name}
                        <div className="flex flex-col">
                        <span className="text-sm text-gray-400"> {instructor.phone}</span>
                        <span className="text-sm text-gray-400"> {instructor.mail}</span>
                        </div>
                        <Link href={`/instructors/${instructor.id}`}>Details</Link>
                    </li>
                ))}
            </ul>
        </main>
    );
}