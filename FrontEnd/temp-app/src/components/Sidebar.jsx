import { useState } from 'react';
import axios from 'axios';
import { UploadCloud, FileText, CheckCircle2, AlertCircle } from 'lucide-react';
import { useApi } from '../context/ApiContext';

export default function Sidebar() {
  const { upload } = useApi();
  const [file, setFile]           = useState(null);
  const [uploading, setUploading] = useState(false);
  const [status, setStatus]       = useState(null); // 'success' | 'error'

  const handleFileChange = (e) => {
    setFile(e.target.files?.[0] ?? null);
    setStatus(null);
  };

  const handleUpload = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file); // Backend field name: "file"

    setUploading(true);
    setStatus(null);
    try {
      // POST /chat/upload — multipart/form-data
      await axios.post(upload, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setStatus('success');
      setFile(null);
    } catch {
      setStatus('error');
    } finally {
      setUploading(false);
    }
  };

  return (
    <aside
      className="w-64 h-full bg-primary flex flex-col p-6 gap-6 shrink-0"
      style={{ borderRight: '3px solid #1C293C' }}
    >
      {/* Title */}
      <div className="flex items-center gap-2">
        <UploadCloud size={22} strokeWidth={2.5} className="text-ink" />
        <h2 className="text-lg font-black uppercase tracking-widest text-ink">
          Upload Docs
        </h2>
      </div>

      {/* Drop zone / file picker */}
      <label
        className={`
          nb-border nb-shadow nb-hover nb-focus
          relative flex flex-col items-center justify-center gap-3
          bg-surface cursor-pointer p-6 text-center
          ${uploading ? 'opacity-50 pointer-events-none' : ''}
        `}
      >
        <FileText size={32} strokeWidth={2} className="text-secondary" />
        <span className="text-sm font-semibold text-ink">
          {file ? file.name : 'Click to choose PDF'}
        </span>
        <input
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
          disabled={uploading}
          className="absolute inset-0 opacity-0 cursor-pointer"
        />
      </label>

      {/* Upload button */}
      <button
        onClick={handleUpload}
        disabled={!file || uploading}
        className={`
          nb-border nb-shadow nb-hover nb-focus
          bg-secondary text-surface font-bold py-3 px-4
          uppercase tracking-wider text-sm
          disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none
        `}
      >
        {uploading ? 'Uploading…' : 'Upload Document'}
      </button>

      {/* Status messages */}
      {status === 'success' && (
        <div
          className="nb-border flex items-center gap-2 bg-success text-surface p-3 text-sm font-semibold"
          style={{ boxShadow: '3px 3px 0px 0px #1C293C' }}
        >
          <CheckCircle2 size={16} strokeWidth={2.5} />
          Uploaded successfully!
        </div>
      )}
      {status === 'error' && (
        <div
          className="nb-border flex items-center gap-2 bg-danger text-surface p-3 text-sm font-semibold"
          style={{ boxShadow: '3px 3px 0px 0px #1C293C' }}
        >
          <AlertCircle size={16} strokeWidth={2.5} />
          Upload failed. Try again.
        </div>
      )}
    </aside>
  );
}
