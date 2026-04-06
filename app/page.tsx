export default function Home() {
  return (
    <div className="bg-[#f8fafc] min-h-screen selection:bg-blue-100">
      {/* 1. THE BIG BRAND INTRO */}
      <section className="relative pt-32 pb-20 px-6">
        {/* Modern Background Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-blue-100/30 blur-[120px] rounded-full -z-10" />
        
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-slate-200 shadow-sm text-sm font-bold text-blue-600 mb-10">
            🛡️ Bank-Grade Security for Accounting Firms
          </div>

          <h1 className="text-7xl md:text-9xl font-black tracking-tighter text-slate-900 mb-4 opacity-90">
            Cinchfile<span className="text-blue-600">.</span>
          </h1>
          
          <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-800 mb-8 leading-tight">
            Document collection, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">completely friction-free.</span>
          </h2>

          <p className="text-xl text-slate-500 max-w-2xl mx-auto mb-12 leading-relaxed">
            Replace complex portals with secure, <span className="text-slate-900 font-bold">no-login "Magic Links."</span> 
            Your clients upload in seconds. You get organized in one place.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="w-full sm:w-auto px-10 py-5 bg-blue-600 text-white font-black rounded-2xl hover:bg-blue-700 hover:scale-105 transition-all shadow-xl shadow-blue-200">
              Get Started — Free
            </button>
            <button className="w-full sm:w-auto px-10 py-5 bg-white text-slate-900 font-bold rounded-2xl border-2 border-slate-200 hover:border-slate-300 transition-all">
              See the Demo
            </button>
          </div>
        </div>
      </section>

      {/* 2. THE "BENTO" FEATURE GRID (Modern UI Secret) */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="md:col-span-2 bg-white p-10 rounded-[2.5rem] border border-slate-200 shadow-sm hover:shadow-md transition-all">
            <div className="bg-blue-50 w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-6">🔗</div>
            <h3 className="text-2xl font-bold mb-4">The Magic Link System</h3>
            <p className="text-slate-500 text-lg">Send a link. Client drops files. No accounts, no passwords, no support tickets for "I forgot my login."</p>
          </div>
          
          {/* Card 2 */}
          <div className="bg-slate-900 p-10 rounded-[2.5rem] text-white shadow-2xl">
            <div className="bg-white/10 w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-6">🔒</div>
            <h3 className="text-2xl font-bold mb-4">AES-256 Vault</h3>
            <p className="text-slate-400">Military-grade encryption for every single document. GDPR & CCPA compliant by design.</p>
          </div>
        </div>
      </section>
    </div>
  );
}