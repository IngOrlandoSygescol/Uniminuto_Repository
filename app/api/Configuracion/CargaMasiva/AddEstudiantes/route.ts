import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import connectionPool from "../../../../../config/db";
//import { Documento, Programa, SemestreAcademico } from "../../../../../typings";

export async function POST(req: NextRequest) {

  const { searchParams } = new URL(req.url);
  const SubSede = searchParams.get("SubSede") || "";
  console.log(SubSede);

  const { Estudiantes } = await req.json();

  // Año actual
  let anio = new Date().getFullYear();

  try {

    // await connectionPool.query(`ALTER TABLE pfc_alumno AUTO_INCREMENT = 0;`);
    // await connectionPool.query(`ALTER TABLE pfc_matricula AUTO_INCREMENT = 0;`);

    // Sumar la cantidad de alumnos registrados en la BD
    const [CantAlumnos]: any = await connectionPool.query(`SELECT COUNT(pfc_alumno.alumno_id) as Cantidad FROM pfc_alumno`);
    let RUM = CantAlumnos[0].Cantidad + 1;

    console.log(CantAlumnos[0]);


    // Recorrer y extraer datos los estudiantes del excel
    for (let i = 0; i < Estudiantes.length; i++) {

      const estudiante = Estudiantes[i];
      let { Nombre, Apellidos, TipoDocumento, NumeroDocumento, Programa, Semestre, Grupo, Jornada, Correo, WhatsApp, Cu } = estudiante


      // Extraer nombres y apellidos
      const nombres = Nombre.split(" ")
      const nombre1 = nombres[0].toUpperCase()
      const nombre2 = nombres[2]

      const apellidos = Apellidos.split(" ")
      const apellido1 = apellidos[0].toUpperCase()
      const apellido2 = apellidos[1]

      // Seleccionamos el programa y grupo del excel y le agregamos el ID asignado en la BD
      if (Programa == 'TL COMP GESTION ADMINISTRATIVA') {
        Programa = 37
        Grupo = 337
      } else if (Programa == 'TL COMP MANTENIMIENTO MOTOS') {
        Programa = 40
        Grupo = 342
      } else if (Programa == 'TL COMP SEGURID SALUD TRABAJO') {
        Programa = 41
        Grupo = 344
      } else if (Programa == 'TL COMP ATENCION PRIMERA INFAN') {
        Programa = 42
        Grupo = 343
      } else if (Programa == 'TL GESTIO SERVICIOS TURISTICOS') {
        Programa = 43
        Grupo = 345
      } else if (Programa == 'TL COMP GESTIÓN AGROAMBIENTAL') {
        Programa = 43
        Grupo = 346
      }

      // Insertar estudiantes en la BD tabla pfc_alumno
      await connectionPool.query(`
      INSERT INTO pfc_alumno (
          alumno_rum,
          tipo_docu_id,
          alumno_num_docu,
          alumno_ape1,
          alumno_ape2,
          alumno_nom1,
          alumno_nom2,
          alumno_celular,
          alumno_email,
          cu
      ) VALUES (
          ${RUM},
          1,
          '${String(NumeroDocumento)}',
          '${apellido1}',
          '${(apellido2 || "")}',
          '${nombre1}',
          '${(nombre2 || "")}',
          '${WhatsApp}',
          '${Correo}',
          '${Cu}'
      )
      `);

      // Insertar estudiantes en la BD tabla pfc_matricula
      await connectionPool.query(`
      INSERT INTO pfc_matricula (
          alumno_id,
          matri_anyo,
          programa,
          semestre,
          matri_estado,
          matri_nuevo,
          matri_fecha,
          semes_lectivo,
          subSedeId,
          GrupoMatriculadoId,
          cu
      ) VALUES (
          '${RUM}',
          '${anio}',
          '${Programa}',
          '${Semestre || 0}',
          0,
          'A',
          curdate(),
          'A',
          '${SubSede}',
          '${Grupo}',
          '${Cu}'
          )
      `);

      // Insertar estudiantes en la BD tabla usario para el inicio de sesion
      await connectionPool.query(`
        INSERT INTO usuario (
            login,
            pass,
            rol,
            tipo,
            idUsuario,
            subsede
        ) VALUES (
            '${String(NumeroDocumento)}',
            '${String(NumeroDocumento)}',
            '3',
            'ESTUDIANTE',
            '${RUM}',
            '${SubSede}'
            )
      `);

      RUM++;

    }

    return NextResponse.json({ body: "Alumnos cargados correctamente" }, { status: 200 });

  } catch (error) {
    console.log(error);
    return NextResponse.json({ body: "Error Al hacer la carga masiva" }, { status: 200 });
  }

}
