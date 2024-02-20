import { NextResponse } from "next/server";
import connectionPool from "@/config/db";

export async function GET(req: any) {
    try {
        const { searchParams } = req?.nextUrl;
        const num = searchParams?.get("num");

        const [Departamentos]: any = await connectionPool.query(` SELECT * FROM dpto ORDER BY nombre ASC `);
        const [Municipios]: any = await connectionPool.query(`SELECT * FROM municipio ORDER BY municipio_nombre ASC`);
        const [PoblacionVictimaConflicto]: any = await connectionPool.query(`SELECT * FROM pob_vic_conflicto`);
        const [Etnia]: any = await connectionPool.query(`SELECT * FROM etnia ORDER BY etnia_nombre ASC`);
        const [Resguardo]: any = await connectionPool.query(`SELECT * FROM resguardo ORDER BY resgu_nombre ASC`);

        return NextResponse.json(
            {
                Departamentos,
                Municipios,
                PoblacionVictimaConflicto,
                Etnia,
                Resguardo
            },
            { status: 200 }
        );

    } catch (error) {
        console.log(error);
        NextResponse.json({ body: "error" }, { status: 400 });
    }
}

export async function POST(req: any) {
    try {
        const { searchParams } = req?.nextUrl;
        const num = searchParams?.get("num");
        const data = await req?.json();

        // Primero, verifica si el registro ya existe
        const existingRecord = await connectionPool.query(`SELECT alumno_num_docu FROM inscripciones WHERE alumno_num_docu = ${num}`);
        if (existingRecord[0]) {

            const DptoExpulsor = data.InputSelect.DptoExpulsor
            const McpioExpursor = data.InputSelect.McpioExpursor
            const DptoReinsertado = data.InputSelect.DptoReinsertado
            const McpioReinsert = data.InputSelect.McpioReinsert
            const PoblacionVictConflicti = data.InputSelect.PoblacionVictConflicti
            const resgu_id = data.InputSelect.resgu_id
            const etnia = data.InputSelect.etnia
            const beneficiarioVeterano = data.InputSelect.beneficiarioVeterano
            const heroesNacion = data.InputSelect.heroesNacion
            const poblacionVulnerable = data.InputSelect.poblacionVulnerable

            await connectionPool.query(`
            UPDATE inscripciones 
            SET 
              dpto_expul_pae = '${DptoExpulsor.id}', 
              muni_exp_id = '${McpioExpursor.municipio_id}', 
              dpto_reins_pae = '${DptoReinsertado.id}', 
              muni_reinsert_id = '${McpioReinsert.municipio_id}', 
              pvc_id = '${PoblacionVictConflicti.pvc_id}', 
              resguardo_id = '${resgu_id.resgu_id}', 
              etnia_id = '${etnia.etnia_id}', 
              alumno_bvfp = '${beneficiarioVeterano}', 
              alumno_bhn = '${heroesNacion}', 
              alumno_poblacion_vulnerable = '${poblacionVulnerable}'
            WHERE alumno_num_docu = ${num}
          `);

            return NextResponse.json({ body: "Información Cargada Con Exitó" }, { status: 200 });

        } else {
            NextResponse.json({ body: "Primero debe de llenar los datos basicos" }, { status: 400 });
        }

    } catch (error) {
        console.log(error);
        NextResponse.json({ body: "error" }, { status: 400 });
    }
}


