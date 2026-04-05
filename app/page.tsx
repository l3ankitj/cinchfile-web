export default function Home() {
  return (
    <div className="bg-[#fcfcfd] overflow-hidden">
      {/* Background Decor - Makes it look 'Premium' */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-blue-50/50 via-transparent to-transparent -z-10" />

      <section className="relative pt-20 pb-32 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col items-center text-center">
          
          {/* Badge - Standard for US/UK SaaS */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-sm font-medium mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            Now live for US & UK Firms
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 mb-8 max-w-4xl">
            Collect client documents <br /> 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">without the friction.</span>
          </h1>

          <p className="text-lg md:text-xl text-slate-500 max-w-2xl mb-12 leading-relaxed">
            Eliminate "Portal Fatigue." Cinchfile gives your clients a secure, 
            <span className="text-slate-900 font-medium"> no-login link </span> 
            to upload sensitive files directly to your vault.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-20">
            <button className="px-8 py-4 bg-slate-900 text-white font-semibold rounded-xl hover:bg-slate-800 transition-all shadow-2xl shadow-slate-200">
              Start Free Trial
            </button>
            <button className="px-8 py-4 bg-white text-slate-600 font-semibold rounded-xl border border-slate-200 hover:bg-slate-50 transition-all">
              Watch 1-Min Demo
            </button>
          </div>

          {/* Product Mockup - This is what stops it from looking basic */}
          <div className="relative w-full max-w-5xl">
            <div className="rounded-2xl border border-slate-200 bg-white shadow-[0_32px_64px_-12px_rgba(0,0,0,0.1)] p-4 overflow-hidden">
               <div className="bg-slate-50 rounded-lg aspect-video flex items-center justify-center border border-slate-100 border-dashed">
                  <p className="text-slate-400 font-medium">[ Video or High-Res Dashboard Screenshot Here ]</p>
               </div>
            </div>
            {/* Floating 'Trust' Card */}
            <div className="absolute -bottom-6 -right-6 hidden lg:block bg-white p-6 rounded-2xl shadow-xl border border-slate-100 max-w-xs text-left">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-green-100 rounded-lg text-green-600">🛡️</div>
                <p className="font-bold text-slate-900">Bank-Grade</p>
              </div>
              <p className="text-sm text-slate-500">All files are encrypted with AES-256 before they even hit our servers.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Modern Logo Cloud */}
      <section className="bg-white py-16 border-y border-slate-100">
         <div className="max-w-7xl mx-auto px-6">
            <p className="text-center text-sm font-semibold text-slate-400 uppercase tracking-widest mb-12">Security Compliant With</p>
            <div className="flex flex-wrap justify-center gap-x-16 gap-y-8 opacity-40 grayscale font-bold text-2xl text-slate-900">
              <span>GDPR</span>
              <span>CCPA</span>
              <span>ISO 27001</span>
              <span>SOC2</span>
            </div>
         </div>
      </section>
    </div>
  );
}