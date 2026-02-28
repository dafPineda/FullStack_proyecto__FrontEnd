export default function StatusBox({ loading, error, success }) {
  if (loading) return <p className="p-2 bg-black text-white"> Procesando...</p>
  if (error) return <p className="p-2 bg-black text-red-700">❌ {error}</p>
  if (success) return <p className="p-2 bg-black text-green-500">✅ {success}</p>
  return null;
}