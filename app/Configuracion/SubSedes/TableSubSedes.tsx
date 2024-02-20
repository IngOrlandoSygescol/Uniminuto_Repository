"use client";
import axios from "axios";
import DataTable from "react-data-table-component";
import { VisibilidadModal } from "../../../typings";
import { customStyles } from "../../../utils/CustomStylesTables";

type props = {
  info: Array<any>;
  setSubSedes: React.Dispatch<React.SetStateAction<any>>;
  setInfoEditar: React.Dispatch<React.SetStateAction<any>>;
  setShowModal: React.Dispatch<React.SetStateAction<VisibilidadModal>>;
};

// año actual
const TableSubSedes = ({
  info,
  setSubSedes,
  setInfoEditar,
  setShowModal,
}: props) => {

  console.log(info);
  
  const columns: any = [
    {
      name: "Rectoría",
      selector: (row: any) => {
        return (
          <h1>
            <span>{row.NombreRectoria}</span>
          </h1>
        );
      },
      sortable: true,
      wrap: true,
    },
    {
      name: "Departamento",
      selector: (row: any) => {
        return (
          <h1>
            <span>{row.NombreSede}</span>
          </h1>
        );
      },
      sortable: true,
      wrap: true,
    },
    {
      name: "CU",
      selector: (row: any) => {
        return (
          <div className="w-full">
            <h1>
              <span>{row?.CodigoCOA}</span>
            </h1>

            <div className="grid sm:grid-cols-3 border-t gap-x-2 max-h-48 overflow-auto scrollbar-hide">
              {row?.SubSedes?.map((coa: any, key: any) => (
                <div key={key} className="flex gap-x-1 ">
                  <button
                    title="Eliminar Registro"
                    onClick={async () => {
                      const validate = confirm(
                        "Eliminar CU eliminará usuarios. ¿Está seguro?"
                      );
                      if (validate) {
                        console.log(coa);

                        // fecha de eliminación
                        try {
                          const responseRemove = await axios.delete(
                            "/api/Configuracion/SubSedes/DeleteCoa",
                            {
                              data: {
                                id: coa.IdSubSede,
                              },
                            }
                          );

                          const SubSedeRes = await axios.get(
                            "/api/Configuracion/SubSedes/GetSedesSubSedes"
                          );

                          setSubSedes(SubSedeRes?.data?.SedesSubSedes);

                          alert(`${responseRemove?.data?.body}`);
                        } catch (error: any) {
                          console.error(error);
                          alert(error.response.data.body);
                        }

                        // alert("Eliminado");
                      }
                    }}
                    className="text-red-900 "
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-4 h-4"
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
                      setShowModal({
                        EditVisible: true,
                      });
                      setInfoEditar({
                        ...coa,
                        IdSede: row.IdSede,
                      });
                    }}
                    className=" flex w-full items-center text-xs my-1 uppercase tracking-wider border px-2 text-[#070e54] border-[#070e54] hover:bg-[#070e54] hover:text-indigo-100 cursor-pointer"
                  >
                    {coa?.NombreSubSede}
                  </button>
                </div>
              ))}
            </div>
          </div>
        );
      },
      grow: 2,
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

  return (
    <div className="border-t-2 border-t-white">
      <DataTable
        title="Centro Universitario (CU)"
        columns={columns}
        paginationComponentOptions={paginationComponentOptions}
        data={info}
        persistTableHead
        pagination
        responsive
        noDataComponent="No hay datos"
        customStyles={customStyles}
        paginationPerPage={7}
      />
    </div>
  );
};

export default TableSubSedes;
