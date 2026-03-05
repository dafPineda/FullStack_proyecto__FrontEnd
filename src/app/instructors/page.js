'use client';
import { getToken } from '@/lib/auth';
import { getInstructors } from "../utils/api/getInstructors"
import { useState, useEffect } from 'react';
import Link from 'next/link';
import {jwtDecode} from 'jwt-decode';
import { DeleteInstructor } from '../utils/api/deleteInstructor';

export default function Instructors(){
    const [instructors, setInstructors] = useState([])
    const [role, setRole] = useState(null);

    useEffect(() => {
        const fetchInstructors = async () => {
            try {
                const data = await getInstructors();
                setInstructors(data);
            } catch (error) {
                console.error("Error al obtener instructores:", error);
            }
        };
        fetchInstructors();

        const token = getToken();

        if (token) {
            const decoded = jwtDecode(token);
            setRole(decoded.role); 
        }
    }, []);

    const handleDelete = async (id) => {
        try {
            await DeleteInstructor(id);
            setInstructors(prev => prev.filter(i => i.id !== id));
        } catch (error) {
            console.error("Error deleting instructor", error);
        }
        };
    return(
        <main className="min-h-screen bg-gray-100 p-10">
            <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-md">

                <h1 className="text-10xl font-bold mb-6 text-gray-800">
                    Instructors
                </h1>

                <div className="flex justify-between items-center mb-6">
                    <p className="text-gray-600 mr-auto">
                        Total de instructores: <span className="font-semibold ml-2">{instructors.length}</span>
                    </p>

                    {role === "admin" && (
                        <Link href="/instructors/Create">
                            <button className="cursor-pointer border bg-blue-600 hover:bg-blue-700  text-white px-4 py-2 rounded-lg transition">
                                Crear instructor
                            </button>
                        </Link>
                    )}
                </div>

                {instructors.length === 0 && (
                    <p className="text-gray-500 text-center">
                        No hay instructores
                    </p>
                )}

                <ul className=" p-10 space-y-4">
                    {instructors.map((instructor) => (
                        <li 
                            key={instructor.id} 
                            className="bg-gray-50 border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition"
                        >
                            <div className="flex justify-between items-center">

                                <div>
                                    <p className="font-semibold text-gray-800">
                                        {instructor.name}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        ID: {instructor.id}
                                    </p>
                                    <p className="text-sm text-gray-400">
                                        Turno: {instructor.turn}
                                    </p>
                                </div>

                                {role === "admin" && (
                                    <div className='flex flex-col'>
                                     <Link 
                                        href={`/instructors/${instructor.id}`}
                                        className="text-blue-600 hover:underline text-sm "
                                    >
                                        Ver detalles
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(instructor.id)}
                                        className='cursor-pointer text-white bg-red-700 border-'
                                    >Borrar</button>
                                    </div>
                                )}
                            </div>
                        </li>
                    ))}
                </ul>

            </div>
        </main>
    );
}