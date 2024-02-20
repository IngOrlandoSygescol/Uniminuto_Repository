
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
} from "@react-pdf/renderer";
import Tabla1 from "./Tabla1";
import DatosUser from "./DatosUser";
import Interpretacion from "./Interpretacion";
import Grafica2 from "./Grafica2";
import Firmas from "./Firmas";

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#fff",
  },

  title: {
    fontSize: 24,
    margin: "2%",
    marginLeft: "42%",
  },

  title2: {
    fontSize: 24,
    margin: "2%",
    marginLeft: "38%",
  },

  subtitle: {
    fontSize: 16,
    margin: "0.5%",
    marginLeft: "32%",
    marginTop: "5%",
  },

  subtitle2: {
    fontSize: 16,
    margin: "0.5%",
    marginLeft: "32%",
    marginTop: "5%",
  },

  subtitle3: {
    fontSize: 16,
    margin: "0.5%",
    marginLeft: "29%",
  },

  marginDocument: {
   // border: "2px solid black",
    height: "98vh",
    width: "98%",
    margin: "1vh",
    display: "flex",
  },
});

const MyDocument = ({ InfoPdf }) => {

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.marginDocument}>

          {/* Header */}
          <Text style={{ fontSize: '14px', textAlign: 'center', backgroundColor: '#D9D9D9', padding: '10px' }}>FORMATO PRUEBA DE INGRESO - INDIVIDUAL</Text>
          <DatosUser InfoPdf={InfoPdf} />


          {/* Resultados y graficas*/}
          <Text style={{ fontSize: '12px', textAlign: 'center', backgroundColor: '#002060', padding: '10px', color: 'white' }}>REPÓRTE DE RESULTADOS</Text>
          <Tabla1 InfoPdf={InfoPdf} />
          <Grafica2 InfoPdf={InfoPdf} />

          {/* Rangos desempeno*/}
          <Text style={{ fontSize: '12px', textAlign: 'center', backgroundColor: '#002060', padding: '10px', color: 'white' }}>RANGO DE NIVEL DE DESEMPEÑO DE LAS COMPETENCIAS EVALUADAS</Text>
          <Interpretacion InfoPdf={InfoPdf} />

          {/*Firmas*/}
          <Firmas />

        </View>
      </Page>

    </Document>
  );
};

export default MyDocument;
