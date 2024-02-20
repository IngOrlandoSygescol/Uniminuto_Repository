export interface SubModulo {
    SubModulo: string;
    Icon: string;
    Link: string;
    id: number;
}

export interface Modulo {
    key: number;
    NombreModulo: string;
    SubModulos: SubModulo[];
}

const navDocente: Modulo[] = [
    {
        "key": 100,
        "NombreModulo": "CONSULTAS",
        "SubModulos": [
            {
                "SubModulo": "DATOS UNIVERSIDAD",
                "Icon": "Datos",
                "Link": "Configuracion/Datos",
                "id": 10
            },
            {
                "SubModulo": "PROGRAMAS",
                "Icon": "Programas",
                "Link": "Configuracion/Programas",
                "id": 11
            },
            {
                "SubModulo": "CONSULTA ESTUDIANTES",
                "Icon": "Estudiantes",
                "Link": "Estudiantes",
                "id": 19
            },
        ]
    },
    {
        "key": 101,
        "NombreModulo": "PREGUNTAS",
        "SubModulos": [
            {
                "SubModulo": "CARGAR PREGUNTAS",
                "Icon": "ParametrosPruebas",
                "Link": "Pruebas/IngresoPreguntas",
                "id": 22
            },
            {
                "SubModulo": "BANCO DE PREGUNTAS",
                "Icon": "ParametrosPruebas",
                "Link": "Pruebas/BancoPreguntas",
                "id": 23
            },

        ]
    },
    {
        "key": 101,
        "NombreModulo": "REPORTES",
        "SubModulos": [
            {
                "SubModulo": "Reporte Estudiantes",
                "Icon": "Estudiantes",
                "Link": "Estudiantes/ReporteGeneral",
                "id": 33
            },
        

        ]
    },

]

const navCoordinador: Modulo[] = [

    {
        "key": 101,
        "NombreModulo": "CONSULTAS",
        "SubModulos": [
            {
                "SubModulo": "DATOS UNIVERSIDAD",
                "Icon": "Datos",
                "Link": "Configuracion/Datos",
                "id": 10
            },
            {
                "SubModulo": "PROGRAMAS",
                "Icon": "Programas",
                "Link": "Configuracion/Programas",
                "id": 11
            },
            {
                "SubModulo": "PROFESORES",
                "Icon": "Profesores",
                "Link": "Configuracion/Profesores",
                "id": 12
            },
            {
                "SubModulo": "SEMESTRES Y GRUPOS",
                "Icon": "Grupos",
                "Link": "Configuracion/SemestreGrupos",
                "id": 13
            },
            {
                "SubModulo": "COMPETENCIAS",
                "Icon": "Competencias",
                "Link": "Configuracion/Competencias",
                "id": 15
            },

        ]
    },

    {
        "key": 102,
        "NombreModulo": "PARAMETROS",
        "SubModulos": [
            {
                "SubModulo": "FECHAS PARA PRUEBAS",
                "Icon": "ParametrosPruebas",
                "Link": "Configuracion/ParametrosPruebas",
                "id": 16
            }

        ]
    },
    {
        "key": 103,
        "NombreModulo": "PREGUNTAS",
        "SubModulos": [
            {
                "SubModulo": "APROBACIÓN PREGUNTAS",
                "Icon": "ParametrosPruebas",
                "Link": "Pruebas/AprobarPrueba",
                "id": 23
            }
        ]
    },

    {
        "key": 103,
        "NombreModulo": "ESTUDIANTES",
        "SubModulos": [
            {
                "SubModulo": "CONSULTA ESTUDIANTES",
                "Icon": "Estudiantes",
                "Link": "Estudiantes",
                "id": 19
            },
            {
                "SubModulo": "Reporte Estudiantes",
                "Icon": "Estudiantes",
                "Link": "Estudiantes/ReporteGeneral",
                "id": 33
            },
        ]
    },
 
]

const navEstudiante: Modulo[] = [
    {
        "key": 100,
        "NombreModulo": "CONSULTAS",
        "SubModulos": [
            {
                "SubModulo": "DATOS UNIVERSIDAD",
                "Icon": "Datos",
                "Link": "Configuracion/Datos",
                "id": 10
            },
            {
                "SubModulo": "QUEREMOS CONOCERTE",
                "Icon": "Formulario",
                "Link": "Estudiantes/Formulario",
                "id": 21
            }
        ]
    },
    {
        "key": 100,
        "NombreModulo": "PRUEBAS",
        "SubModulos": [
            {
                "SubModulo": "INGRESO DE PRUEBAS",
                "Icon": "IngresoPruebas",
                "Link": "Estudiantes/IngresoPruebas",
                "id": 20
            },
            {
                "SubModulo": "REPORTE DE PRUEBAS",
                "Icon": "Formulario",
                "Link": "Estudiantes/ReportesEstudiantes",
                "id": 33
            },
        ]
    },
]

const navSoporte: Modulo[] = [
    {
        "key": 100,
        "NombreModulo": "SOPORTE",
        "SubModulos": [
            {
                "SubModulo": "AGREGAR MÓDULOS",
                "Icon": "AddModulos",
                "Link": "Seguridad/AddModulos",
                "id": 5
            },
            {
                "SubModulo": "PERFILES DE ACCESO",
                "Icon": "Permisos",
                "Link": "Seguridad/ModulosPerfiles",
                "id": 6
            }
        ]
    },
    {
        "key": 101,
        "NombreModulo": "CONFIGURACIÓN",
        "SubModulos": [
            {
                "SubModulo": "RECTORÍAS Y SEDES",
                "Icon": "Rectorias",
                "Link": "Configuracion/SedeRectoria",
                "id": 7
            },
            {
                "SubModulo": "CENTRO UNIVERSITARIO",
                "Icon": "Sedes",
                "Link": "Configuracion/SubSedes",
                "id": 8
            },
            {
                "SubModulo": "COLABORADORES",
                "Icon": "Colaboradores",
                "Link": "Configuracion/Colaboradores",
                "id": 9
            },
            {
                "SubModulo": "DATOS UNIVERSIDAD",
                "Icon": "Datos",
                "Link": "Configuracion/Datos",
                "id": 10
            },
            {
                "SubModulo": "PROGRAMAS",
                "Icon": "Programas",
                "Link": "Configuracion/Programas",
                "id": 11
            },
            {
                "SubModulo": "PROFESORES",
                "Icon": "Profesores",
                "Link": "Configuracion/Profesores",
                "id": 12
            },
            {
                "SubModulo": "SEMESTRES Y GRUPOS",
                "Icon": "Grupos",
                "Link": "Configuracion/SemestreGrupos",
                "id": 13
            },
            {
                "SubModulo": "CARGA MASIVA",
                "Icon": "Masiva",
                "Link": "Configuracion/CargaMasiva",
                "id": 14
            },
            {
                "SubModulo": "COMPETENCIAS",
                "Icon": "Competencias",
                "Link": "Configuracion/Competencias",
                "id": 15
            },
            {
                "SubModulo": "FECHAS PARA PRUEBAS",
                "Icon": "ParametrosPruebas",
                "Link": "Configuracion/ParametrosPruebas",
                "id": 16
            }
        ]
    },
    {
        "key": 102,
        "NombreModulo": "ESTUDIANTES",
        "SubModulos": [
            {
                "SubModulo": "CONSULTA ESTUDIANTES",
                "Icon": "Estudiantes",
                "Link": "Estudiantes",
                "id": 19
            },
            {
                "SubModulo": "REPORTE DE PRUEBAS",
                "Icon": "Programas",
                "Link": "Estudiantes/ReportesEstudiantes",
                "id": 33
            }
        ]
    }
]

const navAdmin: Modulo[] = [
    // {
    //     "key": 100,
    //     "NombreModulo": "SOPORTE",
    //     "SubModulos": [
    //         {
    //             "SubModulo": "AGREGAR MÓDULOS",
    //             "Icon": "AddModulos",
    //             "Link": "Seguridad/AddModulos",
    //             "id": 5
    //         },
    //         {
    //             "SubModulo": "PERFILES DE ACCESO",
    //             "Icon": "Permisos",
    //             "Link": "Seguridad/ModulosPerfiles",
    //             "id": 6
    //         }
    //     ]
    // },
    {
        "key": 101,
        "NombreModulo": "CONFIGURACIÓN",
        "SubModulos": [
            {
                "SubModulo": "RECTORÍAS Y SEDES",
                "Icon": "Rectorias",
                "Link": "Configuracion/SedeRectoria",
                "id": 7
            },
            {
                "SubModulo": "CENTRO UNIVERSITARIO",
                "Icon": "Sedes",
                "Link": "Configuracion/SubSedes",
                "id": 8
            },
            {
                "SubModulo": "COLABORADORES",
                "Icon": "Colaboradores",
                "Link": "Configuracion/Colaboradores",
                "id": 9
            },
            {
                "SubModulo": "DATOS UNIVERSIDAD",
                "Icon": "Datos",
                "Link": "Configuracion/Datos",
                "id": 10
            },
            {
                "SubModulo": "PROGRAMAS",
                "Icon": "Programas",
                "Link": "Configuracion/Programas",
                "id": 11
            },
            {
                "SubModulo": "PROFESORES",
                "Icon": "Profesores",
                "Link": "Configuracion/Profesores",
                "id": 12
            },
            {
                "SubModulo": "SEMESTRES Y GRUPOS",
                "Icon": "Grupos",
                "Link": "Configuracion/SemestreGrupos",
                "id": 13
            },
            {
                "SubModulo": "CARGA MASIVA",
                "Icon": "Masiva",
                "Link": "Configuracion/CargaMasiva",
                "id": 14
            },
            {
                "SubModulo": "COMPETENCIAS",
                "Icon": "Competencias",
                "Link": "Configuracion/Competencias",
                "id": 15
            },
            {
                "SubModulo": "FECHAS PARA PRUEBAS",
                "Icon": "ParametrosPruebas",
                "Link": "Configuracion/ParametrosPruebas",
                "id": 16
            }
        ]
    },
    {
        "key": 102,
        "NombreModulo": "ESTUDIANTES",
        "SubModulos": [
            {
                "SubModulo": "CONSULTA ESTUDIANTES",
                "Icon": "Estudiantes",
                "Link": "Estudiantes",
                "id": 19
            },
            {
                "SubModulo": "Reporte Estudiantes",
                "Icon": "Estudiantes",
                "Link": "Estudiantes/ReporteGeneral",
                "id": 33
            },
        
        ]
    }

]

const navRector: Modulo[] = [
    {
        "key": 100,
        "NombreModulo": "CONFIGURACIÓN",
        "SubModulos": [
            {
                "SubModulo": "RECTORÍAS Y SEDES",
                "Icon": "Rectorias",
                "Link": "Configuracion/SedeRectoria",
                "id": 7
            },
            {
                "SubModulo": "CENTRO UNIVERSITARIO",
                "Icon": "Sedes",
                "Link": "Configuracion/SubSedes",
                "id": 8
            },
            {
                "SubModulo": "COLABORADORES",
                "Icon": "Colaboradores",
                "Link": "Configuracion/Colaboradores",
                "id": 9
            },
            {
                "SubModulo": "DATOS UNIVERSIDAD",
                "Icon": "Datos",
                "Link": "Configuracion/Datos",
                "id": 10
            },
            {
                "SubModulo": "PROGRAMAS",
                "Icon": "Programas",
                "Link": "Configuracion/Programas",
                "id": 11
            },
            {
                "SubModulo": "PROFESORES",
                "Icon": "Profesores",
                "Link": "Configuracion/Profesores",
                "id": 12
            },
            {
                "SubModulo": "SEMESTRES Y GRUPOS",
                "Icon": "Grupos",
                "Link": "Configuracion/SemestreGrupos",
                "id": 13
            },
            {
                "SubModulo": "CARGA MASIVA",
                "Icon": "Masiva",
                "Link": "Configuracion/CargaMasiva",
                "id": 14
            },
            {
                "SubModulo": "COMPETENCIAS",
                "Icon": "Competencias",
                "Link": "Configuracion/Competencias",
                "id": 15
            },
            {
                "SubModulo": "FECHAS PARA PRUEBAS",
                "Icon": "ParametrosPruebas",
                "Link": "Configuracion/ParametrosPruebas",
                "id": 16
            }
        ]
    },
    // {
    //     "key": 102,
    //     "NombreModulo": "SOPORTE",
    //     "SubModulos": [
    //         {
    //             "SubModulo": "AGREGAR MÓDULOS",
    //             "Icon": "AddModulos",
    //             "Link": "Seguridad/AddModulos",
    //             "id": 5
    //         },
    //         {
    //             "SubModulo": "PERFILES DE ACCESO",
    //             "Icon": "Permisos",
    //             "Link": "Seguridad/ModulosPerfiles",
    //             "id": 6
    //         }
    //     ]
    // },
    {
        "key": 103,
        "NombreModulo": "ESTUDIANTES",
        "SubModulos": [
            {
                "SubModulo": "CONSULTA ESTUDIANTES",
                "Icon": "Estudiantes",
                "Link": "Estudiantes",
                "id": 19
            },
            {
                "SubModulo": "PRESENTACIÓN PRUEBAS",
                "Icon": "IngresoPruebas",
                "Link": "Estudiantes/IngresoPruebas",
                "id": 20
            },
            {
                "SubModulo": "REPORTE DE PRUEBAS",
                "Icon": "",
                "Link": "Estudiantes/ReportesEstudiantes",
                "id": 33
            }
        ]
    }
]

export { navDocente, navCoordinador, navEstudiante, navAdmin, navRector, navSoporte }