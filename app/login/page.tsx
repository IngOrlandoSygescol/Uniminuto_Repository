"use client"

import { useState, useEffect } from 'react';
import BodyComponent from './BodyComponent';

const LoginPage = () => {

  const [User, setUser] = useState(null);
  const [ModalCambiosPass, setModalCambiosPass] = useState(false as boolean);

  useEffect(() => {
    if (User || localStorage?.usu_rol) {
      setUser(User || localStorage?.usu_rol);
    }
  }, [User]);

  return (
    <div>
      <BodyComponent
        setUser={setUser}
        setModalCambiosPass={setModalCambiosPass}
      />
    </div>
  );
};

export default LoginPage;