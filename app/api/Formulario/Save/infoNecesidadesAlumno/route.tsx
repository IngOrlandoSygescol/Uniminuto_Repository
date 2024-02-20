import { NextResponse } from "next/server";
import connectionPool from "@/config/db";

export async function GET(req: any) {
    try {
        const { searchParams } = req?.nextUrl;
        const num = searchParams?.get("num");
        const [DataSave]: any = await connectionPool.query(`
        SELECT
        inscripciones.tipo_disca_fisica,
        inscripciones.tipo_disca_sensorial,
        inscripciones.tipo_disca_psiquica,
        inscripciones.tipo_disca_cognitiva,
        inscripciones.capa_exc_id,
        inscripciones.capa_exc_id,
        discapacidades_fisica.nombre AS discapacidad_fisica_nombre,
        discapacidades_sensorial.nombre AS discapacidad_sensorial_nombre,
        discapacidades_psiquica.nombre AS discapacidad_psiquica_nombre,
        discapacidades_cognitiva.nombre AS discapacidad_cognitiva_nombre
    FROM
        inscripciones
    INNER JOIN
        discapacidades AS discapacidades_fisica ON inscripciones.tipo_disca_fisica = discapacidades_fisica.superId
    INNER JOIN
        discapacidades AS discapacidades_sensorial ON inscripciones.tipo_disca_sensorial = discapacidades_sensorial.superId
    INNER JOIN
        discapacidades AS discapacidades_psiquica ON inscripciones.tipo_disca_psiquica = discapacidades_psiquica.superId
    INNER JOIN
        discapacidades AS discapacidades_cognitiva ON inscripciones.tipo_disca_cognitiva = discapacidades_cognitiva.superId
    WHERE
        inscripciones.alumno_num_docu = '${num}'
    
        `);

        return NextResponse.json({ DataSave: DataSave[0] || {} }, { status: 200 });
    } catch (error) {
        console.log(error);
        NextResponse.json({ body: "error" }, { status: 400 });
    }
}

