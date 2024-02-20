import Formulario from "./Formulario"

const page = () => {
    return (
        <>
            <div className=" w-full mx-auto bg-[#070E54] text-center p-4 border-b-2 border-b-white">
                <h1 className="text-sm sm:text-[1.5rem] uppercase font-bold text-white place-self-center">Reporte General de estudiantes</h1>
            </div>
            <Formulario />
        </>

    )
}

export default page