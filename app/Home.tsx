"use client"
import Image from 'next/image';
import { useEffect, useState } from 'react';
import SingInComponent from './SingInComponent';

const Home = () => {

    const [login, setLogin] = useState(false)
    const [User, setUser] = useState(null);
    const [ModalCambiosPass, setModalCambiosPass] = useState(false as boolean);
    const [currentImage, setCurrentImage] = useState(0);

    const images = ['1.webp', '2.webp', '3.webp', '4.webp'];

    const nextSlide = () => { setCurrentImage((prevIndex) => (prevIndex + 1) % images.length); };
    const prevSlide = () => { setCurrentImage((prevIndex) => prevIndex === 0 ? images.length - 1 : prevIndex - 1) };

    useEffect(() => { if (login) { setLogin(true) } }, [login]);
    useEffect(() => { if (User || localStorage?.usu_rol) { setUser(User || localStorage?.usu_rol) } }, [User]);

    useEffect(() => {
        const interval = setInterval(() => {
          nextSlide();
        }, 3500);
    
        return () => {
          clearInterval(interval);
        };
      }, [currentImage]);

    return (
        <>

            {login && (
                <SingInComponent
                    setUser={setUser}
                    setModalCambiosPass={setModalCambiosPass}
                />
            )}

            {!login && (
                <div className='bg-[#172744]'>

                    <header className='flex justify-around items-center bg-[#172744] h-24 text-white'>
                        <Image src="/escudoUniminuto30.webp" alt="logo" width={300} height={0} />
                        <nav className='flex gap-5'>
                            {/* <Link href="/" className='p-2'>Inicio</Link> */}
                            <div className='flex gap-2 p-2 bg-[#3D5C87] rounded-md'>
                                <div className='text-white cursor-pointer' onClick={() => setLogin(true)}>Inicio de sesión</div>
                                <Image src="/iconoWebmaster.webp" alt="logo" width={30} height={30} />
                            </div>

                        </nav>
                    </header>

                    <div className="App">
                        <div className="carousel-container">
                            <img
                                src={`/${images[currentImage]}`}
                                alt={`Imagen ${currentImage + 1}`}
                                className="carousel-image"
                            />
                            <button onClick={prevSlide} className="prev-button">
                                {'<'}
                            </button>
                            <button onClick={nextSlide} className="next-button">
                                {'>'}
                            </button>
                        </div>
                    </div>

                    <footer className='bg-[#172744] text-white text-center p-2'>
                        <p>Copyright © 2023 - UNIMINUTO
                            <br />
                            Diseñado por la empresa fabricante de Software Sistemas e Informática Ivorsnet S.A.S.</p>
                        <a href="https://www.sistemasivhorsnet.com/" target="_blank " rel="noopener">
                            <p className="text-white text-center font-semibold text-sm lg:text-base hover:text-[#dbdbdb]">http://sistemasivhorsnet.com</p>
                        </a>
                    </footer>

                </div>
            )}

        </>
    );
};

export default Home;
