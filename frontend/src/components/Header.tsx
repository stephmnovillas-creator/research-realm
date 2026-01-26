import { GraduationCap } from "lucide-react";

export default function Header() {
  return (
    <header className="bg-[#7a9b76] text-white px-8 py-6 shadow-md z-10">
      <div className="flex items-center gap-3">
        <GraduationCap className="w-10 h-10 text-white" />
        <div>
          <h1 className="text-2xl font-bold tracking-wide">RESEARCH REALM</h1>
          <p className="text-sm text-green-100 font-light opacity-90">
            Cabatuan National Comprehensive High School
          </p>
        </div>
      </div>
    </header>
  );
}
