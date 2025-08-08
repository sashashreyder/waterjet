import { useState, useEffect } from 'react';

interface Submission {
  id: number;
  name: string;
  phone: string;
  email: string;
  message: string;
  source: string;
  submittedAt: string;
}

const AdminPanel = () => {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');

  useEffect(() => {
    loadSubmissions();
    
    // Refresh submissions every 2 seconds to catch new submissions
    const interval = setInterval(loadSubmissions, 2000);
    
    return () => clearInterval(interval);
  }, []);

  const loadSubmissions = () => {
    const data = JSON.parse(localStorage.getItem('contactSubmissions') || '[]');
    setSubmissions(data);
  };

  const clearAll = () => {
    if (window.confirm('Удалить все заявки?')) {
      localStorage.removeItem('contactSubmissions');
      setSubmissions([]);
    }
  };

  const deleteSubmission = (id: number) => {
    if (window.confirm('Удалить эту заявку?')) {
      const filtered = submissions.filter(s => s.id !== id);
      localStorage.setItem('contactSubmissions', JSON.stringify(filtered));
      setSubmissions(filtered);
    }
  };

  const handleLogin = () => {
    if (password === 'Admin2025!') {
      setIsAuthenticated(true);
      setPassword('');
    } else {
      alert('Неверный пароль');
      setPassword('');
    }
  };

  if (!isVisible) {
    return (
      <button
        onClick={() => {
          setIsVisible(true);
          loadSubmissions(); // Refresh when opening
        }}
        className="fixed bottom-4 left-4 bg-slate-400/20 text-slate-600 px-2 py-1 rounded text-xs hover:bg-slate-400/30 transition-colors opacity-30 hover:opacity-100"
      >
        • ({submissions.length})
      </button>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
          <h2 className="text-xl font-bold text-slate-800 mb-4 text-center">
            Вход в админ панель
          </h2>
          <div className="space-y-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Введите пароль"
              className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
              onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
            />
            <div className="flex gap-2">
              <button
                onClick={handleLogin}
                className="flex-1 bg-sky-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-sky-700 transition-colors"
              >
                Войти
              </button>
              <button
                onClick={() => setIsVisible(false)}
                className="flex-1 bg-slate-500 text-white py-3 px-6 rounded-lg font-medium hover:bg-slate-600 transition-colors"
              >
                Отмена
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[80vh] overflow-hidden">
        <div className="p-6 border-b border-slate-200 flex justify-between items-center">
          <h2 className="text-xl font-bold text-slate-800">
            Заявки ({submissions.length})
          </h2>
          <div className="flex gap-2">
            <button
              onClick={loadSubmissions}
              className="px-3 py-1 bg-sky-500 text-white rounded text-sm hover:bg-sky-600"
              title="Обновить"
            >
              🔄
            </button>
            <button
              onClick={clearAll}
              className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600"
            >
              Очистить все
            </button>
            <button
              onClick={() => {
                setIsVisible(false);
                setIsAuthenticated(false);
              }}
              className="px-3 py-1 bg-slate-500 text-white rounded text-sm hover:bg-slate-600"
            >
              Выйти
            </button>
          </div>
        </div>

        <div className="overflow-y-auto max-h-[60vh]">
          {submissions.length === 0 ? (
            <div className="p-8 text-center text-slate-500">
              Заявок пока нет
            </div>
          ) : (
            <div className="p-6">
              <div className="grid gap-4">
                {submissions.map((submission) => (
                  <div
                    key={submission.id}
                    className="border border-slate-200 rounded-lg p-4 hover:bg-slate-50"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold text-slate-800">
                            {submission.name}
                          </span>
                          <span className="text-slate-500 text-sm">
                            {new Date(submission.submittedAt).toLocaleString('ru-RU')}
                          </span>
                        </div>
                        <div className="text-slate-600 mb-1">
                          📞 {submission.phone}
                        </div>
                        {submission.email && (
                          <div className="text-slate-600 mb-1">
                            📧 {submission.email}
                          </div>
                        )}
                        {submission.message && (
                          <div className="text-slate-600 mb-2">
                            💬 {submission.message}
                          </div>
                        )}
                        <div className="text-xs text-slate-400">
                          Источник: {submission.source}
                        </div>
                      </div>
                      <button
                        onClick={() => deleteSubmission(submission.id)}
                        className="text-red-500 hover:text-red-700 text-sm"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
