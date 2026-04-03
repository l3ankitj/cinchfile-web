'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { Shield, Upload, CheckCircle, AlertCircle, FileText } from 'lucide-react';

export default function ClientPortal() {
  const params = useParams();
  const requestId = params.id as string;

  const [request, setRequest] = useState<any>(null);
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<'loading' | 'idle' | 'uploading' | 'success' | 'error'>('loading');

  // 1. FETCH THE REQUEST DETAILS
  useEffect(() => {
    const loadRequest = async () => {
      const { data, error } = await supabase
        .from('upload_requests')
        .select('*')
        .eq('id', requestId)
        .single();

      if (error || !data || data.status === 'completed') {
        setStatus('error');
      } else {
        setRequest(data);
        setStatus('idle');
      }
    };
    if (requestId) loadRequest();
  }, [requestId]);

  // 2. HANDLE THE UPLOAD
  const handleUpload = async () => {
    if (!file || !request) return;

    setStatus('uploading');
    const fileExt = file.name.split('.').pop();
    const fileName = `${request.id}/${Date.now()}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from('client-uploads')
      .upload(fileName, file);

    if (uploadError) {
      setStatus('idle');
      alert('Upload failed. Please try again.');
      return;
    }

    // Update database status
    await supabase
      .from('upload_requests')
      .update({ status: 'completed', file_path: fileName })
      .eq('id', request.id);

    setStatus('success');
  };

  if (status === 'loading') return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-400 font-medium animate-pulse">
      Establishing secure connection...
    </div>
  );

  if (status === 'error') return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
      <div className="bg-white p-8 rounded-3xl shadow-xl max-w-sm text-center border border-slate-100">
        <AlertCircle size={48} className="text-orange-500 mx-auto mb-4" />
        <h1 className="text-xl font-bold text-slate-900 mb-2">Link Invalid or Expired</h1>
        <p className="text-slate-500 mb-6 text-sm leading-relaxed">This document request has already been completed or the link has expired. Please contact your specialist for a new link.</p>
        <a href="/" className="text-emerald-500 font-bold hover:underline">Go to Cinchfile</a>
      </div>
    </div>
  );

  if (status === 'success') return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
      <div className="bg-white p-10 rounded-3xl shadow-xl max-w-md text-center border border-slate-100 animate-in fade-in zoom-in duration-500">
        <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle size={40} />
        </div>
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Transfer Complete</h1>
        <p className="text-slate-500 leading-relaxed">Your documents were encrypted and delivered successfully to <strong>{request.firm_name}</strong>. You can safely close this window.</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 selection:bg-emerald-100">
      <div className="w-full max-w-md bg-white p-8 rounded-[32px] shadow-2xl shadow-slate-200/50 border border-slate-100">
        {/* BRANDING */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-100">
            <Shield size={14} />
            <span>End-to-End Encrypted</span>
          </div>
        </div>

        <div className="text-center mb-8">
          <span className="text-xs font-bold text-emerald-500 uppercase tracking-widest block mb-2">{request.firm_name}</span>
          <h1 className="text-2xl font-extrabold text-slate-900">Hi {request.client_name},</h1>
          <p className="text-slate-500 text-sm mt-2">Please upload the requested documents below.</p>
        </div>

        {/* UPLOAD ZONE */}
        <div 
          onClick={() => document.getElementById('file-input')?.click()}
          className={`relative group cursor-pointer border-2 border-dashed rounded-2xl p-10 transition-all text-center
            ${file ? 'border-emerald-500 bg-emerald-50/30' : 'border-slate-200 hover:border-emerald-400 bg-slate-50/50'}`}
        >
          <input 
            type="file" 
            id="file-input" 
            className="hidden" 
            onChange={(e) => setFile(e.target.files?.[0] || null)}
          />
          
          <div className="flex flex-col items-center">
            {file ? (
              <>
                <FileText size={32} className="text-emerald-500 mb-3" />
                <span className="text-sm font-bold text-slate-900 truncate max-w-[200px]">{file.name}</span>
                <span className="text-xs text-emerald-600 mt-1">Ready to send</span>
              </>
            ) : (
              <>
                <Upload size={32} className="text-slate-300 group-hover:text-emerald-400 mb-3 transition-colors" />
                <span className="text-sm font-bold text-slate-600">Select your file</span>
                <span className="text-xs text-slate-400 mt-1">PDF, JPG, or PNG (Max 10MB)</span>
              </>
            )}
          </div>
        </div>

        <button
          onClick={handleUpload}
          disabled={!file || status === 'uploading'}
          className="w-full mt-8 py-4 bg-emerald-500 text-white font-bold rounded-2xl shadow-lg shadow-emerald-500/20 hover:bg-emerald-600 active:scale-[0.98] transition-all disabled:opacity-50 disabled:shadow-none"
        >
          {status === 'uploading' ? 'Encrypting & Sending...' : 'Upload Securely'}
        </button>

        <p className="text-center text-[10px] text-slate-400 mt-6 uppercase tracking-tighter font-bold">
          Powered by Cinchfile Security Stack
        </p>
      </div>
    </div>
  );
}