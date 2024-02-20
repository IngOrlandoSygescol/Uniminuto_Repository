import { Text, View, Image } from "@react-pdf/renderer";

const Header = ({ InfoPdf }) => {

    return (
        <View style={{ display: 'flex', flexDirection: 'row' }}>
            <View style={{ padding: '10px', margin: 'auto', textAlign: 'center' }}>
                <Image
                    src="/EscudoUniminuto.png"
                    style={{ width: 60, height: 60 }}
                />
            </View>
            <View style={{ alignContent: 'center', alignItems: 'center', backgroundColor: '#002060' }}>
                {/* Header */}
                <Text style={{ fontSize: '12px', textAlign: 'center', padding: '5px', color: 'white', marginBottom: '-2px' }}>UNIVERSIDAD UNIMINUTO - {InfoPdf.Cu ? InfoPdf.Cu : 'CENTRO REGIONAL TOLIMA'}</Text>
                <Text style={{ fontSize: '10px', textAlign: 'center', padding: '5px', color: 'white', marginBottom: '-2px' }}>Cl. 87 #20-98 - Ibagué Tolima</Text>
                <Text style={{ fontSize: '10px', textAlign: 'center', padding: '5px', color: 'white', marginBottom: '-2px' }}>317 4017624  -  608 -2 76 26 45</Text>
                <Text style={{ fontSize: '10px', textAlign: 'center', padding: '5px', color: 'white', marginBottom: '-2px' }}>Resolución 10345 del 1 de agosto de 1990 MEN</Text>
                <View style={{ backgroundColor: '#D9D9D9', alignContent: 'center', alignItems: 'center', height: '20px' }}>
                    <Text style={{ fontSize: '8px', textAlign: 'center', padding: '5px', marginBottom: '-2px' }}>FORMATO GENERAL CON LA INFORMACIÓN DE RESULTADOS DE LAS PRUEBAS INGRESO A LOS ESTUDIANTES</Text>
                    {/* <Text style={{ fontSize: '8px', textAlign: 'center', padding: '5px' }}>PROGRAMA: {InfoPdf.ReporteGeneral[0].programa} - PRUEBA {InfoPdf.IdPrueba}</Text> */}
                </View>
            </View>
        </View>
    );
};

export default Header;
