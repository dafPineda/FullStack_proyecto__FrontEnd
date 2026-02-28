import Link from "next/link";

export default function Home() {
  return (
   <div className="flex flex-col">
      <div 
      className="flex flex-col">
        <h1>Bienvenido a GYM-RAT del TecMilenio</h1>
        <Link href="/instructors"><button type="button" id="instructures"
        className="m-2 border w-60">Instructors</button></Link>
      </div>
  </div>
  );
}
