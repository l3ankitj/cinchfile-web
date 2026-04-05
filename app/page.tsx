export default function Home() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="px-6 py-24 lg:py-32 max-w-7xl mx-auto flex flex-col items-center text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 mb-6">
          Stop Chasing <span className="text-blue-600">Missing Attachments.</span>
        </h1>
        <p className="text-xl text-slate-600 max-w-2xl mb-10 leading-relaxed">
          The secure, no-login document portal for US & UK Accountants. 
          Collect sensitive files from clients via a private "Magic Link"—no passwords, no friction, just bank-grade security.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <a href="mailto:ankit@cinchfile.com?subject=Early Access" 
             className="px-8 py-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-all shadow-lg shadow-blue-200">
            Get Early Access ($39/mo)
          </a>
          <a href="#how-it-works" 
             className="px-8 py-4 bg-white text-slate-900 font-bold rounded-lg border border-slate-200 hover:border-slate-300 transition-all">
            See How it Works
          </a>
        </div>

        {/* Trust Badge Section */}
        <div className="mt-20 pt-10 border-t border-slate-100 w-full">
          <p className="text-sm font-semibold uppercase tracking-widest text-slate-400 mb-8">
            Security & Compliance
          </p>
          <div className="flex flex-wrap justify-center gap-8 opacity-60 grayscale">
             {/* We use text here to represent logos of security standards */}
             <span className="font-bold text-lg">AES-256 Encrypted</span>
             <span className="font-bold text-lg">GDPR Compliant</span>
             <span className="font-bold text-lg">CCPA Ready</span>
             <span className="font-bold text-lg">SSL Secured</span>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section id="how-it-works" className="bg-slate-50 py-24 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12">
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-xl">1</div>
            <h3 className="text-xl font-bold mb-2">Generate Link</h3>
            <p className="text-slate-600">Create a unique, private link for your client in 2 seconds.</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-xl">2</div>
            <h3 className="text-xl font-bold mb-2">Client Uploads</h3>
            <p className="text-slate-600">They tap the link and drop files. No login, no password, no friction.</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-xl">3</div>
            <h3 className="text-xl font-bold mb-2">Instant Notify</h3>
            <p className="text-slate-600">Files land in your encrypted vault. You get an email. Done.</p>
          </div>
        </div>
      </section>
    </div>
  );
}