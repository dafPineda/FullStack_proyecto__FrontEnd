import NavBar from "./NavBar";

export default function AppShell({ children }) {
  return (
    <div>
    {<NavBar/>}
      <main>
        {children}
      </main>
      <footer className="mt-20">
        <p>By: Dafne Pineda 2026. ©Todos los derechos reservados</p>
        <p>IG: instagram...</p>
      </footer>
    </div>
  );
}