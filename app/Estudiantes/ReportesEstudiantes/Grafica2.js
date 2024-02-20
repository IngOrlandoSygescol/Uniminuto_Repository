import { View, Text } from "@react-pdf/renderer";
import randomcolor from "randomcolor";

const Grafica2 = ({ InfoPdf }) => {
  const { reporteEstudiante, totalEstudiantesPrograma, InformacionEstudiante } = InfoPdf;

  const data = Object.keys(reporteEstudiante).map((competencia) => ({
    label: reporteEstudiante[competencia].AbrCompetencia,
    value: reporteEstudiante[competencia].puntajeCompetencia
  }));

  const barColors = data.map(() =>
    randomcolor({
      luminosity: "light",
      format: "rgba",
    })
  );
  const maxValue = Math.max(...data.map((item) => item.value));

  return (
    <View>
      {/* Primer View (Gráfico de columnas en fila) */}
      <Text
        style={{
          fontSize: "12px",
          padding: "5px",
          color: "black",
          marginBottom: "5px",
          marginTop: "5px",
          textAlign: "center"
        }}
      >
        ESTADÍSTICA DE RESULTADOS
      </Text>

      <View style={{ padding: "10px", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
        <Text
          style={{
            fontSize: "10px",
            padding: "5px",
            color: "white",
            marginBottom: "10px",
            marginLeft: "10px",
            textAlign: "left",
            backgroundColor: "#002060",
            width: "150px"
          }}
        >
          Estudiantes de la prueba = {totalEstudiantesPrograma}
        </Text>
        <Text
          style={{
            fontSize: "10px",
            padding: "5px",
            color: "white",
            marginBottom: "10px",
            marginLeft: "10px",
            textAlign: "left",
            backgroundColor: "#002060",
            width: "150px"
          }}
        >
          Estudiantes con menor puntaje global = {InformacionEstudiante.estudiantesMenorPuntajeGlobal}
        </Text>
      </View>

      <View
        style={{
          padding: "10px",
          flexDirection: "row",
          alignItems: "flex-end",
          justifyContent: "center"
        }}
      >
        {data.map((item, index) => (
          <View key={index} style={{ marginRight: 10, textAlign: "center" }}>
            <View
              style={{
                width: 70,
                backgroundColor: barColors[index], // Asigna el color aleatorio
                height: (item.value / maxValue) * 100,
                overflow: "hidden",
                maxHeight: 100,
                wordWrap: "break-word",
                padding: "5px",
                border: 1
              }}
            >
              <Text style={{ fontSize: "8px", textAlign: "center", color: "black", fontWeight: "bold" }}>
                {item.label}
              </Text>
            </View>
            <Text style={{ fontSize: "8px", margin: "auto", color: "black", fontWeight: "bold", marginTop: "5px" }}>
              {Math.round(item.value)}%
            </Text>
          </View>
        ))}

      </View>

      <View
        style={{
          padding: "10px",
          flexDirection: "row",
          alignItems: "flex-end",
          justifyContent: "center"
        }}
      >
        <Text style={{ fontSize: '12px', textAlign: 'center', backgroundColor: '#002060', padding: '10px', color: 'white' }}>
          El {InformacionEstudiante.PercentilGlobal}% de tus compañeros del semestre está por debajo de tu percentil</Text>
      </View>

    </View>
  );
  
};

export default Grafica2;
