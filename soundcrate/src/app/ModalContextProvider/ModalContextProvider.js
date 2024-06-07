'use client';

import { useContext, useState } from 'react';
import { ProtectedActionModal } from '@/components';
import ModalContext from './ModalContext';

export function ModalContextProvider({ children }) {
  const [ isOpen, setIsOpen ] = useState(false);
  const [ message, setMessage ] = useState(false);

  const value = {setIsOpen, setMessage};
  return (
    <ModalContext.Provider value={value}>
      <ProtectedActionModal isOpen={isOpen} setIsOpen={setIsOpen} message={message} />
      {children}
    </ModalContext.Provider>
  )
}

export function useModalContext() {
  return useContext(ModalContext);
}