import React from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
    estadisticasContainer: {
        display: "flex",
        flexDirection: "column",
        // flexWrap: "wrap",
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    estadisticasTable: {
        display: "table",
        width: "100%",
        marginRight: '5px',
        height: '200px',
    },
    estadisticasRow: {
        flexDirection: "row",
    },
    estadisticasRowHeader: {
        flexDirection: "row",
        alignItems: 'center',
        backgroundColor: '#070E54',
        color: 'white',
        height: '20px',
    },
    estadisticasCell: {
        width: "100%",
        padding: 2,
        borderStyle: "solid",
        borderWidth: 1,
        textAlign: "center",
        fontSize: 7,
    }
});

const translateDesempeno = (competencia, desempeno) => {
    if (competencia.idCompetencia === 35) {
        const translations = {
            "Insuficiente": "A1",
            "Mínimo": "A2",
            "Satisfactorio": "B1",
            "Avanzado": "B2",
        };
        return translations[desempeno] || desempeno;
    }
    return desempeno;
};

const TableEstadisticas = (InfoPdf) => {
    const estudiantes = InfoPdf.InfoPdf;
    const totalEstudiantes = estudiantes.length;
    const desempenos = ["Insuficiente", "Mínimo", "Satisfactorio", "Avanzado"];

    return (
        <View style={{ marginTop: '15px' }}>
            <View style={styles.estadisticasContainer}>
                {estudiantes[0].competencias.map((competencia) => (
                    <View key={competencia.idCompetencia} style={styles.estadisticasTable}>
                        <View style={styles.estadisticasRowHeader}>
                            <Text style={styles.estadisticasCell}>{competencia.nomCompetencia}</Text>
                            <Text style={styles.estadisticasCell}>Cant.</Text>
                        </View>
                        {desempenos.map(desempeno => {
                            const cantidad = estudiantes.filter(estudiante =>
                                estudiante.competencias.find(comp => comp.idCompetencia === competencia.idCompetencia && comp.desempeño === desempeno)
                            ).length;
                            //const porcentaje = ((cantidad / totalEstudiantes) * 100).toFixed(1);

                            return (
                                <View key={desempeno} style={styles.estadisticasRow}>
                                    <Text style={styles.estadisticasCell}>
                                        Desempeño {translateDesempeno(competencia, desempeno)}
                                    </Text>
                                    <Text style={styles.estadisticasCell}>{cantidad}</Text>
                                </View>
                            );
                        })}
                    </View>
                ))}
            </View>

        </View>
    );
};

export default TableEstadisticas;
