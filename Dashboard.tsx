import React, { useState } from 'react';
import { Terminal, Download, Shield, Network, Database, Bug, Key, Zap, Settings, LogOut, Search, Filter, User } from 'lucide-react';
import GlitchText from './GlitchText';

interface Tool {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: React.ReactNode;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  downloadUrl: string;
  downloads: number;
  rating: number;
}

interface DashboardProps {
  user: { 
    email: string; 
    phone: string; 
    displayName?: string;
    uid: string;
  };
  onLogout: () => void;
}

const tools: Tool[] = [
  {
    id: '1',
    name: 'NetworkScanner Pro',
    description: 'Advanced network reconnaissance and port scanning utility for security assessments',
    category: 'Network Security',
    icon: <Network className="w-6 h-6" />,
    difficulty: 'Intermediate',
    downloadUrl: '#',
    downloads: 15420,
    rating: 4.8
  },
  {
    id: '2',
    name: 'SQLi Detective',
    description: 'Comprehensive SQL injection vulnerability scanner and educational framework',
    category: 'Web Security',
    icon: <Database className="w-6 h-6" />,
    difficulty: 'Advanced',
    downloadUrl: '#',
    downloads: 8930,
    rating: 4.6
  },
  {
    id: '3',
    name: 'CryptoForge',
    description: 'Military-grade encryption and decryption toolkit for cybersecurity professionals',
    category: 'Cryptography',
    icon: <Key className="w-6 h-6" />,
    difficulty: 'Advanced',
    downloadUrl: '#',
    downloads: 12560,
    rating: 4.9
  },
  {
    id: '4',
    name: 'BugTracker Elite',
    description: 'Automated vulnerability discovery and exploitation framework',
    category: 'Penetration Testing',
    icon: <Bug className="w-6 h-6" />,
    difficulty: 'Advanced',
    downloadUrl: '#',
    downloads: 6780,
    rating: 4.7
  },
  {
    id: '5',
    name: 'SecureShell Pro',
    description: 'Enhanced SSH client with advanced security features and logging',
    category: 'System Security',
    icon: <Terminal className="w-6 h-6" />,
    difficulty: 'Beginner',
    downloadUrl: '#',
    downloads: 23450,
    rating: 4.5
  },
  {
    id: '6',
    name: 'PowerExploit Kit',
    description: 'Educational PowerShell exploitation framework for security training',
    category: 'Exploitation',
    icon: <Zap className="w-6 h-6" />,
    difficulty: 'Intermediate',
    downloads: 9870,
    rating: 4.4,
    downloadUrl: '#'
  }
];

const Dashboard: React.FC<DashboardProps> = ({ user, onLogout }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');

  const categories = ['All', ...Array.from(new Set(tools.map(tool => tool.category)))];
  const difficulties = ['All', 'Beginner', 'Intermediate', 'Advanced'];

  const filteredTools = tools.filter(tool => {
    const matchesSearch = tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tool.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || tool.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'All' || tool.difficulty === selectedDifficulty;
    
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'text-green-400';
      case 'Intermediate': return 'text-yellow-400';
      case 'Advanced': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const handleDownload = (tool: Tool) => {
    console.log(`Downloading ${tool.name}...`);
    alert(`Iniziando download di ${tool.name}\n\nIn un ambiente di produzione, questo scaricherebbe il tool reale.`);
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="bg-gray-900/50 backdrop-blur-lg border-b border-green-400/30 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Shield className="w-8 h-8 text-green-400 mr-3" />
              <h1 className="text-xl font-bold text-green-400 font-mono">
                <GlitchText text="CYBERSEC HUB" />
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-green-300 text-sm font-mono">
                <User className="w-4 h-4" />
                <span>{user.displayName || user.email}</span>
              </div>
              {user.phone && (
                <div className="text-green-400/60 text-xs font-mono">
                  📱 {user.phone}
                </div>
              )}
              <button
                onClick={onLogout}
                className="flex items-center space-x-2 bg-red-600/20 hover:bg-red-600/30 text-red-400 px-3 py-2 rounded border border-red-400/30 transition-colors font-mono text-sm"
              >
                <LogOut className="w-4 h-4" />
                <span>LOGOUT</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-green-900/20 to-blue-900/20 border border-green-400/30 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-green-400 mb-2 font-mono">
              <GlitchText text="BENVENUTO NEL SISTEMA" />
            </h2>
            <p className="text-green-300/80 font-mono mb-2">
              Accesso autorizzato a {tools.length} strumenti di cybersecurity professionali.
            </p>
            <div className="flex items-center space-x-4 text-sm font-mono">
              <span className="text-green-400">🔥 Firebase Auth: ATTIVO</span>
              <span className="text-green-400">📱 SMS Verificato: {user.phone ? 'SÌ' : 'NO'}</span>
              <span className="text-green-400">🔐 Connessione: SICURA</span>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Cerca strumenti e risorse..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-gray-900/50 border border-green-400/30 rounded px-12 py-3 text-green-300 placeholder-green-600 focus:outline-none focus:border-green-400 focus:shadow-lg focus:shadow-green-400/20 font-mono"
            />
          </div>

          <div className="flex flex-wrap gap-4">
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-green-400" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-gray-900/50 border border-green-400/30 rounded px-3 py-2 text-green-300 focus:outline-none focus:border-green-400 font-mono text-sm"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            <div>
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="bg-gray-900/50 border border-green-400/30 rounded px-3 py-2 text-green-300 focus:outline-none focus:border-green-400 font-mono text-sm"
              >
                {difficulties.map(difficulty => (
                  <option key={difficulty} value={difficulty}>{difficulty}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTools.map((tool) => (
            <div
              key={tool.id}
              className="bg-gray-900/50 backdrop-blur-lg border border-green-400/30 rounded-lg p-6 hover:border-green-400/50 transition-all duration-300 hover:shadow-lg hover:shadow-green-400/20 group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="text-green-400 group-hover:text-green-300 transition-colors">
                    {tool.icon}
                  </div>
                  <div>
                    <h3 className="text-green-400 font-bold font-mono">{tool.name}</h3>
                    <p className="text-green-600 text-xs font-mono">{tool.category}</p>
                  </div>
                </div>
                <span className={`text-xs font-mono px-2 py-1 rounded ${getDifficultyColor(tool.difficulty)} border border-current`}>
                  {tool.difficulty}
                </span>
              </div>

              <p className="text-green-300/80 text-sm font-mono mb-4 leading-relaxed">
                {tool.description}
              </p>

              <div className="flex items-center justify-between mb-4 text-xs font-mono">
                <span className="text-green-400">
                  ⭐ {tool.rating}/5.0
                </span>
                <span className="text-green-400">
                  📥 {tool.downloads.toLocaleString()}
                </span>
              </div>

              <button
                onClick={() => handleDownload(tool)}
                className="w-full bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 text-black font-bold py-2 px-4 rounded transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-green-400/50 font-mono flex items-center justify-center text-sm"
              >
                <Download className="w-4 h-4 mr-2" />
                DOWNLOAD
              </button>
            </div>
          ))}
        </div>

        {filteredTools.length === 0 && (
          <div className="text-center py-12">
            <Terminal className="w-16 h-16 text-green-400/50 mx-auto mb-4" />
            <p className="text-green-400/80 font-mono">Nessuno strumento trovato</p>
          </div>
        )}

        {/* Footer */}
        <footer className="mt-12 pt-8 border-t border-green-400/20">
          <div className="text-center">
            <p className="text-green-400/60 text-sm font-mono mb-2">
              🔐 Tutti gli strumenti sono per scopi educativi e test autorizzati
            </p>
            <p className="text-green-400/40 text-xs font-mono">
              Firebase Auth attivo • SMS verificato • Connessione crittografata
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default Dashboard;