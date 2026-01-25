import { FolderOpen, GraduationCap } from 'lucide-react';

export function Sidebar() {
  return (
    <aside className="min-w-64 bg-[#7a9b76] text-white flex flex-col shadow-xl z-20">
      {/* Logo */}
      <div className="p-8 border-b border-[#6a8b66]">
        <div className="flex items-center gap-3 mb-3">
          <GraduationCap className="w-10 h-10 text-white" />
          <span className="text-xl font-bold tracking-wide leading-tight">RESEARCH REALM</span>
        </div>
        <p className="text-xs text-green-100 leading-relaxed font-light opacity-90">
          Archive of research papers from Cabatuan National Comprehensive High School
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-6 space-y-1">
        <button
          onClick={() => {
            console.log("Navigate to Archives");
          }}
          className={`w-full flex items-center gap-3 px-8 py-4 transition-all duration-200 border-l-4 cursur-pointer `}
        >
          <FolderOpen className="w-5 h-5" />
          <span className="font-medium tracking-wide">Archives</span>
        </button>
        
        {/* {userRole === 'teacher' && (
          <button
            onClick={() => onViewChange('add-archive')}
            className={`w-full flex items-center gap-3 px-8 py-4 transition-all duration-200 border-l-4 ${
              currentView === 'add-archive'
                ? 'bg-[#6a8b66] border-white text-white'
                : 'border-transparent hover:bg-[#6a8b66]/50 text-green-50'
            }`}
          >
            <PlusCircle className="w-5 h-5" />
            <span className="font-medium tracking-wide">Add Archive</span>
          </button>
        )} */}
      </nav>

      {/* Decorative bottom illustration area */}
      <div className="h-64 relative overflow-hidden opacity-20 pointer-events-none">
        {/** biome-ignore lint/a11y/noSvgWithoutTitle: o */}
        <svg viewBox="0 0 200 200" className="absolute bottom-0 left-0 w-full">
          <circle cx="0" cy="150" r="80" fill="#6a8b66" />
          <circle cx="50" cy="200" r="100" fill="#6a8b66" />
        </svg>
      </div>
    </aside>
  );
}
