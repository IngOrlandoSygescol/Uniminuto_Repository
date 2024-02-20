import {
  Page,
  View,
  Document,
  Text,
  StyleSheet,
} from "@react-pdf/renderer";
import Header from "./Header";
import Table from "./Table";
import TableEstadisticas from "./TableEstadisticas";
import Graficos from "./Graficos";
import Firma from "./Firma";


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
    height: "98vh",
    width: "98%",
    margin: "1vh",
    display: "flex",
  },
});

const DocumentReporte = ({ InfoPdf }) => {

  return (
    <Document>
      {InfoPdf.Cu ? (
        <Page size="A4">
          <View style={{ width: '98%', margin: "1vh", }}>
            <Header InfoPdf={InfoPdf} />
            <Table InfoPdf={InfoPdf.ReporteGeneral} />
          </View>
          <View style={{ width: '98%', margin: "1vh", height: '70%' }}>
            <Text style={{ fontSize: '10px', textAlign: 'center', padding: '5px', backgroundColor: '#D9D9D9' }}>ESTADISTICAS DE RESULTADOS</Text>

            <View style={{ display: 'flex', flexDirection: 'row' }}>
              <View style={{ flex: 1 }}>
                <TableEstadisticas InfoPdf={InfoPdf.ReporteGeneral} Cu={InfoPdf.Cu} />
              </View>
              <View style={{ flex: 1 }}>
                <Graficos InfoPdf={InfoPdf.ReporteGeneral}  />
              </View>
            </View>
            <Firma />
          </View>
        </Page>
      ) : (
        <>
          <Page size="A4" style={styles.page}>
            <View style={styles.marginDocument}>
              <Header InfoPdf={InfoPdf} />
              <Table InfoPdf={InfoPdf.ReporteGeneral} />
            </View>
          </Page>

          <Page size="A4" style={styles.page}>
            <View style={styles.marginDocument}>
              <Text style={{ fontSize: '10px', textAlign: 'center', padding: '5px', backgroundColor: '#D9D9D9' }}>ESTADISTICAS DE RESULTADOS</Text>

              <View style={{ display: 'flex', flexDirection: 'row', height: '60%' }}>
                <View style={{ flex: 1 }}>
                  <TableEstadisticas InfoPdf={InfoPdf.ReporteGeneral} />
                </View>
                <View style={{ flex: 1 }}>
                  <Graficos InfoPdf={InfoPdf.ReporteGeneral} />
                </View>
              </View>
              <Firma />
            </View>
          </Page>
        </>
      )}
    </Document>

  );
};

export default DocumentReporte;
