import { View, Text, Image } from "@react-pdf/renderer";

const DatosUser = ({ InfoPdf }) => {
  const { InformacionEstudiante} = InfoPdf;

  const formatDate = (date) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(date).toLocaleDateString(undefined, options);
  };


  return (
    <View style={{ display: 'flex', flexDirection: 'row' }}>

      {/* Primer View */}
      <View style={{ padding: '10px', marginTop: '10px' }}>
        <Text style={{ fontSize: '8px', marginBottom: '5px' }}>
          <Text style={{ fontWeight: 'bold' }}>FECHA DE APLICACIÓN:</Text> {formatDate(Date.now())}
        </Text>
        <Text style={{ fontSize: '8px', marginBottom: '5px' }}>
          SEMESTRE ACADÉMICO: {InformacionEstudiante.Semestre}
        </Text>
        <Text style={{ fontSize: '8px', marginBottom: '5px' }}>
          PROGRAMA: {InformacionEstudiante.Programa}
        </Text>
        <Text style={{ fontSize: '8px', marginBottom: '5px' }}>
          NOMBRE: {InformacionEstudiante.nombreEstudiante}
        </Text>
      </View>

      {/* Segundo View */}
      <View style={{ padding: '10px', display: 'flex', flexDirection: 'row', gap: '5' }}>
        <View style={{ border: '1px solid #000', height: '60' }}>
          <Text style={{ fontSize: '10px', marginBottom: '5px', padding: '5px', borderBottom: '1px solid #000' }}>
            PUNTAJE GLOBAL
          </Text>
          <Text style={{ fontSize: '10px', margin: 'auto', textAlign: 'center' }}>
            {InformacionEstudiante.puntajeGlobal}
          </Text>
        </View>
        <View style={{ border: '1px solid #000', height: '60' }}>
          <Text style={{ fontSize: '10px', marginBottom: '5px', padding: '5px', borderBottom: '1px solid #000' }}>
            PERCENTIL PUNTAJE GLOBAL
          </Text>
          <Text style={{ fontSize: '10px', margin: 'auto', textAlign: 'center' }}>
            {InformacionEstudiante.PercentilGlobal}%
          </Text>
        </View>
      </View>

      {/* tercer View */}
      <View style={{ padding: '10px', margin: 'auto', textAlign: 'center' }}>
        <Image
          src="/EscudoUniminuto.png"
          style={{ width: 70, height: 70 }}
        />
      </View>

    </View>

  );
};

export default DatosUser;
