"use client";
import { useEffect, useState } from "react";
import { Competencia } from "../../../typings";
import { useSearchParams } from "next/navigation";

import Select from "react-select";
import ItemCOA from "../../ItemCOA";

type Props = {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  setCompetencias: React.Dispatch<React.SetStateAction<Competencia[]>>;
  InfoEditar: {
    Programa?: string;
    Ponderacion?: number;
    Nombre?: string;
    Abreviatura?: string;
    TipoCompetencia?: string;
    Id?: number;
    Orden?: number;
    IdSubSede?: string;
  };
};

const ModalAdd = ({ setShowModal, setCompetencias, InfoEditar }: Props) => {
  const [Values, setValues] = useState({
    NombreCompetencia: InfoEditar?.Nombre || "",
    Abreviatura: InfoEditar?.Abreviatura || "",
    TipoCompetencia: InfoEditar?.TipoCompetencia || "",
    Programa: InfoEditar?.Programa || "",
    Id: InfoEditar?.Id || "",
    Orden: InfoEditar?.Orden || "",
    Ponderacion: InfoEditar?.Ponderacion || "",
    IdSubSede: localStorage?.getItem("IdSubSede") || 0,
  } as Props["InfoEditar"]);


  const [Programas, setProgramas] = useState([] as any)
  const TipoCompetencia = [{ value: "G", label: "Genérica" }, { value: "E", label: "Específica" }];
  const searchParams: any = useSearchParams();
  const [Data, setData] = useState({ IdSubSede: localStorage?.getItem("IdSubSede") || 0 } as any);

  const getProgramas = async () => {
    const programas = await fetch(`/api/Configuracion/Programas/GetProgramas/?SubSede=${searchParams?.get("SubSede") || 0}`)
    const res = await programas.json()
    setProgramas(res.programas)
  }

  useEffect(() => {
    getProgramas()
  }, [])

  const handerSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();

      if (Object.keys(InfoEditar)?.length > 0) {
        if (Values?.IdSubSede === "" || Values?.IdSubSede == "0") {
          alert("Selecciona un CU ");
          return;
        }

        const sentDataRes = await fetch(
          "/api/Configuracion/Competencias/UpdateCompetencia",
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON?.stringify(Values),
          }
        ).then((res) => res.json());
        const NewCompetencias = await fetch(
          `/api/Configuracion/Competencias/GetCompetencias?SubSede=${searchParams?.get("SubSede") || 0
          }`
        ).then((res) => res.json());

        setCompetencias(NewCompetencias?.competencia);
        setShowModal(false);
        alert(sentDataRes?.body);
      } else {
        if (Values?.IdSubSede === "" || Values?.IdSubSede == "0") {
          alert("Selecciona un CU ");
          return;
        }
        if (Object.keys(Values).length < 3) {
          alert("Por favor, llene todos los campos");
          return;
        }

        const sentDataRes = await fetch(
          `/api/Configuracion/Competencias/AddCompetencia`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(Values),
          }
        ).then((res) => res.json());

        const SubSede = searchParams.get("SubSede");

        const NewCompetencias = await fetch(
          `/api/Configuracion/Competencias/GetCompetencias?SubSede=${SubSede}`
        ).then((res) => res.json());

        setCompetencias(NewCompetencias?.competencia);
        setShowModal(false);
        alert(sentDataRes?.body);
      }
    } catch (error) {
      console.error(error);
      alert("Error al guardar");
    }
  };

  const hanlerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...Values, [e.target.name]: e.target.value.toUpperCase() });
  };

  return (
    <div className="bg-[#000236]/100 transition duration-150 ease-in-out z-10 fixed top-0 right-0 bottom-0 left-0">
      <div className="container mx-auto  w-11/12 md:w-2/3 max-w-2xl">
        <div className="relative overflow-auto  max-h-screen  py-8 px-5 md:px-10 bg-white shadow-md rounded border border-gray-400">
          <h1 className="text-center text-lg tracking-normal leading-tight mb-4 bg-[#151A8B] w-full text-white p-4 rounded-lg font-bold ">
            {InfoEditar?.Nombre
              ? `Editar ${InfoEditar?.Nombre}`
              : "Agregar una Nueva Competencia"}
          </h1>

          <form onSubmit={handerSubmit}>
            {Data?.IdSubSede == "0" && (
              <>
                <ItemCOA setValues={setValues} Values={Values} />
              </>
            )}
            <div className="grid sm:grid-cols-2 gap-2">
              <div className="mb-2">
                <label
                  htmlFor="NombreCompetencia"
                  className="mb-3 block text-base font-medium text-gray-800"
                >
                  Nombre Competencia <span className="text-red-900">(*)</span>
                </label>
                <input
                  autoComplete="off"
                  autoFocus
                  type="text"
                  name="NombreCompetencia"
                  id="NombreCompetencia"
                  required
                  onChange={hanlerChange}
                  placeholder="Ingrese Nombre Competencia"
                  className="InputStyle"
                  defaultValue={InfoEditar?.Nombre}
                />
              </div>
              <div className="mb-2">
                <label
                  htmlFor="Abreviatura"
                  className="mb-3 block text-base font-medium text-gray-800"
                >
                  Abreviatura <span className="text-red-900">(*)</span>
                </label>
                <input
                  autoComplete="off"
                  type="text"
                  name="Abreviatura"
                  id="Abreviatura"
                  required
                  onChange={hanlerChange}
                  placeholder="Ingrese Abreviatura"
                  className="InputStyle"
                  defaultValue={InfoEditar?.Abreviatura}
                  // validar en el input de tipo text que tenga una longitud maxima de 4 caracteres y solo letras
                  pattern="[A-Za-z]{4}"
                  title="Solo se permiten letras y una longitud maxima de 4 caracteres"
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-2 ">

              <div className="mb-2">
                <label
                  htmlFor="NombrePrograma"
                  className="mb-3 block text-base font-medium text-gray-800"
                >
                  Tipo Competencia <span className="text-red-900">(*)</span>
                </label>
                <Select
                  className="text-black"
                  options={TipoCompetencia}
                  onChange={(e: any) => {
                    setValues({ ...Values, TipoCompetencia: e.value });
                  }}
                  defaultValue={
                    (InfoEditar?.TipoCompetencia == "G" && TipoCompetencia[0]) ||
                    (InfoEditar?.TipoCompetencia == "E" && TipoCompetencia[1])
                  }
                  placeholder="Seleccione una opción"
                />
              </div>

              <div className="mb-2">
                <label
                  htmlFor="NombrePrograma"
                  className="mb-3 block text-base font-medium text-gray-800"
                >
                  Ponderación
                </label>
                <input type="number" className="InputStyle text-black" placeholder="Numero de ponderación" name="Ponderacion"
                  id="Ponderacion" onChange={hanlerChange} defaultValue={InfoEditar?.Ponderacion} />
              </div>

            </div>

            <div className="mb-2">
              <label htmlFor="NombrePrograma" className="mb-3 block text-base font-medium text-gray-800">
                A que programa sera asigando <span className="text-red-900">(*)</span>
              </label>
              <Select
                className="text-black"
                options={Programas.map((programa: any) => ({ value: programa.Nombre, label: programa.Nombre }))}
                onChange={(e: any) => { setValues({ ...Values, Programa: e.value }) }}
                defaultValue={{ value: InfoEditar.Programa, label: InfoEditar.Programa }}
                placeholder="Seleccione una opción"
              />
            </div>

            <div className="flex justify-around mt-3 gap-2">
              <button
                type="submit"
                className="block w-full max-w-xs mx-auto bg-[#151a8b] hover:bg-blue-700 focus:bg-blue-700 text-white rounded-lg px-3 py-3 font-semibold"
              >
                {Object.keys(InfoEditar)?.length > 0 ? "Editar" : "Guardar"}
              </button>
              <button
                className="block w-full max-w-xs mx-auto bg-[#151a8b] hover:bg-blue-700 focus:bg-blue-700 text-white rounded-lg px-3 py-3 font-semibold"
                onClick={(e) => {
                  e.preventDefault();
                  setShowModal(false);
                }}
              >
                Cerrar
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default ModalAdd;
