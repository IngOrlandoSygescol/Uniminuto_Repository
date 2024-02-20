import React from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
    table: {
        display: "table",
        width: "100%",
        borderStyle: "solid",
        borderWidth: 1,
        height: 'auto'
    },
    tableRow: {
        // margin: "auto",
        flexDirection: "row",
    },
    columnHeader: {
        width: "21%",
        padding: 5,
        borderRightWidth: 1,
        borderBottom: 1,
        textAlign: 'center',
        fontSize: 7,
        color: 'white',
        backgroundColor: '#070E54',
    },
    cellHeaderEstudiante: {
        width: "24.5%",
        borderRightColor: "#000",
        borderRightWidth: 1,
        borderBottom: 1,
        fontSize: 7,
        textAlign: 'center',
        backgroundColor: '#070E54',
        color: 'white',
        paddingTop: '20px'
    },
    cell: {
        width: "10%",
        borderRightWidth: 1,
        borderBottom: 1,
        fontSize: 7,
        textAlign: 'center',
        padding: 2
    },
    cellName: {
        width: "35%",
        borderRightColor: "#000",
        borderRightWidth: 1,
        borderBottom: 1,
        fontSize: 6,
        marginTop: '2px'
    },
    cellPuntaje: {
        width: "7%",
        borderRightColor: "#000",
        borderRightWidth: 1,
        borderBottom: 1,
        fontSize: 7,
        textAlign: 'center',
        backgroundColor: '#070E54',
        color: 'white',
        paddingTop: '15px'
    },
    fragmentStyles: {
        display: 'flex',
        flexDirection: 'column',
    }

});

const Table = (InfoPdf) => {
    const data = InfoPdf.InfoPdf
    return (

        <View style={{ marginTop: '5px' }}>
            <View style={styles.table}>
                <View style={styles.tableRow}>
                    <Text style={styles.cellHeaderEstudiante}>ESTUDIANTES</Text>
                    {data[0].competencias.map((competencia, index) => (
                        <React.Fragment key={competencia.idCompetencia}>
                            <Text style={styles.columnHeader}>
                                <Text style={{paddingTop:'20px'}}>{competencia.nomCompetencia}</Text>
                                {'\n\n'}
                                <Text>
                                    Pun    |  Pond    | Result
                                </Text>
                            </Text>
                        </React.Fragment>
                    ))}
                    <Text style={styles.cellPuntaje}>Puntaje Global</Text>
                </View>

                {data.map((estudiante) => (
                    <View key={estudiante.idEstudiante} style={styles.tableRow}>
                        <Text style={styles.cellName}>{estudiante.nombreEstudiante}</Text>
                        {estudiante.competencias.map((competencia) => (
                            <React.Fragment key={competencia.idCompetencia}>
                                <Text style={styles.cell}>{competencia.puntajeCompetencia}</Text>
                                <Text style={styles.cell}>{competencia.nPonderacion}</Text>
                                <Text style={styles.cell}>{competencia.puntajePonderacionComp}</Text>
                            </React.Fragment>
                        ))}
                        <Text style={styles.cell}>{estudiante.puntajeGlobal}</Text>
                    </View>
                ))}
            </View>
        </View>

    );
};

export default Table;
