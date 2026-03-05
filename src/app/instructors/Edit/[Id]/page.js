'use client'
import editInstructor from "@/app/utils/api/editInstructore"
//import getInstructorId from "@/app/utils/api/getInstructorId";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { clearToken } from '@/lib/auth';
import StatusBox from '@/components/StatusBox';
import { useParams } from "next/navigation";

export default function EditPage(){
  const params = useParams()
  const id = params.Id
    const router = useRouter()
    const [name, setName] = useState('');
    const [phone, setPhones] = useState('');
    const [mail, setMail] = useState('');
    const [turn, setTurn] = useState('');

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

   /*  useEffect(()=> {
        const loadInstructor  = async()=>{
          try{
            const { id } = await params
            console.log("Hola",id)
            const data = await getInstructorId(id);
            setName(data.name);
            setPhones(data.phone);
            setMail(data.mail);
            setTurn(data.turn);
          }catch(err){
            console.error(err)
            setError(err.message)
          }
        }
        loadInstructor()
    },[params]) */

    function validate() {
        if (name!=="" && (!name.trim() || name.length < 2)) return 'Name is required';
        if (phone !=="" && (phone.length !== 10 || !/^\d{10}$/.test(phone))) return 'Phone must have 10 digits'
        if (mail !=="" && (typeof mail !== 'string' || !mail.includes('@')|| mail.length < 3 )) return 'Mail mus have 3 letters and @'
        if (turn !=="" && (turn !== null && (turn.toLowerCase() !== 'matutino' && turn.toLowerCase() !== 'vespertino'))) return 'Turn must be "Vespertino / Matutino"'
        return '';
    }
    const edit = async (id) => {
    setError('');
    setSuccess('');
    
    const isValid = validate();
    if (isValid) {
      setError(isValid);
      return;
    }
    
    setLoading(true);
    try {
      await  editInstructor(id, {name, phone, mail, turn});

      setSuccess('Instructor updated');
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
    return(
        <main className="flex justify-center items-center min-h-screen bg-gray-100">
          
          <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        
            <h1 className="text-2xl font-bold mb-6 text-center text-black">
              Editar instructor
            </h1>
        
            <form 
              onSubmit={(evt)=>{
                evt.preventDefault();
                edit(id)
              } }
              className="flex flex-col gap-4"
            >
              <input
                placeholder="Name"
                value={name}
                onChange={(e)=>setName(e.target.value)}
                className="border rounded-md p-2 w-full text-gray-600"
              />
        
              <input
                placeholder="Phone"
                value={phone}
                onChange={(e)=>setPhones(e.target.value)}
                className="border rounded-md p-2 w-full text-gray-600"
              />
        
              <input
                placeholder="Email"
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
                {loading ? "Editando..." : "Editar"}
              </button>
        
            </form>
        
            <div className="mt-4">
              <StatusBox loading={loading} error={error} success={success} />
            </div>
        
          </div>
        
        </main>
    )
}