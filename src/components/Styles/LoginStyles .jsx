
import React from 'react';

const LoginStyles = () => {
  return (
    <style>
      {`
        .login-container {
          background-image: url('https://reporteroescolar.unir.net/2018/wp-content/uploads/2018/02/League_of_Legends.png');
          background-size: cover;
          background-position: center;
          min-height: 100vh;
          display: flex;
          align-items: center;
        }

        .login-card {
          width: 600px;
          top:-106px;
          padding: 20px;
          background-color: rgba(255, 255, 255, 0.9);
          border-radius: 25px;
          
        }
      `}
    </style>
  );
};

export default LoginStyles;
