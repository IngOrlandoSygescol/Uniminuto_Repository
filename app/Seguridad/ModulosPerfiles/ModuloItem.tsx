import React, { useEffect, useState } from "react";
import { ModulosPerfiles, ModulosSelect } from "../../../typings";
import { MultiSelect } from "react-multi-select-component";
import UptionsLanguage from "../../../utils/ReactSelectLanguage";

type Props = {
  data: ModulosSelect;
  Values: ModulosPerfiles;
  setListaModulosSelected: React.Dispatch<React.SetStateAction<any>>;
};

const ModuloItem = ({ data, Values, setListaModulosSelected }: Props) => {
  const [selected, setSelected] = useState(data?.SubModulosActivos || []);

  useEffect(() => {
    if (Values?.Nombre && Values?.Rol) {
      setSelected([]);
    }
  }, [Values?.Nombre, Values?.Rol]);

  return (
    <div className="flex justify-between divide-[#070e54] mx-auto  w-full h-full p-2">
      <span className="text-black font-bold"> {data?.NombreModulo}</span>
      <MultiSelect
        options={data?.SubModulos}
        value={selected}
        onChange={(selected: any) => {
          let DataPrincipal = { [data.Id]: selected, };
          setSelected(selected);
          setListaModulosSelected((prev: any) => ({ ...prev, ...DataPrincipal }));
        }}
        labelledBy="Seleciona una opción"
        overrideStrings={UptionsLanguage}
        className="text-gray-600 w-2/3"
      />
    </div>
  );
};

export default ModuloItem;
