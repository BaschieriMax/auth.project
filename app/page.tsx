export default function Home() {
  // const user = useAppSelector((state) => state.user.user);

  return (
    <div className="p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      {/* {user ? (
        <>
          <h1>Ciao, {user.full_name}!</h1>
          <p>Email: {user.email}</p>
          <p>Telefono: {user.phone}</p>
        </>
      ) : ( */}
      <p>Benvenuto! Effettua il login per vedere le info.</p>
      {/* )} */}
    </div>
  );
}
