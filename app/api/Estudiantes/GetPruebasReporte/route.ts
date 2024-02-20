import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import connectionPool from "@/config/db";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;

  const SubSede = searchParams.get("SubSede") || "";
  const IdRol = searchParams.get("IdRol") || "";
  const IdUser = searchParams.get("IdUser") || "";
  const Doc = searchParams.get("Doc") || "";
  const PruebaID = searchParams.get("PruebaID") || "";

  try {

    // Valida si es estudiante
    if (IdRol == "3") {

      const [InfoMatriculaEstudiante]: any = await connectionPool.query(
        `SELECT programa,semestre,matri_id FROM pfc_matricula 
        WHERE alumno_id='${IdUser}' 
       `
      );
      // and subSedeId='${SubSede}'

      if (InfoMatriculaEstudiante?.length == 1) {
        const { programa, semestre, matri_id } = InfoMatriculaEstudiante[0];

        const [PruebasResult]: any = await connectionPool.query(
          `SELECT parametros_pruebas.tipo, parametros_pruebas.DateEstudiantesInicio, parametros_pruebas.DateEstudiantesFin, 
          pfc_programa.pro_nom as NombrePrograma, parametros_pruebas.id as IdPrueba 
          FROM parametros_pruebas 
          INNER JOIN pfc_programa ON pfc_programa.pro_id = parametros_pruebas.programa 
          WHERE parametros_pruebas.id IN (
            SELECT respuestas_estudiante.prueba 
            FROM respuestas_estudiante 
            WHERE respuestas_estudiante.estudiante = '${matri_id}'
          ) 
          AND parametros_pruebas.semestre = '${semestre}' 
         `
        );
        //AND parametros_pruebas.programa = '${programa}' 

        // AND parametros_pruebas.subSedeId = '${SubSede}'

        return NextResponse.json({ pruebas: PruebasResult || [] }, { status: 200 });

      }

    } else {

      const [PruebasResult]: any = await connectionPool.query(
        `SELECT
        parametros_pruebas.tipo,
        parametros_pruebas.DateEstudiantesInicio,
        parametros_pruebas.DateEstudiantesFin,
        pfc_programa.pro_nom AS NombrePrograma,
        parametros_pruebas.id AS IdPrueba
        FROM parametros_pruebas
        INNER JOIN pfc_programa ON pfc_programa.pro_id = parametros_pruebas.programa
        WHERE parametros_pruebas.id IN (
            SELECT respuestas_estudiante.prueba
            FROM respuestas_estudiante
        );
        `
      );

      return NextResponse.json({ pruebas: PruebasResult || [] }, { status: 200 });

    }

  } catch (error) {
    console.log(error);
    return NextResponse.json({ body: "Internal Server Error" }, { status: 500 });
  }
}
