import React, { useEffect, useState } from "react";
import Select from "react-select";
import { Nees, visibleFormulario } from "../../../../typings";
import { SavePdf } from "../../../../utils/GuardaPdf";
import { useSearchParams } from "next/navigation";
type Props = {
  setVisible: React.Dispatch<React.SetStateAction<visibleFormulario>>;
  Documento: number;
};


const ModalNecesidadesEducativa = ({ setVisible, Documento }: Props) => {
  const [StateShowNecesidades, setShowNecesidades] = useState(false);
  const [InputFileValue, setInputFileValue] = useState({});
  const [discapacidadFisica, setDiscapacidadFisica] = useState([]);

  const [discapacidadSensorial, setDiscapacidadSensorial] = useState([]);
  const [discapacidadPsiquica, setDiscapacidadPsiquica] = useState([]);
  const [discapacidadCognitiva, setDiscapacidadCognitiva] = useState([]);
  const [talentos, setTalentos] = useState([]);

  const [dispacidadAlumno, setDispacidadAlumno] = useState([]) as any;
  const [SelectValue, setSelectValue] = useState({});
  const [selectedOptions, setSelectedOptions] = useState([]);

  const searchParams = useSearchParams();

  const ShowNecesidades = (e: any) => {
    if (e.target.checked) {
      setShowNecesidades(true);
    } else {
      setShowNecesidades(false);
    }
  };

  const handerSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const sentDataRes = await fetch(`/api/Formulario/Save/SaveNee?doc=${searchParams.get("Doc")}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(SelectValue)
    }).then((res) => res.json());
    alert(sentDataRes.msg);
    if (sentDataRes.msg == "Datos actualizados correctamente") {
      setVisible({ NecesidadesEducativas: false });
    }

  }

  const getData = async () => {
    try {
      const InfoBase = await fetch(`/api/Formulario/BaseInfoNecesidadesEducativas?num=${Documento}`).then((res) => res.json());

      setDiscapacidadFisica(InfoBase.discapacidadFisica);
      setDiscapacidadSensorial(InfoBase.discapacidadSensorial);
      setDiscapacidadPsiquica(InfoBase.discapacidadPsiquica);
      setDiscapacidadCognitiva(InfoBase.discapacidadCognitiva);
      setTalentos(InfoBase.talentos);

    } catch (error) {
      console.error(error);
      alert("Error al cargar la información");
    }
  };

  const getDataDiscapacidades = async () => {
    try {
      const InfoBase = await fetch(`/api/Formulario/Save/infoNecesidadesAlumno?num=${Documento}`).then((res) => res.json());
      console.log(InfoBase.DataSave);
      setDispacidadAlumno(InfoBase.DataSave);
    } catch (error) {
      console.error(error);
      alert("Error al cargar la información");
    }
  };


  useEffect(() => {
    getData();
    getDataDiscapacidades()
  }, []);

  return (
    <>
      <div className="bg-[#000236]/100 transition duration-150 ease-in-out z-10 fixed top-0 right-0 bottom-0 left-0">
        <div className="container mx-auto  w-11/12 md:w-2/3 max-w-2xl">
          <div className="bg-[#000236]/100/50 transition duration-150 ease-in-out z-20 fixed top-0 right-0 bottom-0 left-0">
            <div className="container mx-auto h-screen overflow-auto w-11/12 md:w-full max-w-6xl">
              <div className="pt-2 pb-2   px-5  md:px-10 bg-white shadow-md rounded border border-gray-400">
                <h1 className="text-white bg-[#151A8B] text-center font-lg font-bold tracking-normal leading-tight mb-4 p-4 rounded-lg">
                  NECESIDADES EDUCATIVAS ESPECIALES N.E.E
                </h1>

                {/* modal info usuario body */}
                <h1 className="text-justify">
                  <b className="text-black">
                    <span className=" text-[red]">NOTA IMPORTANTE : </span>
                    Antes de continuar, es fundamental que tenga en cuenta lo
                    siguiente. Al dar clic en la casilla inferior, se
                    considerará que no tiene ninguna discapacidad. Si no
                    selecciona la casilla, asegúrese de verificar los documentos
                    anexos, ya que no podrá volver a ingresarlos una vez que
                    guarde la información en esta sección.
                  </b>

                  <div className="flex items-center">
                    <label
                      htmlFor="radioButton1"
                      className="mt-3 mx-3 text-base font-medium hover:font-bold text-[#e65643]"
                    >
                      (EN CASO DE NO PADECER NINGUNA, HAGA CLIC EN LA SIGUIENTE
                      CASILLA.)
                    </label>
                    <input
                      type="checkbox"
                      name="checkbox"
                      id="radioButton1"
                      className="h-5 w-5"
                      onClick={ShowNecesidades}
                      checked={StateShowNecesidades}
                    />
                  </div>
                </h1>
                <br></br>
                <form className="overflow-y-scroll ">
                  <>
                    {StateShowNecesidades ? (
                      <p className="animate-bounce pt-4 text-center">
                        <b className="flex justify-center items-center ">
                          <span className="text-green-500">
                            EL ESTUDIANTE NO PADECE NINGUNA NECESIDAD
                            ESPECIAL-
                          </span>

                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6 text-green-900"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
                            />
                          </svg>
                        </b>
                      </p>
                    ) : (
                      <>
                        <div className="grid gap-4 mb-6 lg:grid-cols-2">
                          <div>
                            <label className="block text-sm font-medium text-gray-900 ">
                              Discapacidad Fisica{" "}
                              <span className="text-red-900"></span>
                            </label>
                            <>
                              <Select
                                id="discaFisica"
                                className="text-black"
                                options={discapacidadFisica}
                                getOptionLabel={(option: any) => option.label}
                                getOptionValue={(option: any) => option.value}
                                defaultValue={discapacidadFisica}
                                closeMenuOnSelect={false}
                                placeholder={dispacidadAlumno.discapacidad_fisica_nombre || "Seleccione uno"}
                                onChange={(e: any) => { setSelectValue({ ...SelectValue, neeFisica: e }) }}

                              />

                            </>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-900 ">
                              Discapacidad Sensorial{" "}
                              <span className="text-red-900"></span>
                            </label>
                            <div>
                              <Select
                                className="text-black"
                                options={discapacidadSensorial}
                                getOptionLabel={(option: any) => option.label}
                                getOptionValue={(option: any) => option.value}
                                closeMenuOnSelect={false}
                                placeholder={dispacidadAlumno.discapacidad_sensorial_nombre || "Seleccione uno"}
                                onChange={(e: any) => {
                                  setSelectValue({
                                    ...SelectValue,
                                    neeSensorial: e,
                                  });
                                }}
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-900 ">
                              Discapacidad Psíquica{" "}
                              <span className="text-red-900"></span>
                            </label>
                            <div>
                              <Select
                                className="text-black"
                                options={discapacidadPsiquica}
                                getOptionLabel={(option: any) => option.label}
                                getOptionValue={(option: any) => option.value}
                                closeMenuOnSelect={false}
                                placeholder={dispacidadAlumno.discapacidad_psiquica_nombre || "Seleccione uno"}
                                onChange={(e: any) => {
                                  setSelectValue({
                                    ...SelectValue,
                                    neePsiquica: e,
                                  });
                                }}

                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-900 ">
                              Discapacidad Cognitiva{" "}
                              <span className="text-red-900"></span>
                            </label>
                            <div>
                              <Select
                                className="text-black"
                                options={discapacidadCognitiva}
                                getOptionLabel={(option: any) => option.label}
                                getOptionValue={(option: any) => option.value}
                                closeMenuOnSelect={false}
                                placeholder={dispacidadAlumno.discapacidad_cognitiva_nombre || "Seleccione uno"}
                                onChange={(e: any) => {
                                  setSelectValue({
                                    ...SelectValue,
                                    neeCognitiva: e,
                                  });
                                }}

                              />
                            </div>
                          </div>

                        </div>

                        <h1 className="text-white bg-[#151A8B] text-center font-lg font-bold tracking-normal leading-tight mb-6 p-4 rounded-lg grid gap-4 lg:grid-cols-1">
                          CAPACIDADES O TALENTOS EXCEPCIONALES
                        </h1>

                        <div>
                          <label className="block text-sm font-medium text-gray-900 ">
                            Talentos <span className="text-red-900"></span>
                          </label>
                          <div>
                            <Select
                              className="text-black"
                              options={talentos}
                              getOptionLabel={(option: any) => option.label}
                              getOptionValue={(option: any) => option.value}
                              closeMenuOnSelect={false}
                              placeholder={
                                dispacidadAlumno.capa_exc_id === '17'
                                  ? 'Talentos Globales'
                                  : dispacidadAlumno.capa_exc_id === '18'
                                    ? 'Talentos Específicos'
                                    : dispacidadAlumno.capa_exc_id === '19'
                                      ? 'Talentos asociados a una discapacidad'
                                      : 'Seleccione uno' 
                              }
                              onChange={(e: any) => {
                                setSelectValue({
                                  ...SelectValue,
                                  neeTalentos: e,
                                });
                              }}
                            />


                          </div>
                        </div>

                      </>
                    )}
                  </>
                  {/* <>
                       <p className="animate-bounce pt-4 text-center">
                       <b className="flex pb-6 justify-center">
                          <span className="text-green-500">
                            LA INFORMACIÓN FUE GUARDAD CON EXITO -
                    </span>
                       <svg
                           xmlns="http://www.w3.org/2000/svg"
                           fill="none"
                         viewBox="0 0 24 24"
                         strokeWidth="1.5"
                          stroke="currentColor"
                         className="w-6 h-6"
                         >
                           <path
                              strokeLinecap="round"
                             strokeLinejoin="round"
                               d="M10.125 2.25h-4.5c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125v-9M10.125 2.25h.375a9 9 0 019 9v.375M10.125 2.25A3.375 3.375 0 0113.5 5.625v1.5c0 .621.504 1.125 1.125 1.125h1.5a3.375 3.375 0 013.375 3.375M9 15l2.25 2.25L15 12"
                             />
                           </svg>
                         </b>
                       </p>
                     </> */}

                  <div className="flex justify-around mt-3">
                    <button
                      onClick={(e: any) => handerSubmit(e)}
                      className="mr-2 md:mr-0 disabled:opacity-30 text-white bg-[#151A8B] hover:bg-[#070E54] font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                    >
                      Guardar Sección
                    </button>
                    <button
                      className="text-white bg-[#151A8B] hover:bg-[#070E54] font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                      onClick={(e) => {
                        e.preventDefault();
                        setVisible({ NecesidadesEducativas: false });
                      }}
                    >
                      Cerrar
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalNecesidadesEducativa;
