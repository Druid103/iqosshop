import React from 'react';
import { Link } from 'react-router-dom';

function NotFoundPage(): React.JSX.Element {
  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>Ошибка 404</h1>
      <p>Вы ввели неверный путь.</p>
      <p>Пожалуйста, проверьте адрес и попробуйте снова.</p>

      <img
        src="/publicd/orig.webp"
        alt="Not Found"
        style={{ maxWidth: '20%', height: 'auto', margin: '10px 0' }}
      />

      <div style={{ marginTop: '20px' }}>
        {' '}
        <Link to="/" style={{ textDecoration: 'none' }}>
          <button
            style={{
              backgroundColor: '#2196F3',
              color: 'white',
              padding: '10px 20px',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '16px',
            }}
          >
            На главную
          </button>
        </Link>
      </div>
    </div>
  );
}

export default NotFoundPage;
