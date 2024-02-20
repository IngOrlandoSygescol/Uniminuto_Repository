import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import connectionPool from "../../../../../config/db";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const SubSede = searchParams.get("SubSede");

  try {
    const [AlumnosRes]: any = await connectionPool.query(
      `SELECT
      pfc_alumno.alumno_num_docu AS Documento,
      CONCAT(pfc_alumno.alumno_nom1, ' ', pfc_alumno.alumno_nom2) AS Nombre,
      CONCAT(pfc_alumno.alumno_ape1, ' ', pfc_alumno.alumno_ape2) AS Apellidos,
      pfc_alumno.alumno_email AS Correo,
      pfc_alumno.alumno_celular AS Celular,
      pfc_alumno.alumno_genero AS Genero,
      pfc_alumno.alumno_rum AS RUM,
      pfc_alumno.alumno_id AS Id,
      usuario.pass AS Pass,
      usuario.login AS Usuario,
      pfc_alumno.tipo_docu_id AS TipoDocumento,
      pfc_alumno.cu AS NombreSubSede,
      pfc_programa.pro_nom AS NombrePrograma
      FROM pfc_alumno
      LEFT JOIN usuario ON pfc_alumno.alumno_id = usuario.idUsuario
      LEFT JOIN pfc_matricula ON pfc_matricula.alumno_id = pfc_alumno.alumno_id
      LEFT JOIN pfc_programa ON pfc_matricula.programa = pfc_programa.pro_id
      WHERE usuario.rol = 3
    `
    );

    return NextResponse.json({ estudiantes: AlumnosRes || [] }, { status: 200 });
    
  } catch (error) {
    console.log(error);
    return NextResponse.json({ body: "Internal Server Error" }, { status: 500 });
  }
}
