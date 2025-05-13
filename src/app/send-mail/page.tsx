'use client';

import { useState, useEffect, FormEvent } from 'react';
import dynamic from 'next/dynamic';
import 'react-quill-new/dist/quill.snow.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const ReactQuill = dynamic(() => import('react-quill-new'), {
  ssr: false,
  loading: () => <p className="py-4 text-center text-gray-500">Rich Text Editor ачааллаж байна...</p>,
}) as any;

interface EmailLog {
  _id: string;
  recipient: string;
  sent_at: string;
}

export default function SendMailPage() {
  const [recipient, setRecipient] = useState('');
  const [subject, setSubject] = useState('');
  const [editorHtml, setEditorHtml] = useState('');
  const [message, setMessage] = useState('');
  const [emailLogs, setEmailLogs] = useState<EmailLog[]>([]);
  const [isLoadingLogs, setIsLoadingLogs] = useState(true);
  const [isClient, setIsClient] = useState(false);

  const apiUrl = process.env.NEXT_PUBLIC_SMTP_API_URL || 'http://localhost:3002/api';

  useEffect(() => {
    setIsClient(true);
    fetchEmailLogs();
  }, []);

  const fetchEmailLogs = async () => {
    setIsLoadingLogs(true);
    try {
      const response = await fetch(`${apiUrl}/emails`);
      if (!response.ok) throw new Error('Имэйл лог татахад алдаа гарлаа');
      const data = await response.json();
      setEmailLogs(data);
    } catch (error: any) {
      setMessage(`Лог татах алдаа: ${error.message}`);
    } finally {
      setIsLoadingLogs(false);
    }
  };

  function handleEditorChange(html: string) {
    setEditorHtml(html);
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage('');

    if (!recipient || !subject || !editorHtml.trim()) {
      setMessage('Хүлээн авагч, гарчиг, болон имэйлийн агуулгыг бүрэн бөглөнө үү.');
      return;
    }

    try {
      const response = await fetch(`${apiUrl}/emails/send`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ to: recipient, subject, body: editorHtml }),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.message || 'Имэйл илгээхэд алдаа гарлаа');

      setMessage(result.message || 'Имэйл амжилттай илгээгдлээ!');
      setRecipient('');
      setSubject('');
      setEditorHtml('');
      fetchEmailLogs();
    } catch (error: any) {
      setMessage(`Алдаа: ${error.message}`);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Имэйл Илгээх</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Зүүн талд имэйл илгээх форм */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="recipient" className="block mb-2 font-medium text-gray-700">Хүлээн авагч:</label>
                  <input 
                    type="email" 
                    id="recipient" 
                    value={recipient} 
                    onChange={(e) => setRecipient(e.target.value)} 
                    required 
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="example@mail.com"
                  />
                </div>
                
                <div>
                  <label htmlFor="subject" className="block mb-2 font-medium text-gray-700">Гарчиг:</label>
                  <input 
                    type="text" 
                    id="subject" 
                    value={subject} 
                    onChange={(e) => setSubject(e.target.value)} 
                    required 
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Имэйлийн гарчиг"
                  />
                </div>
                
                <div>
                  <label htmlFor="content" className="block mb-2 font-medium text-gray-700">Имэйлийн агуулга:</label>
                  {isClient ? (
                    <ReactQuill
                      value={editorHtml}
                      onChange={handleEditorChange}
                      modules={{
                        toolbar: [
                          [{ 'header': [1, 2, 3, false] }],
                          ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                          [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
                          ['link', 'image'],
                          ['clean']
                        ],
                      }}
                      placeholder="Энд имэйлийнхээ агуулгыг бичнэ үү..."
                    />
                  ) : (
                    <div className="p-4 border border-gray-300 rounded-md bg-gray-50 text-center text-gray-500">
                      Rich Text Editor ачааллаж байна...
                    </div>
                  )}
                </div>
                
                {message && (
                  <div className={`p-4 rounded-md ${message.startsWith('Алдаа:') ? 'bg-red-100 text-red-700 border border-red-300' : 'bg-green-100 text-green-700 border border-green-300'}`}>
                    {message}
                  </div>
                )}
                
                <button 
                  type="submit" 
                  className="w-full py-3 px-6 text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Илгээх
                </button>
              </form>
            </div>
          </div>
          
          {/* Баруун талд имэйл логууд */}
          <div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4 pb-2 border-b border-gray-200">
                Бүртгэлтэй имэйлүүд
              </h2>
              
              {isLoadingLogs ? (
                <div className="py-4 text-center text-gray-500">Лог уншиж байна...</div>
              ) : emailLogs.length > 0 ? (
                <ul className="space-y-3">
                  {emailLogs.map((log) => (
                    <li key={log._id} className="p-3 rounded-md bg-gray-50 hover:bg-gray-100 transition-colors border border-gray-100">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium text-gray-800 break-words">{log.recipient}</p>
                          <p className="text-sm text-gray-500 mt-1">
                            {new Date(log.sent_at).toLocaleString('mn-MN', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </p>
                        </div>
                        <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                          Илгээгдсэн
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="py-4 text-center text-gray-500">Бүртгэлтэй имэйл олдсонгүй.</div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}