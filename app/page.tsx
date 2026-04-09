import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col gap-20 pb-20">
      <section className="pt-20 px-6 text-center max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-600 text-xs font-bold mb-8">
          <span aria-hidden>🛡️</span>
          <span>TLS encryption in transit</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-slate-900 mb-6 leading-[1.1]">
          Stop chasing <br />
          <span className="text-blue-600">missing attachments.</span>
        </h1>

        <p className="text-lg md:text-xl text-slate-500 mb-10 leading-relaxed">
          Cinchfile gives your clients a simple upload link—no client login, no
          portal fatigue. You manage requests from one dashboard.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            href="mailto:ankit@cinchfile.com?subject=Cinchfile%20early%20access"
            className="inline-flex items-center justify-center px-8 py-4 bg-slate-900 text-white font-bold rounded-xl hover:bg-blue-600 transition-all shadow-xl focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-blue-600"
          >
            Request early access
          </Link>
          <Link
            href="/login"
            className="inline-flex items-center justify-center px-8 py-4 bg-slate-100 text-slate-700 font-bold rounded-xl hover:bg-slate-200 transition-all border border-slate-200 focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-slate-400"
          >
            Firm sign in
          </Link>
        </div>
      </section>

      <section className="px-6 max-w-6xl mx-auto w-full">
        <div className="bg-white rounded-[2.5rem] border border-slate-200 p-8 shadow-[0_20px_50px_rgba(0,0,0,0.05)]">
          <h2 className="text-2xl font-bold text-center mb-4">
            One dashboard for upload links
          </h2>
          <p className="text-slate-500 text-center max-w-xl mx-auto mb-8 text-sm leading-relaxed">
            Create a request, share the link, and download files from the app
            when clients are done. Links can expire automatically; each completed
            round uses a fresh link for the next batch.
          </p>
          <div className="aspect-[16/10] bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-center p-8">
            <div className="text-center text-slate-400 max-w-sm">
              <div className="mx-auto mb-4 relative w-16 h-16">
                <Image
                  src="/logo.png"
                  alt=""
                  width={64}
                  height={64}
                  className="object-contain mx-auto opacity-80"
                />
              </div>
              <p className="font-medium text-slate-500">
                Screenshot: open your live admin after sign-in
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 max-w-6xl mx-auto w-full grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-10 rounded-[2rem] border border-slate-200 shadow-sm hover:shadow-md transition-all">
          <div className="flex gap-4 mb-6">
            <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-2xl border border-slate-100">
              <span aria-hidden>🛡️</span>
            </div>
            <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center border border-slate-100 overflow-hidden p-2 relative">
              <Image src="/logo.png" alt="" width={40} height={40} className="object-contain" />
            </div>
          </div>
          <h3 className="text-2xl font-bold mb-4">Protected transfer</h3>
          <p className="text-slate-500 leading-relaxed">
            Browser traffic uses HTTPS (TLS). Files are stored in your Supabase
            project; access is limited to your signed-in account and time-limited
            download links.
          </p>
        </div>

        <div className="bg-white p-10 rounded-[2rem] border border-slate-200 shadow-sm hover:shadow-md transition-all">
          <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-2xl mb-6 border border-slate-100">
            <span aria-hidden>📤</span>
          </div>
          <h3 className="text-2xl font-bold mb-4">Low friction</h3>
          <p className="text-slate-500 leading-relaxed">
            Clients open the link and upload—no accounts on their side. You stay
            in control of who gets a link and when it expires.
          </p>
        </div>

        <div className="bg-white p-10 rounded-[2rem] border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-center">
          <h3 className="text-xl font-bold mb-3 text-center">Data handling</h3>
          <p className="text-slate-500 text-sm leading-relaxed text-center">
            You are responsible for your professional obligations (e.g. IRS
            record retention, state board rules). Configure retention and backups
            in line with your practice and your Supabase project settings.
          </p>
        </div>
      </section>
    </div>
  );
}
