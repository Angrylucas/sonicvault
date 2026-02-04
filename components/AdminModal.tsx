
import React, { useState, useEffect } from 'react';
import { X, Lock, Github, Upload, Check, Loader2, Save } from 'lucide-react';
import { SoundCategory } from '../types';
import { checkRepoAccess, getFileContent, updateFile, uploadFile, GitHubConfig } from '../utils/github';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

type Step = 'AUTH' | 'CONFIG' | 'UPLOAD' | 'PROCESSING' | 'SUCCESS';

export const AdminModal: React.FC<AdminModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [step, setStep] = useState<Step>('AUTH');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  // Config State
  const [ghConfig, setGhConfig] = useState<GitHubConfig>({
    token: '',
    owner: '',
    repo: ''
  });

  // Upload Form State
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<SoundCategory>(SoundCategory.UI);
  const [description, setDescription] = useState('');
  const [statusMsg, setStatusMsg] = useState('');

  useEffect(() => {
    if (isOpen) {
      // Reset state on open
      setStep('AUTH');
      setPassword('');
      setError('');
      setFile(null);
      setTitle('');
      setDescription('');
      
      // Load saved config
      const saved = localStorage.getItem('sonicvault_gh_config');
      if (saved) {
        setGhConfig(JSON.parse(saved));
      }
    }
  }, [isOpen]);

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'sounds') {
      // If config exists, go to upload, else config
      if (ghConfig.token && ghConfig.owner && ghConfig.repo) {
        setStep('UPLOAD');
      } else {
        setStep('CONFIG');
      }
      setError('');
    } else {
      setError('Incorrect password');
    }
  };

  const handleConfigSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMsg('Verifying access...');
    const isValid = await checkRepoAccess(ghConfig);
    
    if (isValid) {
      localStorage.setItem('sonicvault_gh_config', JSON.stringify(ghConfig));
      setStep('UPLOAD');
      setStatusMsg('');
    } else {
      setError('Could not access repository. Check credentials.');
    }
  };

  const calculateDuration = (file: File): Promise<string> => {
    return new Promise((resolve) => {
      const audio = new Audio(URL.createObjectURL(file));
      audio.onloadedmetadata = () => {
        const m = Math.floor(audio.duration / 60);
        const s = Math.floor(audio.duration % 60);
        resolve(`${m}:${s.toString().padStart(2, '0')}`);
      };
      audio.onerror = () => resolve('0:00');
    });
  };

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const result = reader.result as string;
        // Remove "data:audio/mpeg;base64," prefix
        const base64 = result.split(',')[1];
        resolve(base64);
      };
      reader.onerror = error => reject(error);
    });
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setStep('PROCESSING');
    setError('');

    try {
      // 1. Prepare Data
      setStatusMsg('Analyzing audio file...');
      const duration = await calculateDuration(file);
      const base64Content = await fileToBase64(file);
      const filename = file.name.replace(/\s+/g, '-').toLowerCase(); // sanitize filename
      const soundId = Date.now().toString();

      // 2. Upload Audio File
      setStatusMsg(`Uploading ${filename} to GitHub...`);
      await uploadFile(ghConfig, `public/sounds/${filename}`, base64Content, `Add sound: ${title}`);

      // 3. Update constants.ts
      setStatusMsg('Updating database (constants.ts)...');
      const { content: oldContent, sha } = await getFileContent(ghConfig, 'constants.ts');

      // Create new sound entry
      const newSoundEntry = `
  {
    id: '${soundId}',
    filename: '${filename}',
    title: '${title.replace(/'/g, "\\'")}',
    category: SoundCategory.${Object.keys(SoundCategory).find(k => SoundCategory[k as keyof typeof SoundCategory] === category) || 'MISC'},
    description: '${description.replace(/'/g, "\\'")}',
    duration: '${duration}'
  },`;

      // Inject into the array
      // Look for "export const SOUND_LIBRARY: Sound[] = ["
      const injectionPoint = 'export const SOUND_LIBRARY: Sound[] = [';
      if (!oldContent.includes(injectionPoint)) {
        throw new Error('Could not find SOUND_LIBRARY array in constants.ts');
      }

      const newContent = oldContent.replace(injectionPoint, injectionPoint + newSoundEntry);

      await updateFile(ghConfig, 'constants.ts', newContent, sha, `Register sound: ${title}`);

      setStep('SUCCESS');
      setStatusMsg('');
      
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Something went wrong during upload.');
      setStep('UPLOAD');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900">
          <h3 className="text-lg font-semibold text-white flex items-center gap-2">
            {step === 'AUTH' && <Lock className="w-4 h-4 text-primary-500" />}
            {step === 'CONFIG' && <Github className="w-4 h-4 text-primary-500" />}
            {(step === 'UPLOAD' || step === 'PROCESSING') && <Upload className="w-4 h-4 text-primary-500" />}
            {step === 'SUCCESS' && <Check className="w-4 h-4 text-green-500" />}
            
            {step === 'AUTH' && 'Admin Access'}
            {step === 'CONFIG' && 'GitHub Configuration'}
            {step === 'UPLOAD' && 'Upload New Sound'}
            {step === 'PROCESSING' && 'Uploading...'}
            {step === 'SUCCESS' && 'Upload Complete'}
          </h3>
          <button onClick={onClose} className="text-slate-500 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto">
          {error && (
            <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
              {error}
            </div>
          )}

          {step === 'AUTH' && (
            <form onSubmit={handleAuth} className="space-y-4">
              <p className="text-sm text-slate-400">Enter the admin password to access the upload tools.</p>
              <div>
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full px-4 py-2 bg-slate-950 border border-slate-800 rounded-xl focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 text-white placeholder-slate-600"
                  autoFocus
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 bg-primary-600 hover:bg-primary-500 text-white rounded-xl font-medium transition-colors"
              >
                Unlock
              </button>
            </form>
          )}

          {step === 'CONFIG' && (
            <form onSubmit={handleConfigSave} className="space-y-4">
              <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg text-blue-300 text-xs">
                 To upload files, we need a GitHub Personal Access Token with 'repo' scope.
                 This is stored locally in your browser.
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">GitHub Username (Owner)</label>
                <input
                  type="text"
                  value={ghConfig.owner}
                  onChange={e => setGhConfig({...ghConfig, owner: e.target.value})}
                  className="w-full px-4 py-2 bg-slate-950 border border-slate-800 rounded-xl focus:outline-none focus:border-primary-500 text-white"
                  placeholder="e.g. johndoe"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Repository Name</label>
                <input
                  type="text"
                  value={ghConfig.repo}
                  onChange={e => setGhConfig({...ghConfig, repo: e.target.value})}
                  className="w-full px-4 py-2 bg-slate-950 border border-slate-800 rounded-xl focus:outline-none focus:border-primary-500 text-white"
                  placeholder="e.g. sonic-vault"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Personal Access Token</label>
                <input
                  type="password"
                  value={ghConfig.token}
                  onChange={e => setGhConfig({...ghConfig, token: e.target.value})}
                  className="w-full px-4 py-2 bg-slate-950 border border-slate-800 rounded-xl focus:outline-none focus:border-primary-500 text-white"
                  placeholder="ghp_xxxxxxxxxxxx"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 bg-primary-600 hover:bg-primary-500 text-white rounded-xl font-medium transition-colors flex items-center justify-center gap-2"
              >
                <Save className="w-4 h-4" /> Save & Continue
              </button>
            </form>
          )}

          {step === 'UPLOAD' && (
            <form onSubmit={handleUpload} className="space-y-4">
              <div className="border-2 border-dashed border-slate-800 rounded-xl p-6 text-center hover:border-primary-500/50 transition-colors bg-slate-950/50">
                <input
                  type="file"
                  id="sound-file"
                  accept=".mp3,.wav,.ogg"
                  className="hidden"
                  onChange={e => setFile(e.target.files?.[0] || null)}
                />
                <label htmlFor="sound-file" className="cursor-pointer flex flex-col items-center gap-2">
                  <Upload className="w-8 h-8 text-slate-500" />
                  <span className="text-sm font-medium text-slate-300">
                    {file ? file.name : 'Click to select audio file'}
                  </span>
                  <span className="text-xs text-slate-500">MP3, WAV, or OGG</span>
                </label>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  className="w-full px-4 py-2 bg-slate-950 border border-slate-800 rounded-xl focus:outline-none focus:border-primary-500 text-white"
                  placeholder="e.g. Magic Chime"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Category</label>
                <select
                  value={category}
                  onChange={e => setCategory(e.target.value as SoundCategory)}
                  className="w-full px-4 py-2 bg-slate-950 border border-slate-800 rounded-xl focus:outline-none focus:border-primary-500 text-white"
                >
                  {Object.values(SoundCategory).map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Description</label>
                <textarea
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  rows={2}
                  className="w-full px-4 py-2 bg-slate-950 border border-slate-800 rounded-xl focus:outline-none focus:border-primary-500 text-white resize-none"
                  placeholder="Briefly describe the sound..."
                  required
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setStep('CONFIG')}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-sm font-medium transition-colors"
                >
                  Config
                </button>
                <button
                  type="submit"
                  disabled={!file}
                  className="flex-1 py-2 bg-primary-600 hover:bg-primary-500 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl font-medium transition-colors"
                >
                  Upload Sound
                </button>
              </div>
            </form>
          )}

          {step === 'PROCESSING' && (
            <div className="flex flex-col items-center justify-center py-8 text-center space-y-4">
              <Loader2 className="w-12 h-12 text-primary-500 animate-spin" />
              <div>
                <h4 className="text-white font-medium mb-1">Processing Upload</h4>
                <p className="text-slate-500 text-sm">{statusMsg}</p>
              </div>
            </div>
          )}

          {step === 'SUCCESS' && (
            <div className="flex flex-col items-center justify-center py-6 text-center space-y-4">
              <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center border border-green-500/20">
                <Check className="w-8 h-8 text-green-500" />
              </div>
              <div>
                <h4 className="text-white font-medium mb-2">Upload Successful!</h4>
                <p className="text-slate-400 text-sm max-w-xs mx-auto mb-6">
                  The file has been added to the repository. Your site will automatically redeploy in a few minutes to show the new sound.
                </p>
                <button
                  onClick={() => {
                    setStep('UPLOAD');
                    setFile(null);
                    setTitle('');
                    setDescription('');
                  }}
                  className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-medium transition-colors"
                >
                  Upload Another
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
