import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import connectionPool from "../../../../../config/db";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const SubSede = searchParams.get("SubSede") || "";

  try {
    const [ProgramasRes]: any = await connectionPool.query(
      `SELECT
        pfc_programa.pro_id as Id,
        pfc_programa.pro_nom as Nombre,
        pfc_programa.pro_sigla as Sigla,
        subSedes.nombre as SubSede,
        pfc_programa.periodicidad as Periodicidad,
        pfc_programa.cu as Cu
      FROM
        pfc_programa
      INNER JOIN
        subSedes
      ON
        subSedes.id = pfc_programa.subSedeId
      ${SubSede && SubSede !== "0" ? `WHERE subSedeId = '${SubSede}'` : ""}`
    );    

    console.log(ProgramasRes);
    
    return NextResponse.json(
      { programas: ProgramasRes },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { body: "Internal Server Error" },
      {
        status: 500,
      }
    );
  }
}
