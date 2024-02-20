import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import connectionPool from "../../../../../config/db";

export async function DELETE(req: NextRequest) {

    const { searchParams } = req.nextUrl;
    const id = searchParams.get("idPregunta") || "";

    try {
        const [Pregunta]: any = await connectionPool.query("DELETE FROM preguntas_pruebas WHERE id = ?", [id]);

        if (Pregunta.affectedRows != 0) {
            return NextResponse.json({ msg: 'Pregunta eliminada correctamente' }, { status: 200 });
        } else {
            return NextResponse.json({ msg: "La pregunta no se pudo eliminar" }, { status: 400 });
        }

    } catch (error) {
        console.error(error);
        return NextResponse.json({ body: "Internal Server Error" }, { status: 500 });
    }
}
