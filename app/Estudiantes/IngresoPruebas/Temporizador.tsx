import React, { useEffect, useState } from "react";
type Props = { Time: any; Preguntas: any };

const Temporizador = ({ Time, Preguntas }: Props) => {
  const [Tardanza, setTardanza] = useState(false);
  const [tiempoTotal, setTiempoTotal] = useState<number>(60);

  let timepoTotalCompetencia

  // Convierte las horas a minutos y suma el total con Time?.Minutos
  const totalMinutes = Time?.Hora * 60;
  const tiempoTotalCalculado = isNaN(totalMinutes) ? `0:0` : totalMinutes + (Time?.Minutos || 0);

  Preguntas.forEach((pregunta: any) => {
    timepoTotalCompetencia = pregunta.Hora * 60 + pregunta.Minutos
    if (timepoTotalCompetencia == tiempoTotalCalculado) {
      console.log('si');
    }
  })


  useEffect(() => {
    setTiempoTotal(tiempoTotalCalculado);
  }, [Time?.Hora, Time?.Minutos]);

  useEffect(() => {
    const interval = setInterval(() => {
      // Restar 1 minuto cada minuto
      if (tiempoTotal > 0) {
        setTiempoTotal(tiempoTotal - 1);
      } else if (tiempoTotal == 0) {
        clearInterval(interval); // Detener el intervalo cuando tiempoTotal llega a 0
        alert(`Tiempo finalizado`);
       // window.location.reload()
      }
    }, 60000);

    return () => clearInterval(interval); // Limpia el intervalo cuando el componente se desmonta

  }, [tiempoTotal]);

  return (
    <>
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: "80px" }} className={`${Tardanza && "text-[#eab308]"}`}>
          <p>{tiempoTotal} <span style={{ fontSize: '20px' }}> minutos</span></p>
        </div>
      </div>
    </>
  );
};

export default Temporizador;
