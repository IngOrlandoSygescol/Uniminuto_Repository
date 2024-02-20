import { NextResponse } from "next/server";
import connectionPool from "@/config/db";

export async function POST(req: any) {
    const { searchParams } = req?.nextUrl;
    const doc = searchParams?.get("doc");

    try {
        const data = await req?.json()

        if (data) {
            const neeFisica = [data.neeFisica] || [];
            const neeSensorial = [data.neeSensorial] || [];
            const neePsiquica = [data.neePsiquica] || [];
            const neeCognitiva = [data.neeCognitiva] || [];
            const talento = [data.neeTalentos] || [];

            const updateTipoDisca = async (tableName: string, neeArray: any[]) => {
                if (neeArray.length > 0) {
                    const ids = neeArray.map((element: any) => element.value).join(', ');
                    await connectionPool.query(`UPDATE inscripciones SET ${tableName} = '${ids}' WHERE alumno_num_docu = '${doc}'`);
                }
            };

            await updateTipoDisca('tipo_disca_fisica', neeFisica);
            await updateTipoDisca('tipo_disca_sensorial', neeSensorial);
            await updateTipoDisca('tipo_disca_psiquica', neePsiquica);
            await updateTipoDisca('tipo_disca_cognitiva', neeCognitiva);
            await updateTipoDisca('capa_exc_id', talento);

            return NextResponse.json({ msg: 'Datos actualizados correctamente' }, { status: 200 });
        } else {
            console.log('Los datos enviados son nulos o no válidos.');
            return NextResponse.json({ body: "Datos inválidos" }, { status: 400 });
        }
    } catch (error) {
        console.error(error);
        return NextResponse.json({ body: "Internal server error" }, { status: 500 });
    }
}




