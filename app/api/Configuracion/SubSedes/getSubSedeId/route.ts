import { NextResponse } from "next/server";
import connectionPool from "../../../../../config/db";

export async function GET(req: any) {
    try {
        const { searchParams } = req.nextUrl;
        const idSubsede = searchParams.get("id") || "";
        
        if (idSubsede === "") {  return NextResponse.json({ body: "No se proporcionó un ID de subsede" }, { status: 400 }) }
        
        const [subSede]: any = await connectionPool.query(`SELECT nombre FROM subSedes WHERE id="${idSubsede}"`);

        if (subSede.length === 0) {
            return NextResponse.json({ body: "La sede no existe" }, { status: 404 });
        } else {
            const nombre = subSede[0].nombre !== undefined ? subSede[0].nombre : '';
            return NextResponse.json(nombre, { status: 200 });
        }
    } catch (error) {
        console.log(error);
        return NextResponse.json({ body: "Error interno del servidor" }, { status: 500 });
    }
}

