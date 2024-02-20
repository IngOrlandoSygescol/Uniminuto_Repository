import { Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  firmaContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  firmaLinea: {
    borderBottom: 1,
    width: "100%", // Ajusta el ancho de la línea según tus necesidades
    marginBottom: 5, // Espacio entre la línea y el texto
  },
  firmaTexto: {
    marginTop: 5, // Espacio entre el texto y la línea
    fontSize:'10px'
  },
  firmaTextoCoor: {
    marginTop: 5, // Espacio entre el texto y la línea
    fontSize:'8px'
  },
});

const Firmas = () => {
  return (
    <View  style={{  flexDirection: 'row', justifyContent:'center', marginTop:'20px' }}>
      <View style={styles.firmaContainer}>
        <View style={styles.firmaLinea} />
        <Text style={styles.firmaTexto}>ZAIRA VIVIANA PAEZ</Text>
        <Text style={styles.firmaTextoCoor}>Coordinadora Educación Contínua</Text>
      </View>
    </View>
  );
};

export default Firmas;
