export default function Home() {
  return (
    <div className="flex flex-col gap-20 pb-20">
      
      {/* --- HERO SECTION --- */}
      <section className="pt-20 px-6 text-center max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-600 text-xs font-bold mb-8">
          🛡️ Bank-Grade Security.
        </div>
        
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-slate-900 mb-6 leading-[1.1]">
          Stop Chasing <br />
          <span className="text-blue-600">Missing Attachments.</span>
        </h1>
        
        <p className="text-lg md:text-xl text-slate-500 mb-10 leading-relaxed">
          Eliminate "Portal Fatigue." Cinchfile gives your clients a secure, no-login 
          link to upload sensitive files directly to your vault.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button className="px-8 py-4 bg-slate-900 text-white font-bold rounded-xl hover:bg-blue-600 transition-all shadow-xl">
            Start Free Trial
          </button>
          <button className="px-8 py-4 bg-slate-100 text-slate-600 font-bold rounded-xl hover:bg-slate-200 transition-all border border-slate-200">
            Watch 1-Min Demo
          </button>
        </div>
      </section>

      {/* --- MAIN DASHBOARD / VIDEO BOX --- */}
      <section className="px-6 max-w-6xl mx-auto w-full">
        <div className="bg-white rounded-[2.5rem] border border-slate-200 p-8 shadow-[0_20px_50px_rgba(0,0,0,0.05)]">
          <h2 className="text-2xl font-bold text-center mb-8">Unified Dashboard for Magic Link Management</h2>
          <div className="aspect-video bg-slate-50 rounded-2xl border border-slate-100 border-dashed flex flex-col items-center justify-center text-slate-400">
            <div className="w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center mb-4">
               <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[12px] border-l-slate-900 border-b-[8px] border-b-transparent ml-1" />
            </div>
            <p className="font-medium">[ Video or High-Res Dashboard Screenshot Here ]</p>
          </div>
        </div>
      </section>

      {/* --- THE BENTO GRID --- */}
      <section className="px-6 max-w-6xl mx-auto w-full grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Card 1: Encryption */}
        <div className="bg-white p-10 rounded-[2rem] border border-slate-200 shadow-sm hover:shadow-md transition-all">
          <div className="flex gap-4 mb-6">
            <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-2xl border border-slate-100">🛡️</div>
            <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center border border-slate-100 overflow-hidden p-2">
              <img src="/logo.png" alt="Logo" className="object-contain" />
            </div>
          </div>
          <h3 className="text-2xl font-bold mb-4">Bank-Grade Encryption.</h3>
          <p className="text-slate-500 leading-relaxed">
            AES-256 secure links. <br />
            Zero client accounts.
          </p>
        </div>

        {/* Card 2: Automation */}
        <div className="bg-white p-10 rounded-[2rem] border border-slate-200 shadow-sm hover:shadow-md transition-all">
          <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-2xl mb-6 border border-slate-100">📤</div>
          <h3 className="text-2xl font-bold mb-4">Automation.</h3>
          <p className="text-slate-500 leading-relaxed">
            Zero friction for your clients. They click, they drop, you're done. No login, no support tickets.
          </p>
        </div>

        {/* Card 3: Compliance */}
        <div className="bg-white p-10 rounded-[2rem] border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-center">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="text-slate-400 font-bold text-lg">GDPR</div>
            <div className="text-slate-400 font-bold text-lg">CCPA</div>
            <div className="text-slate-400 font-bold text-lg">ISO 27001</div>
            <div className="text-slate-400 font-bold text-lg">SOC2</div>
          </div>
          <div className="mt-8 text-center">
            <h3 className="text-xl font-bold mb-1">Security & Compliance.</h3>
            <p className="text-slate-500 text-sm font-semibold uppercase tracking-widest">US & UK Ready.</p>
          </div>
        </div>

      </section>

    </div>
  );
}