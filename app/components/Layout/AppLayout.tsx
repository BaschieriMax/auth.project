import Header from "../Header";
import Sidebar from "../Sidebar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <div className="flex-1 bg-gray-50 overflow-y-auto">{children}</div>
      </div>
    </>
  );
}
