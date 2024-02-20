import { Competencia } from "@/typings";
import React, { useEffect, useState } from "react";
import ModalAsignarDocente from "./ModalAsignarDocente";

type Props = {
  ShowModal: any;
  setMenu: React.Dispatch<React.SetStateAction<any>>;
  Asignacion: any;
  setCompetenciaGenerica: React.Dispatch<React.SetStateAction<any>>;
  setAsignacion: React.Dispatch<React.SetStateAction<any>>;
  CompetenciaGenerica: Competencia[];
  DocentesDb: any;
  setDocentesDb: React.Dispatch<React.SetStateAction<any>>;
  ValuesInfo: any;
};

const CompetenciasGenericas = ({
  ValuesInfo,
  ShowModal,
  setMenu,
  Asignacion,
  setAsignacion,
  setCompetenciaGenerica,
  CompetenciaGenerica,
  DocentesDb,
  setDocentesDb,
}: Props) => {
  
  const [ShowBotton, setShowBotton] = useState(false);

  useEffect(() => {
    const newArray = CompetenciaGenerica.filter((item: any) => item?.DocenteAsignado?.Id);
    setShowBotton(newArray.length === CompetenciaGenerica.length);
  }, [CompetenciaGenerica]);

  return (
    <>
      {Asignacion?.Show && (
        <ModalAsignarDocente
          ValuesInfo={ValuesInfo}
          Asignacion={Asignacion}
          setAsignacion={setAsignacion}
          setCompetenciaGenerica={setCompetenciaGenerica}
          setDocentesDb={setDocentesDb}
          DocentesDb={DocentesDb}
          CompetenciaGenerica={CompetenciaGenerica}
        />
      )}

      <section className="flex justify-center">
        <div className="w-[90%] grid grid-cols-2 gap-2 max-h-[80vh] overflow-y-auto ">
          {CompetenciaGenerica?.length > 0 ? (
            CompetenciaGenerica?.map((el: Competencia, index: number) => (
              <div
                key={el.Id}
                onClick={() => {
                  setAsignacion({ Show: true, Competencia: { ...el, index }, Docentes: DocentesDb } as any);
                }}
                className="mt-2 mb-8 p-2 w-[85%]  cursor-pointer hover:shadow-2xl hover:scale-105 border border-gray-200"
              >
                {ValuesInfo ? (
                  <>
                    <h4 className="px-2 text-xl font-bold text-navy-700 text-black">
                      {el?.Nombre} - {el?.Abreviatura}
                    </h4>
                    <p className="mt-2 px-2 text-base text-gray-600">
                      {ValuesInfo.NombreDocente1} {ValuesInfo.ApellidoDocente1}
                    </p>
                    <p className="mt-2 px-2 text-base text-gray-600">
                      Hora: {ValuesInfo.Hora} Minutos: {ValuesInfo.Minutos}
                    </p>
                  </>
                ) : (
                  <>
                    <h4 className="px-2 text-xl font-bold text-navy-700 text-black">
                      {el?.Nombre} - {el?.Abreviatura}
                    </h4>
                    <p className="mt-2 px-2 text-base text-gray-600">
                      {el?.DocenteAsignado?.Nombre} {el?.DocenteAsignado?.Apellidos}
                    </p>
                    <p className="mt-2 px-2 text-base text-gray-600">
                      Hora: {el?.Hora} Minutos: {el?.Minutos}
                    </p>
                  </>
                )}
              </div>
            ))
          ) : (
            <>No hay competencias Genéricas</>
          )}
        </div>
      </section>


      <div className="flex justify-around mt-3 gap-2">
        <button
          onClick={() => {
            setMenu({
              Docentes: false,
              Aprobacion: false,
              Estudiantes: true,
              Genericas: false,
              Especificas: false,
            });
          }}
          className="block w-full max-w-xs mx-auto bg-[#151a8b] hover:bg-blue-700 focus:bg-blue-700 text-white rounded-lg px-3 py-3 font-semibold"
        >
          Devolver
        </button>
        {ShowBotton && (
          <button
            onClick={() => {
              setMenu({
                Docentes: false,
                Aprobacion: false,
                Estudiantes: false,
                Genericas: false,
                Especificas: true,
              });
            }}
            className="block w-full max-w-xs mx-auto bg-[#151a8b] hover:bg-blue-700 focus:bg-blue-700 text-white rounded-lg px-3 py-3 font-semibold"
          >
            Siguiente
          </button>
        )}
      </div>

    </>
  );
};

export default CompetenciasGenericas;
