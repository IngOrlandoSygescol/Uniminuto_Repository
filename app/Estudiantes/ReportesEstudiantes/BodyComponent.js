"use client"
import React, { useEffect, useState } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import MyDocument from "./MyDocument";
import DocumentReporte from "../ReporteGeneral/DocumentReporte"
import { FaArrowCircleDown } from "react-icons/fa";
import { useSearchParams } from "next/navigation";
import ReactSelect from "react-select";
import Loading from "@/app/loading";

const BodyComponent = () => {
  const searchParams = useSearchParams();

  const [Data, setData] = useState({});
  const [IsLoading, setIsLoading] = useState(false);
  const [Values, setValues] = useState({});
  const [InfoPdf, setInfoPdf] = useState({});
  const [sedes, setSedes] = useState({});

  const getSubSedes = async () => {
    try {
      const SubSedes = await fetch("/api/Configuracion/SubSedes/GetAllSubSedes").then((res) => res.json());
      setSedes(SubSedes?.SubSedes || []);
    } catch (error) {
      console.error(error);
      alert("Error al obtener C.U");
    }
  };

  const GetData = async () => {
    setIsLoading(true);
    const SubSede = searchParams.get("SubSede");
    const IdRol = searchParams.get("IdRol");
    const IdUser = searchParams.get("IdUser");
    const Doc = searchParams.get("Doc");

    const Pruebas = await fetch(
      `/api/Estudiantes/GetPruebasReporte?SubSede=${SubSede}&IdRol=${IdRol}&IdUser=${IdUser}&Doc=${Doc}`
    ).then((res) => res.json());

    setData({ Prueba: Pruebas?.pruebas || [] });
    setIsLoading(false);
  };

  useEffect(() => {
    GetData();
    getSubSedes()
  }, []);

  useEffect(() => {

    if (Values?.IdPrueba && !Values?.Cu) {

      const GetInfoPdf = async () => {
        const SubSede = searchParams.get("SubSede");
        const IdRol = searchParams.get("IdRol");
        const IdUser = searchParams.get("IdUser");
        const Doc = searchParams.get("Doc");

        if (localStorage.usu_rol === '3') {
          const Info = await fetch(
            `/api/Estudiantes/ReportesPdf/InfoEstuPrueba?SubSede=${SubSede}&IdRol=${IdRol}&IdUser=${IdUser}&Doc=${Doc}&IdPrueba=${Values.IdPrueba}`
          ).then((res) => res.json());
          setInfoPdf({ ...Info });

        } else {
          const Info = await fetch(`/api/Estudiantes/ReportesPdf/InfoGeneralPrueba?IdPrueba=${Values.IdPrueba}`).then((res) => res.json());
          console.log(Info);
          setInfoPdf({ ...Info });
        }

      };

      GetInfoPdf();
      setValues({})

    } else if (Values?.IdPrueba && Values?.Cu) {

      fetch(`/api/Estudiantes/ReportesPdf/infoGeneralCu?IdPrueba=${Values.IdPrueba}&Cu=${Values?.Cu}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.body == 'Los estudiantes de esta CU no han presentado las pruebas.') {
            alert(data.body)
          } else {
            setInfoPdf({ ...data, Cu: Values?.Cu });
          }
          setValues({})
        })
        .catch((error) => {
          console.error('Error al realizar la solicitud:', error);
        });

    }

  }, [Values.IdPrueba]);

  return (
    <>

      <div className="md:w-[60%] lg:w-[40%] flex flex-col justify-center items-center bg-[#0c1790] mt-4 text-center p-3 rounded-lg gap-2 mx-4 md:mx-auto">
        <h1 className="text-white lg:text-2xl font-medium">
          Seleccione Prueba para ver el reporte
        </h1>
        <FaArrowCircleDown className="text-white text-2xl animate-bounce" />
      </div>

      <div className="flex flex-col mt-10 sm:justify-center items-center p-8">
        {IsLoading ? (
          <Loading />
        ) : (
          <div className="relative md:w-[60%] lg:w-[40%]">
            <div className="card bg-blue-400 shadow-lg  w-full h-full rounded-3xl absolute  transform -rotate-6" />
            <div className="card bg-red-400 shadow-lg  w-full h-full rounded-3xl absolute  transform rotate-6" />
            <div className="relative w-full rounded-3xl  px-6 py-4 bg-gray-100 shadow-md border-2 border-gray-400">
              <form>
                <div className="mb-3">
                  <label className="mb-2 block lg:text-base font-medium text-gray-800">
                    Reporte Global{" "}
                  </label>
                  <ReactSelect
                    className="dark:text-black"
                    options={Data?.Prueba}
                    //   getOptionLabel={(item) => `${item.NombrePrograma} (# ${item.IdPrueba})`}
                    getOptionLabel={(item) => `Resultados Pruebas De Ingreso`}
                    placeholder="Seleccione una Opción"
                    onChange={(e) => { setValues({ ...Values, IdPrueba: e?.IdPrueba }) }}
                  />
                </div>

                {localStorage.usu_rol != '3' && (
                  <div className="mb-5">
                    <label className="mb-2 block lg:text-base font-medium text-gray-800">
                      Reporte por Centro Universitario{" "}
                    </label>
                    <ReactSelect
                      className="dark:text-black"
                      options={sedes}
                      getOptionLabel={(item) => item.NombreSubSede}
                      getOptionValue={(item) => item.Id}
                      placeholder="Seleccione una Opción"
                      onChange={(e) => { setValues({ IdPrueba: 46, Cu: e.NombreSubSede }); }}
                    />
                  </div>
                )}


                {Object.keys(InfoPdf).length > 0 && localStorage.usu_rol === '3' ? (
                  <PDFDownloadLink document={<MyDocument InfoPdf={InfoPdf} />} fileName={`REPORTE ${InfoPdf.InformacionEstudiante.nombreEstudiante}`}>
                    {({ blob, url, loading, error }) => (
                      <a
                        className="bg-blue-500 px-10 w-full py-3 rounded-xl text-white shadow-xl hover:shadow-inner focus:outline-none transition duration-500 ease-in-out transform hover:-translate-x hover:scale-105"
                        href={url ?? undefined}
                        download={`REPORTE ${InfoPdf.InformacionEstudiante.nombreEstudiante}`}
                      >
                        {loading ? 'Cargando Reporte...' : 'Descargar Reporte'}
                      </a>
                    )}
                  </PDFDownloadLink>
                ) : Object.keys(InfoPdf).length > 0 && localStorage.usu_rol != '3' ? (
                  <PDFDownloadLink document={<DocumentReporte InfoPdf={InfoPdf} />} fileName={`REPORTE GENERAL`}>
                    {({ blob, url, loading, error }) => (
                      <a
                        className="bg-blue-500 px-10 w-full py-3 rounded-xl text-white shadow-xl hover:shadow-inner focus:outline-none transition duration-500 ease-in-out transform hover:-translate-x hover:scale-105"
                        href={url ?? undefined}
                        download={`REPORTE ${InfoPdf.Cu ? '' + InfoPdf.Cu : 'GENERAL'}`}
                      >
                        {loading ? 'Cargando Reporte...' : 'Descargar Reporte'}
                      </a>
                    )}
                  </PDFDownloadLink>
                ) : null}


              </form>
            </div>
          </div>
        )}
      </div>


    </>
  );
};

export default BodyComponent;