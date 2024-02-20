import React from "react";
import {
  Page,
  Text,
  View,
  StyleSheet,
  Document,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  table: {
    display: "table",
    width: "auto",
    margin: "1%",
    backgroundColor: 'white',
  },
  tableRow: {
    flexDirection: "row",
  },
  tableHeader: {
    width: '25%',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    backgroundColor: "#002060",
    color: "white",
    fontSize: 10,
    padding: 5,
    textAlign: 'center',
    marginLeft: '10px',
  },
  smallColumn: {
    width: '20%',
  },
  wideColumn: {
    width: '35%',
  },
  tableCell: {
    width: '25%',
    borderWidth: 1,
    borderLeftWidth: 1,
    borderTopWidth: 0,
    fontSize: 8,
    padding: 5,
    backgroundColor: 'white',
    color: 'black',
    textAlign: 'center',
    marginLeft: '10px'
  },
});

const Tabla1 = ({ InfoPdf }) => {
  const { reporteEstudiante } = InfoPdf;

  function capitalizeWords(sentence) {
    if (typeof sentence !== 'string' || sentence.length === 0) { return sentence;}
    const words = sentence.split(' '); 
    const capitalizedWords = words.map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    });
    return capitalizedWords.join(' '); 
  }


  return (
    <View style={styles.table}>
      <View style={styles.tableRow}>
        <View style={[styles.tableHeader, styles.wideColumn]}>
          <Text>COMPETENCIAS</Text>
        </View>
        <View style={[styles.tableHeader, styles.smallColumn]}>
          <Text>PUNTAJE</Text>
        </View>
        <View style={[styles.tableHeader, styles.smallColumn]}>
          <Text>NIVEL DE DESEMPEÑO</Text>
        </View>
        <View style={[styles.tableHeader, styles.smallColumn]}>
          <Text>ESTUDIANTES CON PUNTAJE MENOR</Text>
        </View>
        <View style={[styles.tableHeader, styles.smallColumn]}>
          <Text>PERCENTIL DEL DESEMPEÑO</Text>
        </View>
      </View>

      {Object.keys(reporteEstudiante).map((competencia, index) => (
        <View key={index} style={styles.tableRow}>
          <View style={[styles.tableCell, styles.wideColumn]}>
            <Text>{capitalizeWords(reporteEstudiante[competencia].nomCompetencia)} </Text>
          </View>
          <View style={[styles.tableCell, styles.smallColumn]}>
            <Text>{reporteEstudiante[competencia].puntajeCompetencia}</Text>
          </View>
          <View style={[styles.tableCell, styles.smallColumn]}>
            <Text>{(reporteEstudiante[competencia].puntajeCompetencia / 100).toFixed(2)}</Text>
          </View>
          <View style={[styles.tableCell, styles.smallColumn]}>
            <Text>
              {reporteEstudiante[competencia].EstudiantesMenorPuntajePercentilComp}
            </Text>
          </View>
          <View style={[styles.tableCell, styles.smallColumn]}>
            <Text>
              {reporteEstudiante[competencia].percentilIndividual}%
            </Text>
          </View>
        </View>
      ))}
    </View>
  );
};

export default Tabla1;
