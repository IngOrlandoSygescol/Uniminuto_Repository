import React from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
    estadisticasContainer: {
        display: "flex",
        flexDirection: "column",
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    estadisticasGrafico: {
        width: "100%",
        marginBottom: '5px',
        marginLeft: '5px',
        height: '100px',
        border: '1px solid grey',
        padding: '5px'
    },
    barraContainer: {
        flexDirection: "row",
        alignItems: "center",
        height: "150px",
    },
    barra: {
        width: "60px",
        backgroundColor: "#3B82F6",
        marginRight: "5px",
        borderWidth: 1
    },
    estadisticasRow: {
        flexDirection: "row",
        alignItems: 'flex-end',
        marginLeft: "20px",
        margin: 'auto'
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

const Graficos = (InfoPdf) => {
    const estudiantes = InfoPdf.InfoPdf;
    const totalEstudiantes = estudiantes.length;
    const desempenos = ["Insuficiente", "Mínimo", "Satisfactorio", "Avanzado"];


    return (
        <>
            <View style={{ padding: '5px' }}>
                <View style={styles.estadisticasContainer}>
                    {estudiantes[0].competencias.map((competencia, index) => (
                        <View key={competencia.idCompetencia} style={styles.estadisticasGrafico}>
                            <View>
                                <Text style={{ fontSize: 10, color: 'black', textAlign: 'center', fontWeight: 'bold' }}>{competencia.nomCompetencia}</Text>
                            </View>
                            <View style={styles.barraContainer}>
                                {desempenos.map(desempeno => {
                                    const cantidad = estudiantes.filter(estudiante =>
                                        estudiante.competencias.find(comp => comp.idCompetencia === competencia.idCompetencia && comp.desempeño === desempeno)
                                    ).length;
                                    const porcentaje = ((cantidad / totalEstudiantes) * 100).toFixed(1);
                                    const barraHeight = (porcentaje / totalEstudiantes) * totalEstudiantes; // Ajustar la altura de la barra

                                    return (
                                        <View key={desempeno} style={{ height: '100px' }}>
                                            <View style={{ ...styles.estadisticasRow, height: totalEstudiantes + 'px' }}>
                                                <View style={{ ...styles.barra, height: `${barraHeight}%` }}> </View>
                                            </View>
                                            <Text style={{ fontSize: 7, color: 'black', margin: 'auto', fontWeight: 'bold' }}>{cantidad}</Text>
                                            <View style={{
                                                flexWrap: 'wrap',
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                width: '60px',
                                                textAlign: 'center'
                                            }}>
                                                <Text style={{ fontSize: 7, textAlign: 'center', paddingBottom: '10px' }}>
                                                    Desempeño {translateDesempeno(competencia, desempeno)}
                                                </Text>
                                            </View>
                                        </View>
                                    );
                                })}

                            </View>
                        </View>
                    ))}
                </View>
            </View>
        </>

    );
};


export default Graficos;
