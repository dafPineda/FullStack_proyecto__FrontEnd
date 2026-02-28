import Link from "next/link";

export default function Home() {
  return (
   <div className="flex flex-col">
      <div 
      className="flex flex-col">
        <h1>Bienvenido a GYM-RAT del TecMilenio</h1>
        <Link href="/instructors"><button type="button" id="instructures"
        className="m-2 border w-60">Instructors</button></Link>

          <button type="button" id="schudule" 
          className="m-2 border w-60">Horarios del instructor</button>
          <button type="button" id="rutines"
          className="m-2 border w-60">Rutinas</button>
          <button type="button" id="book"
          className="m-2 border w-60">Bitacora de alumnos</button>
          <button type="button" id="frequency"
          className="m-2 border w-60">Grafica de horarios</button>
          <button type="button" id="inventory"
          className="m-2 border w-60">Inventario</button>
      </div>
  </div>
  );
}
