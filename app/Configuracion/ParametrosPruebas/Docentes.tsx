import React, { useEffect, useState } from "react";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRange } from "react-date-range";
import { es } from "date-fns/locale";

type ShowModalType = {
  Visible: boolean;
  TypeTest: string;
  Programa?: number | null;
  SemestreAcademico?: string;
  MaxSemestre?: any;
  StartStudents?: any;
};
type Props = {
  ShowModal: ShowModalType;
  setStartDateDocentes: React.Dispatch<React.SetStateAction<any>>;
  setEndDateDocentes: React.Dispatch<React.SetStateAction<any>>;
  startDateDocentes: any;
  endDateDocentes: any;
  setMenu: React.Dispatch<React.SetStateAction<any>>;
};

const Docentes = ({
  ShowModal,
  setStartDateDocentes,
  setEndDateDocentes,
  startDateDocentes,
  endDateDocentes,
  setMenu,
}: Props) => {

  const [selectedDateRange, setSelectedDateRange] = useState<any>({
    startDate: startDateDocentes ? new Date(startDateDocentes) : new Date(),
    endDate: endDateDocentes ? new Date(endDateDocentes) : new Date(),
    key: 'selection',
  });

  console.log(selectedDateRange);
  
  const handleSelectDocentes = (ranges: any) => {
    setSelectedDateRange(ranges.selection);
  };


  return (
    <div className="">
      <section className="flex justify-center">
        <div>
          <label
            htmlFor="InicioPrueba"
            className="mb-3 block text-base font-medium text-gray-800"
          >
            Rango de fechas para docentes.{" "}
            <span className="text-red-900">(*)</span>
          </label>
          <DateRange
            ranges={[selectedDateRange]}
            minDate={new Date()}
            rangeColors={["#3b82f6"]}
            onChange={handleSelectDocentes}
            locale={es}
          />
        </div>

      </section>

      <div className="flex justify-around mt-3 gap-2">
        <button
          onClick={() => {
            setStartDateDocentes(selectedDateRange.startDate);
            setEndDateDocentes(selectedDateRange.endDate);
            setMenu({
              Docentes: false,
              Aprobacion: true,
              Estudiantes: false,
              Competencias: false,
              Especificas: false,
            });
          }}
          className="block w-full max-w-xs mx-auto bg-[#151a8b] hover:bg-blue-700 focus:bg-blue-700 text-white rounded-lg px-3 py-3 font-semibold"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default Docentes;
