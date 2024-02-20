import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import connectionPool from "../../../../config/db";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const SubSede = searchParams.get("SubSede") || "";
  const IdUser = searchParams.get("IdUser") || "";
  const IdPrueba = searchParams.get("IdPrueba") || "";

  let PruebasSave: any = []

  try {
    const query = `
      SELECT parametros_pruebas.subSedeId as CoaId,
        parametros_pruebas.tipo as TipoPrueba,
        parametros_pruebas.semestre  as Semestre,
        pfc_programa.pro_id as IdPrograma,
        pfc_programa.pro_nom as NombrePrograma,
        parametros_pruebas.DateDocentesInicio,
        parametros_pruebas.DateDocentesFin,
        pfc_ejes.eje_id as IdCompetencia,
        pfc_ejes.eje_nom as CompetenciaNombre,
        parametros_pruebas.id as PruebasId
      FROM 
      parametros_pruebas
      INNER JOIN asignacionPrueba ON (parametros_pruebas.id = asignacionPrueba.prueba)
      INNER JOIN pfc_ejes ON (pfc_ejes.eje_id = asignacionPrueba.competencia)
      INNER JOIN pfc_programa ON (pfc_programa.pro_id = parametros_pruebas.programa)
      WHERE 
      parametros_pruebas.subSedeId = '${SubSede}'
        AND asignacionPrueba.docente = '${IdUser}'
        ${IdPrueba ? `AND parametros_pruebas.id = '${IdPrueba}'` : ""}
    `;

    const [PruebasResult]: any = await connectionPool.query(query);

    const newDataFormated = PruebasResult?.reduce((acc: any, prueba: any) => {
      const key = prueba.PruebasId;
      if (!acc[key]) {
        acc[key] = prueba;
      }
      return acc;
    }, {});

    
    const Pruebas: any = Object.values(newDataFormated)?.filter((prueba: any, index: number) => {
      const {
        CoaId,
        TipoPrueba,
        Semestre,
        IdPrograma,
        NombrePrograma,
        DateDocentesInicio,
        DateDocentesFin,
        IdCompetencia,
        CompetenciaNombre,
        PruebasId,
      } = prueba;

      const DateDocentesInicioMilisegundos = new Date(DateDocentesInicio).getTime();
      const DateDocentesFinMilisegundos = new Date(DateDocentesFin).getTime();
      const DateNowMilisegundos = new Date().getTime();

      const isDateDocentesInicio = DateNowMilisegundos >= DateDocentesInicioMilisegundos;
      const isDateDocentesFin = DateNowMilisegundos <= DateDocentesFinMilisegundos;

      const isDateDocentes = isDateDocentesInicio && isDateDocentesFin;

      PruebasSave.push({ ...prueba, index: index })
      if (isDateDocentes) { return { ...prueba, index: index } }

    });

    return NextResponse.json({ pruebas: PruebasSave || [] }, { status: 200 });

  } catch (error) {
    console.log(error);
    return NextResponse.json({ body: "Internal Server Error" }, { status: 500 });
  }
}
