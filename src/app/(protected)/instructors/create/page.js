'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { apiFetch } from '@/lib/api';
import { getToken, clearToken } from '@/lib/auth';
import StatusBox from '@/components/StatusBox';

export default function Create(){
  const router = useRouter();

  const [name, setName] = useState('');
  const [phone, setPhones] = useState('');
  const [mail, setMail] = useState('');
  const [turn, setTurn] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  function validate() {
    if (!name.trim() || name.length < 2) return 'Name is required';
    if (phone.length !== 10 || !/^\d{10}$/.test(phone)) return 'Phone must have 10 digits'
    if (typeof mail !== 'string' || !mail.includes('@')|| mail.length < 3 ) return 'Mail mus have 3 letters and @'
    if (turn !== null && (turn.toLowerCase() !== 'matutino' && turn.toLowerCase() !== 'vespertino')) return 'Turn must be "Vespertino / Matutino"'
    return '';
  }
  
  const create = async (evt) => {
    evt.preventDefault();
    setError('');
    setSuccess('');

    const isValid = validate();
    if (isValid) {
      setError(isValid);
      return;
    }

    setLoading(true);
    try {
      const token = getToken();
      await apiFetch('/instructors/create', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ 
            name: name.trim(), 
            phone: phone,
            mail: mail,
            turn: turn
        })
      });

      setSuccess('Instructor created');
      setName('');
      setMail('');
      setPhones('');
      setTurn('');
    } catch (error) {
      if (error.status === 403) {
        setError('Authorization is needed (Admin)');
        return;
      }
      if (error.status === 401) {
        clearToken()
        router.replace('/login');
        return;
      }
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }
return (

  <main className="flex justify-center items-center min-h-screen bg-gray-100">
  
  <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">

    <h1 className="text-2xl font-bold mb-6 text-center text-black">
      Agregar instructor
    </h1>

    <form 
      onSubmit={create}
      className="flex flex-col gap-4"
    >

      <input
        placeholder="*Name"
        value={name}
        onChange={(e)=>setName(e.target.value)}
        className="border rounded-md p-2 w-full text-gray-600"
      />

      <input
        placeholder="*Phone"
        value={phone}
        onChange={(e)=>setPhones(e.target.value)}
        className="border rounded-md p-2 w-full text-gray-600"
      />

      <input
        placeholder="*Email"
        value={mail}
        onChange={(e)=>setMail(e.target.value)}
        className="border rounded-md p-2 w-full text-gray-600"
      />

      <input
        placeholder="Turn (Matutino/Vespertino)"
        value={turn}
        onChange={(e)=>setTurn(e.target.value)}
        className="border rounded-md p-2 w-full text-gray-600"
      />

      <button
        type="submit"
        disabled={loading}
        className="border bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 cursor-pointer transition"
      >
        {loading ? "Agregando..." : "Agregar"}
      </button>

    </form>

    <div className="mt-4">
      <StatusBox loading={loading} error={error} success={success} />
    </div>

  </div>

</main>
  )
}
