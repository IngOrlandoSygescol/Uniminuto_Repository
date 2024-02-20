import connectionPool from "@/config/db";
import { NextResponse } from "next/server";
import { RowDataPacket } from "mysql2";

export async function GET(req: any) {
  const { searchParams } = new URL(req.url);

  try {

    //Globals
    const IdPrueba = searchParams.get("IdPrueba");
    const IdUser = searchParams.get("IdUser");

    const competenciasProcesadas: any = {};
    const estudiantesAInsertar = [];

    let sumaTotalPuntosAprobadosPonderacion = 0;
    let TotalPuntosAprobados = 0;

    // Consultar todos los estudiantes de un programa
    const [totalEstudiantesPrograma]: any = await connectionPool.query(`SELECT COUNT(DISTINCT estudiante) AS cantidad_estudiantes_prueba
     FROM respuestas_estudiante
    `);

    // Exreaer las respuestas y calificacion de la prueba de un estudiante
    const [dataEstudiante]: any = await connectionPool.query(`
      SELECT
      p.id,
      p.IdDocente,
      r.estudiante AS idEstudiante,
      p.respuesta AS respuestaCorrecta,
      p.punto,
      p.competencia,
      p.prueba,
      c.eje_nom,
      c.ponderacion,
      r.respuesta AS respuestaEstudiante,
      CASE WHEN p.respuesta = r.respuesta THEN 'Aprobado' ELSE 'Reprobado' END AS calificacion,
      (SELECT COUNT(*) 
      FROM preguntas_pruebas p2
      JOIN respuestas_estudiante r2 ON p2.id = r2.pregunta 
      WHERE p2.prueba = ${IdPrueba} AND p2.MsnRechazo = '' AND r2.estudiante = ${IdUser}
        AND p2.competencia = p.competencia
        AND p2.respuesta = r2.respuesta) AS nPreguntasAprobadas,
      (SELECT COUNT(*) 
      FROM preguntas_pruebas p3
      JOIN respuestas_estudiante r3 ON p3.id = r3.pregunta 
      WHERE p3.prueba = ${IdPrueba} AND p3.MsnRechazo = '' AND r3.estudiante = ${IdUser}
        AND p3.competencia = p.competencia
        AND p3.respuesta != r3.respuesta) AS nPreguntasDesaprobadas,
      (SELECT ROUND(SUM(p4.punto)) -- Redondea la suma 
      FROM preguntas_pruebas p4
      JOIN respuestas_estudiante r4 ON p4.id = r4.pregunta 
      WHERE p4.prueba = ${IdPrueba} AND p4.MsnRechazo = '' AND r4.estudiante = ${IdUser}
        AND p4.competencia = p.competencia
        AND p4.respuesta = r4.respuesta) AS totalPuntosAprobados
      FROM preguntas_pruebas p
      JOIN pfc_ejes c ON p.competencia = c.eje_id
      JOIN respuestas_estudiante r ON p.id = r.pregunta 
      WHERE p.prueba = ${IdPrueba} AND p.MsnRechazo = '' AND r.estudiante = ${IdUser}
      ORDER BY c.eje_nom;
    `);

    // Recorre y procesa los datos del estudiante
    for (const data of dataEstudiante) {
      const { eje_nom, nPreguntasAprobadas, nPreguntasDesaprobadas, totalPuntosAprobados, competencia, idEstudiante, ponderacion } = data;

      // Verifica si la competencia ya ha sido procesada
      if (!competenciasProcesadas[eje_nom]) {
        // Crea un objeto para la competencia si no existe
        competenciasProcesadas[eje_nom] = {
          idEstudiante,
          eje_nom,
          totalPuntosAprobados,
          nPreguntasAprobadas,
          nPreguntasDesaprobadas,
          ponderacion,
          competencia
        };
      }
    }

    // Recorre los estudiantes procesados y agrega los que no existen en la tabla a estudiantesAInsertar
    for (const competencia in competenciasProcesadas) {
      if (competenciasProcesadas.hasOwnProperty(competencia)) {
        const competenciaData = competenciasProcesadas[competencia];
        sumaTotalPuntosAprobadosPonderacion += competenciaData.totalPuntosAprobados * competenciaData.ponderacion;
        TotalPuntosAprobados += competenciaData.totalPuntosAprobados
        const [existingStudent] = await connectionPool.query<RowDataPacket[]>('SELECT * FROM reporteEstudiante WHERE idEstudiante = ?', [competenciaData.idEstudiante]);

        if (existingStudent.length === 0) {
          estudiantesAInsertar.push(competenciaData);
        } else {
          estudiantesAInsertar.push(competenciaData);
        }
      }
    }

    //Validar si ya esxiste el estudiante en la tabla de reportes
    const [estudiante]: any = await connectionPool.query(`SELECT * FROM reporteEstudiante WHERE idEstudiante = ${IdUser}`);

    if (estudiante.length === 0) {

      for (const estudianteData of estudiantesAInsertar) {

        // Puntaje Ponderacion
        const puntajePonderacionComp = estudianteData.totalPuntosAprobados * estudianteData.ponderacion

        // Porcentaje Global
        const claves = Object.keys(competenciasProcesadas);
        const cantidadDeObjetos = claves.length;
        let porcentajeGlobal = TotalPuntosAprobados / cantidadDeObjetos;

        // Puntaje Global
        let puntajeglobal = Math.round((sumaTotalPuntosAprobadosPonderacion / 13) * 5)

        // Percentil GLOBAL
        const [nEstudiantesMenorPuntaje]: any = await connectionPool.query(`SELECT COUNT(DISTINCT idEstudiante) AS cantidad_estudiantes
          FROM reporteEstudiante
          WHERE puntajeGlobal < ${puntajeglobal};
        `);
        const nEstudiantesMenorPuntajeGlobal = nEstudiantesMenorPuntaje[0].cantidad_estudiantes
        let percentilGlobal = Math.round((nEstudiantesMenorPuntajeGlobal / totalEstudiantesPrograma[0].cantidad_estudiantes_prueba) * 100)

        // Percentil Indivdual competencia
        const [nEstudiantesMenorPuntajePercentil]: any = await connectionPool.query(`SELECT COUNT(DISTINCT idEstudiante) AS cantidad_estudiantes
           FROM reporteEstudiante
           WHERE idCompetencia = ${estudianteData.competencia} AND puntajeCompetencia < ${estudianteData.totalPuntosAprobados};
         `);
        const nEstudiantesMenorPuntajePercentilComp = nEstudiantesMenorPuntajePercentil[0].cantidad_estudiantes
        let percentilIndividual = Math.round((nEstudiantesMenorPuntajePercentilComp / totalEstudiantesPrograma[0].cantidad_estudiantes_prueba) * 100)
        

        await connectionPool.query(
          `INSERT INTO reporteEstudiante (idEstudiante, idCompetencia, nomCompetencia, puntajeCompetencia ,puntajePonderacionComp,percentilIndividual,EstudiantesMenorPuntajePercentilComp,PercentilGlobal, porcentajeGlobal, puntajeGlobal,estudiantesMenorPuntajeGlobal) VALUES (?, ?, ?, ?, ?, ? ,?, ?, ?, ?, ?)`,
          [estudianteData.idEstudiante, estudianteData.competencia, estudianteData.eje_nom, estudianteData.totalPuntosAprobados, puntajePonderacionComp, percentilIndividual, nEstudiantesMenorPuntajePercentilComp, percentilGlobal, porcentajeGlobal, puntajeglobal, nEstudiantesMenorPuntajeGlobal]
        );

      }

    } else {

      for (const estudianteData of estudiantesAInsertar) {

        // Puntaje Ponderacion
        const puntajePonderacionComp = estudianteData.totalPuntosAprobados * estudianteData.ponderacion

        // Porcentaje Global
        const claves = Object.keys(competenciasProcesadas);
        const cantidadDeObjetos = claves.length;
        let porcentajeGlobal = TotalPuntosAprobados / cantidadDeObjetos;

        // Puntaje Global
        let puntajeglobal = Math.round((sumaTotalPuntosAprobadosPonderacion / 13) * 5)

        // Percentil GLOBAL
        const [nEstudiantesMenorPuntaje]: any = await connectionPool.query(`SELECT COUNT(DISTINCT idEstudiante) AS cantidad_estudiantes
          FROM reporteEstudiante
          WHERE puntajeGlobal < ${puntajeglobal};
        `);
        const nEstudiantesMenorPuntajeGlobal = nEstudiantesMenorPuntaje[0].cantidad_estudiantes
        let percentilGlobal = Math.round((nEstudiantesMenorPuntajeGlobal / totalEstudiantesPrograma[0].cantidad_estudiantes_prueba) * 100)

        // Percentil Indivdual competencia
        const [nEstudiantesMenorPuntajePercentil]: any = await connectionPool.query(`SELECT COUNT(DISTINCT idEstudiante) AS cantidad_estudiantes
          FROM reporteEstudiante
          WHERE idCompetencia = ${estudianteData.competencia} AND puntajeCompetencia < ${estudianteData.totalPuntosAprobados};
        `);
        const nEstudiantesMenorPuntajePercentilComp = nEstudiantesMenorPuntajePercentil[0].cantidad_estudiantes
        let percentilIndividual = Math.round((nEstudiantesMenorPuntajePercentilComp / totalEstudiantesPrograma[0].cantidad_estudiantes_prueba) * 100)

        await connectionPool.query(
          `UPDATE reporteEstudiante SET 
                 puntajePonderacionComp = ?,
                 percentilIndividual = ?,
                 EstudiantesMenorPuntajePercentilComp = ?,
                 PercentilGlobal = ?,
                 porcentajeGlobal = ?,
                 puntajeGlobal = ?,
                 estudiantesMenorPuntajeGlobal = ?
                 WHERE idEstudiante = ? 
                 AND idCompetencia = ?`,
          [puntajePonderacionComp, percentilIndividual, nEstudiantesMenorPuntajePercentilComp, percentilGlobal, porcentajeGlobal, puntajeglobal, nEstudiantesMenorPuntajeGlobal, estudianteData.idEstudiante, estudianteData.competencia]
        );

      }

    }

    // Consulta para la info del reporte final
    const [reporteEstudiante]: any = await connectionPool.query(`SELECT
      CONCAT(pa.alumno_nom1, ' ', pa.alumno_nom2, ' ', pa.alumno_ape1, ' ', pa.alumno_ape2) AS nombreEstudiante,
      pa.alumno_num_docu AS nDocumento,
      pa.alumno_email AS correo,
      pa.alumno_celular AS tel,
      pr.eje_abr AS AbrCompetencia,
      re.*,
      pfc_matricula.semestre AS Semestre,
      pfc_programa.pro_nom AS Programa
      FROM
        reporteEstudiante AS re
      JOIN
        pfc_alumno AS pa ON re.idEstudiante = pa.alumno_id
      JOIN
        pfc_matricula ON pa.alumno_id = pfc_matricula.alumno_id
      JOIN
        pfc_programa ON pfc_matricula.programa = pfc_programa.pro_id
      JOIN
        pfc_ejes AS pr ON re.idCompetencia = pr.eje_id
      WHERE
        re.idEstudiante = ${IdUser};
     `);

    return NextResponse.json({ InformacionEstudiante: reporteEstudiante[0] || {}, reporteEstudiante, totalEstudiantesPrograma: totalEstudiantesPrograma[0].cantidad_estudiantes_prueba }, { status: 200 });

  } catch (error) {
    console.log(error);
    return NextResponse.json({ body: "Internal Server Error" }, { status: 500 });
  }
}
