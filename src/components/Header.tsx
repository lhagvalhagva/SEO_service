'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  return (
    <header style={{ 
      backgroundColor: 'white',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <div style={{ 
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0.75rem 1rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div style={{ 
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          <Image
            src="/next.svg"
            alt="SMTP Logo"
            width={120}
            height={30}
            priority
          />
          <h1 style={{ 
            fontSize: '1.25rem',
            fontWeight: 'bold',
            color: '#1f2937'
          }}>
            SMTP Имэйл Систем
          </h1>
        </div>
        
        <nav>
          <ul style={{ 
            display: 'flex',
            gap: '1.5rem'
          }}>
            <li>
              <Link href="/" style={{ 
                color: '#4b5563',
                textDecoration: 'none',
                transition: 'color 0.2s'
              }}
              onMouseOver={(e) => e.currentTarget.style.color = '#2563eb'}
              onMouseOut={(e) => e.currentTarget.style.color = '#4b5563'}
              >
                Нүүр
              </Link>
            </li>
            <li>
              <Link href="/send-mail" style={{ 
                color: '#4b5563',
                textDecoration: 'none',
                transition: 'color 0.2s'
              }}
              onMouseOver={(e) => e.currentTarget.style.color = '#2563eb'}
              onMouseOut={(e) => e.currentTarget.style.color = '#4b5563'}
              >
                Имэйл Илгээх
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
} 