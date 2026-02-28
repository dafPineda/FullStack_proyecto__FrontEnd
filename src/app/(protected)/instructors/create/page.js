'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { apiFetch } from '@/lib/api';
import { clearToken } from '@/lib/auth';
import StatusBox from '@/components/StatusBox';

export default async function create(){
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
      await apiFetch('/instructors/create', {
        method: 'POST',
        body: JSON.stringify({ 
            name: name.trim(), 
            phone: phone,
            mail: mail,
            turn: turn
        })
      });

      setSuccess('Instructor created');
      setNombre('');
      setPrecio('');
    } catch (error) {
      if (error.status === 403) {
        setError('Authorization is needed (Admin)');
        return;
      }
      if (error.status === 401) {
        clearToken();
        router.replace('/login');
        return;
      }
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }
return (
    <main className='flex flex-col'>
      <h1>Agregar instructor</h1>

      <form onSubmit={create}>
        <div>
          <input
            placeholder='*Name'
            value={name}
            onChange={(e)=>setName(e.target.value)}
          />
        </div>
        <div>
          <input
            placeholder='* Phone'
            value={phone}
            onChange={(e)=>setPhones(e.target.value)}
          />
        </div>
        <div>
          <input
            placeholder='* Email'
            value={mail}
            onChange={(e)=>setMail(e.target.value)}
          />
        </div>
        <div>
          <input
            placeholder='Turn (Matutino/Vespertino)'
            value={turn}
            onChange={(e)=>setTurn(e.target.value)}
          />
        </div>
        <button type="submit" disabled={loading}>{loading ? 'Adding...' : 'Add'}</button>
      </form>
      <StatusBox loading={loading} error={error} success={success} />
    </main>
  )
}
