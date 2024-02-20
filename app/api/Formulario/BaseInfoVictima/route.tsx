import { NextResponse } from "next/server";
import connectionPool from "@/config/db";

export async function GET(req: any) {
    try {
        const { searchParams } = req?.nextUrl;
        const num = searchParams?.get("num");

        const [BaseInfoVictima] = await connectionPool.query(`
        SELECT 
          dpto_expul_pae,
          muni_exp_id,
          dpto_reins_pae,
          muni_reinsert_id,
          pvc_id,
          resguardo_id,
          etnia_id,
          alumno_bvfp,
          alumno_bhn,
          alumno_poblacion_vulnerable
        FROM inscripciones
        WHERE alumno_num_docu = ${num}
      `);

        return NextResponse.json({ BaseInfoVictima }, { status: 200 });

    } catch (error) {
        console.log(error);
        NextResponse.json({ body: "error" }, { status: 400 });
    }
}
