"use client";
import axios from "axios";
import DataTable from "react-data-table-component";
import { Pruebas } from "../../../typings";
import { customStyles } from "../../../utils/CustomStylesTables";
import { useState } from "react";
import ModalAdd from "./ModalAdd";

type props = {
  info: Pruebas[];
  setPruebas: React.Dispatch<React.SetStateAction<Pruebas[]>>;
  Values: {
    Programa: number | null;
    TipoPrueba: string;
  };
};

// año actual
const TablePrueba = ({ info, setPruebas, Values }: props) => {
  const [infoEditar, setInfoEditar] = useState<any>({})
  const [showModal, setShowModal] = useState<any>({ Visible: false });

  const columns: any[] = [
    {
      name: "CU",
      selector: (row: any) => row.NombreSede,
      sortable: true,
      wrap: true,
    },
    {
      name: "Programa",
      selector: (row: any) => row.NombrePrograma,
      sortable: true,
      wrap: true,
    },
    {
      name: "Inicio Profesor",
      selector: (row: Pruebas) => {
        // locale to string
        const date = new Date(row?.InicioDocente);
        const options: {} = {
          year: "numeric",
          month: "long",
          day: "numeric",
        };
        return date.toLocaleDateString("es-CO", options);
      },
      sortable: true,
      wrap: true,
    },
    {
      name: "Fin profesor",
      selector: (row: any) => {
        const date = new Date(row?.FinDocente);
        const options: {} = {
          year: "numeric",
          month: "long",
          day: "numeric",
        };
        return date.toLocaleDateString("es-CO", options);
      },
      sortable: true,
      wrap: true,
    },
    {
      name: "Inicio Estudiante",
      selector: (row: any) => {
        const date = new Date(row?.InicioEstudiante);
        const options: {} = {
          year: "numeric",
          month: "long",
          day: "numeric",
        };
        return date.toLocaleDateString("es-CO", options);
      },
      sortable: true,
      wrap: true,
    },
    {
      name: "Fin Estudiante",
      selector: (row: any) => {
        const date = new Date(row?.FinEstudiantes);
        const options: {} = {
          year: "numeric",
          month: "long",
          day: "numeric",
        };
        return date.toLocaleDateString("es-CO", options);
      },
      sortable: true,
      wrap: true,
    },
    {
      name: "Operaciones",
      selector: (row: any) => (
        <div className="flex flex-wrap justify-center items-center">
          <button
            className=" text-red-900"
            onClick={async () => {
              const validate = confirm("¿Está seguro de eliminar esta prueba?");

              if (validate) {
                // fecha de eliminación
                try {
                  const responseRemove = await fetch(
                    "/api/Configuracion/ParametrosPruebas/DeletePruebas",
                    {
                      method: "DELETE",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({
                        id: row.IdPrueba,
                      }),
                    }
                  ).then((res) => res.json());

                  const response = await axios.post(
                    "/api/Configuracion/ParametrosPruebas/GetPruebas",
                    {
                      programa: Values?.Programa,
                      tipo: Values?.TipoPrueba,
                    }
                  );

                  setPruebas(response?.data?.pruebas);
                  alert(`${responseRemove.body}`);
                } catch (error) {
                  console.error(error);
                  alert("Error al eliminar");
                }

                // alert("Eliminado");
              }

            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
              />
            </svg>
          </button>

          <button
            title="Editar Registro"
            onClick={(e) => {
              e.preventDefault();
              setInfoEditar(row);
              // setShowModal(true);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="#0D7D1E"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
              />
            </svg>
          </button>
        </div>
      ),
      sortable: true,
      wrap: true,
    },
  ];

  const paginationComponentOptions = {
    rowsPerPageText: "Filas por página",
    rangeSeparatorText: "de",
    selectAllRowsItem: true,
    selectAllRowsItemText: "Todos",
  };

  const getData = async (
    programa: number,
    SemestreAcademico: number,
    tipo: string,
    SemestreLectivo: number
  ) => {
    try {
      const response = await axios.post(
        `/api/Configuracion/ParametrosPruebas/GetPruebas?SubSede=${localStorage.getItem('IdSubSede')}`,
        {
          programa,
          SemestreAcademico,
          tipo,
          SemestreLectivo,
        }
      );


      setPruebas(response?.data?.pruebas);
    } catch (error) {
      console.log(error);
      alert("Error al obtener los datos");
    }
  };

  return (
    <div className="border-t-2 border-t-white">
      <DataTable
        title="Lista de Pruebas Creadas"
        columns={columns}
        paginationComponentOptions={paginationComponentOptions}
        data={info}
        persistTableHead
        pagination
        responsive
        noDataComponent="No hay Pruebas"
        customStyles={customStyles}
        paginationPerPage={7}
      />

      {infoEditar && Object.keys(infoEditar).length > 0 && (
        <div className="modal">
          <ModalAdd
            setShowModal={setShowModal}
            ShowModal={showModal} 
            ValuesInfo={infoEditar}
            setPruebas={setPruebas}
            getData={getData}
          />
        </div>
      )}

    </div>
  );
};

export default TablePrueba;
