'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface EmailLog {
  _id: string;
  recipient: string;
  sent_at: string;
}

export default function HomePage() {
  const [emailLogs, setEmailLogs] = useState<EmailLog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const apiUrl = process.env.NEXT_PUBLIC_SMTP_API_URL || 'http://localhost:3002/api';

  useEffect(() => {
    const fetchEmailLogs = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`${apiUrl}/emails`);
        if (!response.ok) throw new Error('Имэйл логууд татахад алдаа гарлаа');
        const data = await response.json();
        setEmailLogs(data);
        setError('');
      } catch (err: any) {
        setError(err.message || 'Имэйл логууд татахад алдаа гарлаа');
        console.error('Error fetching email logs:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEmailLogs();
  }, [apiUrl]);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      backgroundColor: '#f9fafb'
    }}>
      <Header />
      
      <main style={{
        flexGrow: 1,
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '1.5rem 1rem'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(1, 1fr)',
          gap: '2rem'
        }}>
          {/* Зүүн талд логууд */}
          <div>
            <div style={{
              backgroundColor: 'white',
              borderRadius: '0.5rem',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              padding: '1rem'
            }}>
              <h2 style={{
                fontSize: '1.25rem',
                fontWeight: '600',
                marginBottom: '1rem',
                paddingBottom: '0.5rem',
                borderBottom: '1px solid #e5e7eb'
              }}>
                Сүүлийн үеийн логууд
              </h2>
              
              {isLoading ? (
                <div style={{
                  padding: '1rem',
                  textAlign: 'center',
                  color: '#6b7280'
                }}>Уншиж байна...</div>
              ) : error ? (
                <div style={{
                  padding: '1rem',
                  textAlign: 'center',
                  color: '#ef4444'
                }}>{error}</div>
              ) : emailLogs.length > 0 ? (
                <ul style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.75rem'
                }}>
                  {emailLogs.slice(0, 5).map((log) => (
                    <li key={log._id} style={{
                      padding: '0.75rem',
                      borderRadius: '0.375rem',
                      backgroundColor: '#f3f4f6',
                      transition: 'background-color 0.2s'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#e5e7eb'}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#f3f4f6'}
                    >
                      <p style={{
                        fontWeight: '500',
                        color: '#1f2937',
                        wordBreak: 'break-word'
                      }}>{log.recipient}</p>
                      <p style={{
                        fontSize: '0.875rem',
                        color: '#6b7280',
                        marginTop: '0.25rem'
                      }}>
                        {new Date(log.sent_at).toLocaleString('mn-MN', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </li>
                  ))}
                </ul>
              ) : (
                <div style={{
                  padding: '1rem',
                  textAlign: 'center',
                  color: '#6b7280'
                }}>Бүртгэгдсэн имэйл байхгүй байна</div>
              )}
              
              <div style={{
                marginTop: '1rem',
                paddingTop: '0.5rem',
                borderTop: '1px solid #e5e7eb'
              }}>
                <Link 
                  href="/send-mail"
                  style={{
                    color: '#2563eb',
                    fontSize: '0.875rem',
                    display: 'flex',
                    alignItems: 'center',
                    textDecoration: 'none',
                    transition: 'color 0.2s'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.color = '#1d4ed8'}
                  onMouseOut={(e) => e.currentTarget.style.color = '#2563eb'}
                >
                  <span>Бүгдийг харах</span>
                  <svg xmlns="http://www.w3.org/2000/svg" style={{
                    height: '1rem',
                    width: '1rem',
                    marginLeft: '0.25rem'
                  }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
          
          {/* Баруун талд үндсэн агуулга */}
          <div>
            <div style={{
              backgroundColor: 'white',
              borderRadius: '0.5rem',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              padding: '2rem',
              textAlign: 'center'
            }}>
              <Image
                src="/next.svg"
                alt="Next.js Logo"
                width={180}
                height={37}
                priority
                style={{
                  margin: '0 auto',
                  marginBottom: '2rem'
                }}
              />
              
              <h1 style={{
                fontSize: '1.875rem',
                fontWeight: 'bold',
                color: '#1f2937',
                marginBottom: '1.5rem'
              }}>
                SMTP Имэйл Үйлчилгээнд тавтай морил!
              </h1>
              
              <p style={{
                fontSize: '1.125rem',
                color: '#4b5563',
                maxWidth: '36rem',
                margin: '0 auto',
                marginBottom: '2rem'
              }}>
                Энэхүү систем нь хялбар, хурдан имэйл илгээх боломжийг олгодог бөгөөд хэрэглэгчид имэйлийн түүхээ харах боломжтой.
              </p>
              
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem'
              }}>
                <Link 
                  href="/send-mail"
                  style={{
                    display: 'inline-block',
                    backgroundColor: '#2563eb',
                    color: 'white',
                    fontWeight: '500',
                    padding: '0.75rem 1.5rem',
                    borderRadius: '0.375rem',
                    textDecoration: 'none',
                    transition: 'background-color 0.2s'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#1d4ed8'}
                  onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#2563eb'}
                >
                  Имэйл Илгээх
                </Link>
                
                <a 
                  href="#tutorial"
                  style={{
                    display: 'inline-block',
                    backgroundColor: '#e5e7eb',
                    color: '#1f2937',
                    fontWeight: '500',
                    padding: '0.75rem 1.5rem',
                    borderRadius: '0.375rem',
                    textDecoration: 'none',
                    transition: 'background-color 0.2s'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#d1d5db'}
                  onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#e5e7eb'}
                >
                  Заавар Харах
                </a>
              </div>
            </div>
            
            {/* Нэмэлт мэдээллийн хэсэг */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(1, 1fr)',
              gap: '1.5rem',
              marginTop: '2rem'
            }}>
              <div style={{
                backgroundColor: 'white',
                borderRadius: '0.5rem',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                padding: '1.5rem'
              }}>
                <h2 style={{
                  fontSize: '1.25rem',
                  fontWeight: '600',
                  marginBottom: '0.75rem',
                  color: '#1f2937'
                }}>Хурдан илгээлт</h2>
                <p style={{
                  color: '#4b5563'
                }}>
                  Rich text editor ашиглан имэйлийг хурдан, хялбар бэлтгэж, илгээх боломжтой.
                </p>
              </div>
              
              <div style={{
                backgroundColor: 'white',
                borderRadius: '0.5rem',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                padding: '1.5rem'
              }}>
                <h2 style={{
                  fontSize: '1.25rem',
                  fontWeight: '600',
                  marginBottom: '0.75rem',
                  color: '#1f2937'
                }}>Бүртгэл хөтлөлт</h2>
                <p style={{
                  color: '#4b5563'
                }}>
                  Илгээсэн имэйлүүдийн түүхийг хадгалж, хэзээ хэнд илгээсэн зэрэг мэдээллийг харах боломжтой.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
