import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import connectionPool from "../../../../../config/db";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const SubSede = searchParams.get("SubSede") || "";

  try {
    const [DocentesRes]: any = await connectionPool.query(`
    SELECT
        dcne.i AS Id,
        CONCAT(dcne.dcne_nom1, ' ', dcne.dcne_nom2) AS Nombre,
        CONCAT(dcne.dcne_ape1, ' ', dcne.dcne_ape2) AS Apellidos,
        tipo_docum.codigo AS DocumCodigo,
        tipo_docum.nombre AS TipoDocumento,
        dcne.dcne_num_docu AS Documento,
        dcne_email_perso AS Correo,
        usuario.login AS Usuario,
        usuario.pass AS Pass,
        dcne.dcne_genero AS Genero,
        subSedes.nombre AS NombreSubSede,
        pfc_programa.pro_nom AS NombrePrograma,
        pfc_programa.pro_sigla AS Sigla,
        dcne.cu AS Cu
    FROM dcne
    INNER JOIN usuario ON (usuario.idUsuario = dcne.i)
    INNER JOIN tipo_docum ON (tipo_docum.id = dcne.tipo_docu_id)
    INNER JOIN subSedes ON subSedes.id = usuario.subsede
    LEFT JOIN pfc_programa ON dcne.ProgramaId = pfc_programa.pro_id
    WHERE usuario.rol = 2 ${SubSede && SubSede !== "0" ? `AND usuario.subsede = '${SubSede}'` : ""}
    ORDER BY dcne_ape1, dcne_ape2, dcne_nom1, dcne_nom2
  `);

    console.log(DocentesRes);


    return NextResponse.json(
      { docentes: DocentesRes },
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
