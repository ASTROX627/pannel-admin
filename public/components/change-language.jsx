import usFlag from '@assets/images/us.png';
import faFlag from '@assets/images/fa.png';
import { useEffect, useRef, useState } from 'react';
import { useAppContext } from '../../src/contexts/app/app-context';

const ChangeLanguage = () => {
  const [show, setShow] = useState(false);
  const ref = useRef();

  const { language, changeLanguage } = useAppContext();

  useEffect(() => {
    setShow(false);
  }, [language])


  useEffect(() => {
    const checkIfClickOutside = event => {
      if (show && ref.current && !ref.current.contains(event.target)) {
        setShow(false);
      }
    }

    document.addEventListener('mousedown', checkIfClickOutside);
    return () => {
      document.removeEventListener('mousedown', checkIfClickOutside)
    }
  }, [show])

  return (
    <div className="dropdown">
      <a className="nav-flag dropdown-toggle" onClick={() => setShow(true)}>
        <img src={language === 'fa' ? faFlag : usFlag} alt='English' />
      </a>
      <div ref={ref} className={`dropdown-menu dropdown-menu-end ${show ? 'show' : undefined}`}
        style={{ textAlign: language === 'fa' ? 'right' : 'left' }}>
        <a className='dropdown-item fw-bolder px-1' onClick={() => changeLanguage('fa')}>
          <img className='mx-2' src={faFlag} width='20' />
          <span className='align-middle'>فارسی</span>
        </a>
        <a className='dropdown-item fw-bolder px-1' onClick={() => changeLanguage('en')}>
          <img className='mx-2' src={usFlag} width='20' />
          <span className='align-middle'>English</span>
        </a>
      </div>
    </div>
  )
}

export default ChangeLanguage;