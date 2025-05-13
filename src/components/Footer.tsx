'use client';

export default function Footer() {
  const year = new Date().getFullYear();
  
  return (
    <footer style={{ 
      backgroundColor: '#f3f4f6',
      marginTop: '2.5rem'
    }}>
      <div style={{ 
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '1rem',
      }}>
        <div style={{ 
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '0.75rem',
        }}>
          <p style={{ 
            color: '#4b5563',
            fontSize: '0.875rem'
          }}>
            &copy; {year} SMTP Имэйл Систем. Бүх эрх хуулиар хамгаалагдсан.
          </p>
          <div>
            <ul style={{ 
              display: 'flex',
              gap: '1rem'
            }}>
              <li>
                <a href="#" style={{ 
                  color: '#4b5563',
                  fontSize: '0.875rem',
                  textDecoration: 'none',
                  transition: 'color 0.2s'
                }}
                onMouseOver={(e) => e.currentTarget.style.color = '#2563eb'}
                onMouseOut={(e) => e.currentTarget.style.color = '#4b5563'}
                >
                  Тусламж
                </a>
              </li>
              <li>
                <a href="#" style={{ 
                  color: '#4b5563',
                  fontSize: '0.875rem',
                  textDecoration: 'none',
                  transition: 'color 0.2s'
                }}
                onMouseOver={(e) => e.currentTarget.style.color = '#2563eb'}
                onMouseOut={(e) => e.currentTarget.style.color = '#4b5563'}
                >
                  Үйлчилгээний нөхцөл
                </a>
              </li>
              <li>
                <a href="#" style={{ 
                  color: '#4b5563',
                  fontSize: '0.875rem',
                  textDecoration: 'none',
                  transition: 'color 0.2s'
                }}
                onMouseOver={(e) => e.currentTarget.style.color = '#2563eb'}
                onMouseOut={(e) => e.currentTarget.style.color = '#4b5563'}
                >
                  Нууцлалын бодлого
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
} 