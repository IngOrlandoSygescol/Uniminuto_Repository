import { NextResponse } from "next/server";
import connectionPool from "@/config/db";

export async function GET(req: any) {
  try {
    const { searchParams } = req?.nextUrl;
    const num = searchParams?.get("num");

    const [Departamentos]: any = await connectionPool.query(` SELECT * FROM dpto ORDER BY nombre ASC `);
    const [Municipios]: any = await connectionPool.query(`SELECT * FROM municipio ORDER BY municipio_nombre ASC`);
    const [GrupoSanguineo]: any = await connectionPool.query(` SELECT gruposang.id, gruposang.nombre FROM gruposang ORDER BY gruposang.nombre `);
    const [Eps]: any = await connectionPool.query(` SELECT eps.id, eps.nombre FROM eps ORDER BY eps.nombre`);
    const [Ars]: any = await connectionPool.query(` SELECT ars.id, ars.nombre FROM ars ORDER BY ars.nombre`);
    const [Genero]: any = await connectionPool.query(` SELECT * FROM genero`);

    const [DataSave]: any = await connectionPool.query(`
    SELECT
      depa_exp_id,
      muni_exp_id,
      exp_otro_pais,
      alumno_fec_nac,
      alumno_fec_exp,
      muni_nac_id,
      otro_pais_nac,
      est_nac,
      alumno_genero,
      rh_id,
      sisben_id,
      sin_sisben,
      sisben_mun_exp_id,
      eps_id,
      alumno_hmcf
    FROM
      inscripciones
    WHERE
      alumno_num_docu = '${num}'
  `);

    if (DataSave.length === 0) {
      NextResponse.json({ body: "no hay datos" }, { status: 400 });
    }


    return NextResponse.json(
      {
        Departamentos,
        Municipios: Municipios || {},
        GrupoSanguineo,
        Eps,
        Ars,
        Genero,
        DataSave: DataSave[0] || {},
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
    const { num, data }: any = await req?.json();

    const [existeAlumno] = await connectionPool.query(`SELECT alumno_num_docu FROM inscripciones WHERE alumno_num_docu = ?`, [num]);

    if (Array.isArray(existeAlumno) && existeAlumno.length === 0) {
      // Insertar un nuevo registro si el alumno no existe
      await connectionPool.query(
        `INSERT INTO inscripciones (
          depa_exp_id,
          muni_exp_id,
          exp_otro_pais,
          alumno_fec_nac,
          alumno_fec_exp,
          muni_nac_id,
          otro_pais_nac,
          est_nac,
          alumno_genero,
          rh_id,
          sisben_id,
          sin_sisben,
          sisben_mun_exp_id,
          eps_id,
          alumno_hmcf,
          alumno_num_docu
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          data?.MunExpedicion?.departamento_id || "",
          data?.MunExpedicion?.municipio_id || "",
          data.OtroPais,
          data?.DateNacimiento?.substring(0, 10) || "",
          data?.DateExpedicion?.substring(0, 10) || "",
          data?.MunNacimiento?.municipio_id || "",
          data?.OtroPais || "",
          '',
          data?.Genero?.id || "",
          data?.Rh?.id || "",
          data?.SisbenPuntaje || "",
          data?.SisbenPuntaje ? "1" : "0",
          data?.MunicipioExpSisben?.municipio_id || "",
          data?.Eps?.id || "",
          data?.HijoMadreCabeza || "",
          num,
        ]
      );
    } else {
      // Actualizar el registro si el alumno ya existe
      await connectionPool.query(
        `UPDATE inscripciones SET depa_exp_id = '${data?.MunExpedicion?.departamento_id || ""
        }', muni_exp_id = '${data?.MunExpedicion?.municipio_id || ""
        }', exp_otro_pais = '${data.OtroPais}' ,alumno_fec_nac = '${data?.DateNacimiento?.substring(0, 10) || ""
        }', alumno_fec_exp = '${data?.DateExpedicion?.substring(0, 10) || ""
        }', muni_nac_id = '${data?.MunNacimiento?.municipio_id || ""
        }', otro_pais_nac = '${data?.OtroPais || ""
        }', est_nac = '' ,alumno_genero = '${data?.Genero?.id || ""}', rh_id = '${data?.Rh?.id || ""
        }', sisben_id = '${data?.SisbenPuntaje || ""}',sin_sisben = '${data?.SisbenPuntaje ? "1" : "0"
        }', sisben_mun_exp_id = '${data?.MunicipioExpSisben?.municipio_id || ""
        }' ,eps_id = '${data?.Eps?.id || ""}', alumno_hmcf = '${data?.HijoMadreCabeza || ""
        }' WHERE alumno_num_docu = ${num}`
      );

      // Verificar si se guarda la sección del formulario
      const [guarda]: any = await connectionPool.query(`
        SELECT id FROM guardar_seccion_formulario WHERE alumno_num_docu = '${num}' AND seccion_guardada = 'INFORMACION DEL ESTUDIANTE'
      `);

      if (!guarda.length) {
        // Insertar un nuevo registro si no se guarda la sección del formulario
        await connectionPool.query(
          `INSERT INTO guardar_seccion_formulario(alumno_num_docu,guardado,seccion_guardada) VALUES('${num}',1,'INFORMACION DEL ESTUDIANTE')`
        );
      }
    }

    return NextResponse.json({ msg: 'Datos actualizados correctamente' }, { status: 200 });
  } catch (error) {
    console.log(error);
    NextResponse.json({ body: "Internal server error" }, { status: 500 });
  }
}



