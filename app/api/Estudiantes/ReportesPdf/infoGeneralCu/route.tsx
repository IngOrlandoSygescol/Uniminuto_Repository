import connectionPool from "@/config/db";
import { NextResponse } from "next/server";

export async function GET(req: any) {

    const { searchParams } = new URL(req.url);

    try {
        // Globals
        const IdPrueba = searchParams.get("IdPrueba");
        const Cu = searchParams.get("Cu");


        const [ReporteGeneral]: any = await connectionPool.query(
            `
            SELECT
                re.*, CONCAT(pa.alumno_nom1, ' ', pa.alumno_nom2, ' ', pa.alumno_ape1, ' ', pa.alumno_ape2) AS nombreEstudiante,
                pa.cu AS CU,
                pe.ponderacion AS nPonderacion,
                pr.pro_nom AS Programa
           FROM
                reporteEstudiante AS re
           JOIN
                pfc_alumno AS pa ON re.idEstudiante = pa.alumno_id
           JOIN
                pfc_ejes AS pe ON re.idCompetencia = pe.eje_id
           JOIN
                pfc_matricula AS ma ON re.idEstudiante = ma.matri_id
           JOIN
                pfc_programa AS pr ON ma.programa = pr.pro_id
           WHERE
                pa.cu = '${Cu}';
           `
        );

        const notasPorEstudiante: any = {};

        ReporteGeneral.forEach((competencia: any) => {
            const idEstudiante = competencia.idEstudiante;

            // Si el estudiante aún no tiene un objeto en el resultado, créalo
            if (!notasPorEstudiante[idEstudiante]) {
                notasPorEstudiante[idEstudiante] = {
                    idEstudiante: idEstudiante,
                    nombreEstudiante: competencia.nombreEstudiante,
                    puntajeGlobal: competencia.puntajeGlobal,
                    programa: competencia.Programa,
                    competencias: [],
                };
            }

            // Agrega la nota de la competencia al estudiante correspondiente
            notasPorEstudiante[idEstudiante].competencias.push({
                idCompetencia: competencia.idCompetencia,
                nomCompetencia: competencia.nomCompetencia,
                puntajeCompetencia: competencia.puntajeCompetencia,
                puntajePonderacionComp: competencia.puntajePonderacionComp,
                puntajeGlobal: competencia.puntajeGlobal,
                percentilIndividual: competencia.percentilIndividual,
                desempeño: calcularDesempeño(competencia.puntajeCompetencia),
                nPonderacion: competencia.nPonderacion,
            });

        });

        // Convierte el objeto en un arreglo de estudiantes
        const estudiantes = Object.values(notasPorEstudiante);


        if (estudiantes.length == 0) {
            return NextResponse.json({ body: "Los estudiantes de esta CU no han presentado las pruebas." }, { status: 404 });
        } else {
            return NextResponse.json({ ReporteGeneral: estudiantes, IdPrueba }, { status: 200 });
        }

    } catch (error) {
        console.log(error);
        return NextResponse.json({ body: "Internal Server Error" }, { status: 500 });
    }
}

function calcularDesempeño(puntajeCompetencia: any) {
    if (puntajeCompetencia >= 71 && puntajeCompetencia <= 100) {
        return "Avanzado";
    } else if (puntajeCompetencia >= 56 && puntajeCompetencia <= 70) {
        return "Satisfactorio";
    } else if (puntajeCompetencia >= 41 && puntajeCompetencia <= 55) {
        return "Mínimo";
    } else if (puntajeCompetencia >= 0 && puntajeCompetencia <= 40) {
        return "Insuficiente";
    } else {
        return "Sin desempeño";
    }
}
