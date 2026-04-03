'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { 
  Lock, 
  Plus, 
  Copy, 
  Download, 
  LogOut, 
  ExternalLink, 
  CheckCircle2, 
  Clock 
} from 'lucide-react';

export default function AdminDashboard() {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [password, setPassword] = useState('');
  const [requests, setRequests] = useState<any[]>([]);
  const [clientName, setClientName] = useState('');
  const [firmName, setFirmName] = useState('');
  const [loading, setLoading] = useState(false);

  // 1. SECURITY CHECK (The "Founder Key")
  const handleLogin = (e: React.FormEvent) => {
  e.preventDefault();
  if (password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
    setIsAuthorized(true);
    localStorage.setItem('cinchfile_auth', 'true');
    setPassword(''); // Clear it now so it's empty when you eventually log out
  } else {
    alert('Incorrect Key');
    setPassword(''); // Clear it on failure too so they can try fresh
  }
};

  useEffect(() => {
    const auth = localStorage.getItem('cinchfile_auth');
    if (auth === 'true') setIsAuthorized(true);
  }, []);

  // 2. DATA ACTIONS
  const fetchRequests = async () => {
    const { data, error } = await supabase
      .from('upload_requests')
      .select('*')
      .order('created_at', { ascending: false });
    if (!error) setRequests(data);
  };

  useEffect(() => {
    if (isAuthorized) fetchRequests();
  }, [isAuthorized]);

  const createRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase
      .from('upload_requests')
      .insert([{ client_name: clientName, firm_name: firmName }]);
    
    if (!error) {
      setClientName('');
      setFirmName('');
      fetchRequests();
    }
    setLoading(false);
  };

  const copyLink = (id: string) => {
    const link = `${window.location.origin}/u/${id}`;
    navigator.clipboard.writeText(link);
    alert('Link Copied!');
  };

  const downloadFile = async (path: string) => {
    const { data, error } = await supabase.storage
      .from('client-uploads')
      .createSignedUrl(path, 60);
    if (data?.signedUrl) window.open(data.signedUrl, '_blank');
  };

  // --- VIEW A: THE LOCK SCREEN ---
  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8 border border-slate-100">
          <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center text-white mb-6">
            <Lock size={24} />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Founder Access</h1>
          <p className="text-slate-500 mb-8">Please enter your secret access key to manage Cinchfile.</p>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              placeholder="Enter Access Key"
              className="w-full px-5 py-4 rounded-2xl border-2 border-slate-100 focus:border-emerald-500 outline-none transition-all"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="w-full py-4 bg-slate-900 text-white font-bold rounded-2xl hover:bg-slate-800 transition-all">
              Unlock Dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }

  // --- VIEW B: THE DASHBOARD ---
  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        <header className="flex justify-between items-center mb-12">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center text-white font-bold text-xl">C</div>
            <h1 className="text-xl font-extrabold tracking-tight">Admin Dashboard</h1>
          </div>
          <button 
            onClick={() => { 
            localStorage.removeItem('cinchfile_auth'); 
                setIsAuthorized(false); 
                setPassword(''); // This clears the input box!
            }}
                    className="flex items-center gap-2 text-slate-400 hover:text-slate-600 font-semibold transition-colors"
                >
            <LogOut size={18} /> Sign Out
        </button>
        </header>

        <div className="grid md:grid-cols-3 gap-8">
          {/* CREATE FORM */}
          <div className="md:col-span-1">
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 sticky top-12">
              <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
                <Plus size={20} className="text-emerald-500" /> New Magic Link
              </h2>
              <form onSubmit={createRequest} className="space-y-4">
                <input
                  placeholder="Client Name"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-emerald-500 outline-none transition-all"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  required
                />
                <input
                  placeholder="Firm Name"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-emerald-500 outline-none transition-all"
                  value={firmName}
                  onChange={(e) => setFirmName(e.target.value)}
                  required
                />
                <button 
                  disabled={loading}
                  className="w-full py-3 bg-emerald-500 text-white font-bold rounded-xl hover:bg-emerald-600 transition-all disabled:opacity-50"
                >
                  {loading ? 'Generating...' : 'Generate Link'}
                </button>
              </form>
            </div>
          </div>

          {/* REQUESTS LIST */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-slate-50 border-bottom border-slate-100">
                  <tr>
                    <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Client / Firm</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {requests.map((req) => (
                    <tr key={req.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-5">
                        <div className="font-bold text-slate-900">{req.client_name}</div>
                        <div className="text-sm text-slate-400">{req.firm_name}</div>
                      </td>
                      <td className="px-6 py-5">
                        {req.status === 'completed' ? (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold">
                            <CheckCircle2 size={12} /> Completed
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 text-orange-700 text-xs font-bold">
                            <Clock size={12} /> Pending
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-5 text-right space-x-3">
                        <button 
                          onClick={() => copyLink(req.id)}
                          className="p-2 text-slate-400 hover:text-emerald-500 transition-colors"
                          title="Copy Link"
                        >
                          <Copy size={18} />
                        </button>
                        {req.file_path && (
                          <button 
                            onClick={() => downloadFile(req.file_path)}
                            className="p-2 text-slate-400 hover:text-blue-500 transition-colors"
                            title="Download File"
                          >
                            <Download size={18} />
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}