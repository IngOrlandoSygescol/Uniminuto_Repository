import { View, Text } from "@react-pdf/renderer";

const Interpretacion = ({ InfoPdf }) => {
  return (
    <View style={{ display: 'flex', flexDirection: 'row', marginTop: '5px' }}>
      {/* Tabla 1 */}
      <View style={{ flex: 1, border: '1px solid #000', marginBottom: '10px' }}>
        <Text style={{ fontSize: '8px', marginBottom: '5px', padding: '5px', backgroundColor: '#002060', color: 'white', textAlign: 'center', height: '40px' }}>
          NIVEL DE DESEMPEÑO
        </Text>
        <Text style={{ fontSize: '10px', textAlign: 'center', borderBottom: 1, padding: '5px' }}>Insuficiente</Text>
        <Text style={{ fontSize: '10px', textAlign: 'center', borderBottom: 1, padding: '5px' }}>Mínimo</Text>
        <Text style={{ fontSize: '10px', textAlign: 'center', borderBottom: 1, padding: '5px' }}>Satisfactorio</Text>
        <Text style={{ fontSize: '10px', textAlign: 'center', padding: '5px' }}>Avanzado</Text>
      </View>

      {/* Tabla 2 */}
      <View style={{ flex: 1, border: '1px solid #000', marginBottom: '10px' }}>
        <Text style={{ fontSize: '8px', marginBottom: '5px', padding: '5px', backgroundColor: '#002060', color: 'white', textAlign: 'center', height: '40px' }}>
          MATEMÁTICAS (MATE)
        </Text>
        <Text style={{ fontSize: '10px', textAlign: 'center', borderBottom: 1, padding: '5px' }}>0 - 35</Text>
        <Text style={{ fontSize: '10px', textAlign: 'center', borderBottom: 1, padding: '5px' }}>36 - 50</Text>
        <Text style={{ fontSize: '10px', textAlign: 'center', borderBottom: 1, padding: '5px' }}>51 - 65</Text>
        <Text style={{ fontSize: '10px', textAlign: 'center', padding: '5px' }}>66 - 100</Text>
      </View>

      {/* Tabla 3 */}
      <View style={{ flex: 1, border: '1px solid #000', marginBottom: '10px' }}>
        <Text style={{ fontSize: '8px', marginBottom: '5px', padding: '5px', backgroundColor: '#002060', color: 'white', textAlign: 'center', height: '40px' }}>
          TECNOLOGÍAS DE LA INFORMACIÓN Y COMUNICACIÓN (TICS)
        </Text>
        <Text style={{ fontSize: '10px', textAlign: 'center', borderBottom: 1, padding: '5px' }}>0 - 40</Text>
        <Text style={{ fontSize: '10px', textAlign: 'center', borderBottom: 1, padding: '5px' }}>41 - 55</Text>
        <Text style={{ fontSize: '10px', textAlign: 'center', borderBottom: 1, padding: '5px' }}>56 - 70</Text>
        <Text style={{ fontSize: '10px', textAlign: 'center', padding: '5px' }}>71 - 100</Text>
      </View>

      {/* Tabla 4 */}
      <View style={{ flex: 1, border: '1px solid #000', marginBottom: '10px' }}>
        <Text style={{ fontSize: '8px', padding: '5px', backgroundColor: '#002060', color: 'white', textAlign: 'center', height: '40px' }}>
          INGLÉS (INGL)
        </Text>
        <View style={{ display: 'flex', flexDirection: 'row' }}>
          <Text style={{ fontSize: '10px', textAlign: 'center', borderBottom: 1, borderRight: 1, padding: '9px', width: '100%' }}>A</Text>
          <Text style={{ fontSize: '10px', textAlign: 'center', borderBottom: 1, padding: '9px', width: '100%' }}>0 - 47</Text>
        </View>
        <View style={{ display: 'flex', flexDirection: 'row' }}>
          <Text style={{ fontSize: '10px', textAlign: 'center', borderBottom: 1, borderRight: 1, padding: '6px', width: '100%' }}>A1</Text>
          <Text style={{ fontSize: '10px', textAlign: 'center', borderBottom: 1, padding: '6px', width: '100%' }}>48 - 57</Text>
        </View>
        <View style={{ display: 'flex', flexDirection: 'row' }}>
          <Text style={{ fontSize: '10px', textAlign: 'center', borderBottom: 1, borderRight: 1, padding: '6px', width: '100%' }}>A2</Text>
          <Text style={{ fontSize: '10px', textAlign: 'center', borderBottom: 1, padding: '6px', width: '100%' }}>58 - 67</Text>
        </View>
        <View style={{ display: 'flex', flexDirection: 'row' }}>
          <Text style={{ fontSize: '10px', textAlign: 'center', borderBottom: 1, borderRight: 1, padding: '7px', width: '100%' }}>B1</Text>
          <Text style={{ fontSize: '10px', textAlign: 'center', borderBottom: 1, padding: '7px', width: '100%' }}>68 - 78</Text>
        </View>
        <View style={{ display: 'flex', flexDirection: 'row' }}>
          <Text style={{ fontSize: '10px', textAlign: 'center', borderBottom: 1, borderRight: 1, padding: '7px', width: '100%' }}>B2</Text>
          <Text style={{ fontSize: '10px', textAlign: 'center', borderBottom: 1, padding: '7px', width: '100%' }}>79 - 100</Text>
        </View>
      </View>

      {/* Tabla 5 */}
      <View style={{ flex: 1, border: '1px solid #000', marginBottom: '10px' }}>
        <Text style={{ fontSize: '8px', marginBottom: '5px', padding: '5px', backgroundColor: '#002060', color: 'white', textAlign: 'center', height: '40px' }}>
          LENGUAJE (LENG)
        </Text>
        <Text style={{ fontSize: '10px', textAlign: 'center', borderBottom: 1, padding: '5px' }}>0 - 40</Text>
        <Text style={{ fontSize: '10px', textAlign: 'center', borderBottom: 1, padding: '5px' }}>41 - 55</Text>
        <Text style={{ fontSize: '10px', textAlign: 'center', borderBottom: 1, padding: '5px' }}>56 - 70</Text>
        <Text style={{ fontSize: '10px', textAlign: 'center', padding: '5px' }}>71 - 100</Text>
      </View>

      {/* Tabla 6 */}
      <View style={{ flex: 1, border: '1px solid #000', marginBottom: '10px' }}>
        <Text style={{ fontSize: '8px', marginBottom: '5px', padding: '5px', backgroundColor: '#002060', color: 'white', textAlign: 'center', height: '40px' }}>
          COMUNICACIÓN Y RELACIONAMIENTO GENÉRICO (CREG)
        </Text>
        <Text style={{ fontSize: '10px', textAlign: 'center', borderBottom: 1, padding: '5px' }}>0 - 40</Text>
        <Text style={{ fontSize: '10px', textAlign: 'center', borderBottom: 1, padding: '5px' }}>41 - 55</Text>
        <Text style={{ fontSize: '10px', textAlign: 'center', borderBottom: 1, padding: '5px' }}>56 - 70</Text>
        <Text style={{ fontSize: '10px', textAlign: 'center', padding: '5px' }}>71 - 100</Text>
      </View>
    </View>
  );
};

export default Interpretacion;
