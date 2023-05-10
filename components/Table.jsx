import "@styles/Table.css";

const Table = ({ data }) => {
  const linkAudio = (str) => {
    const partes = str.split("\\");
    const posicion = partes.findIndex((parte) => parte === "Pucallpa");

    if (posicion !== -1) {
      const resultado = texto.substring(texto.indexOf(partes[posicion]));
      return resultado;
    } else {
      return str;
    }
  };


  return (
    <table>
      <thead>
        <tr>
          <th style={{width:"10%"}} >Todo</th>
          <th style={{width:"10%"}}>Emisora</th>
          <th style={{width:"10%"}}>Ciudad</th>
          <th style={{width:"10%"}}>Fecha de emisión</th>
          <th style={{width:"10%"}}>Hora de emisión</th>
          <th style={{width:"50%"}}>Grabacion</th>
        </tr>
      </thead>
      <tbody>
        {/*   <td>1/5/2021</td>
          <td>
            <p className="status status-unpaid">Unpaid</p>
          </td>
          <td className="amount">$520.18</td>
          <td>
            <a href="#">INV__1001</a>
          </td> */}

        {data && (
          data.map((dt, i) => {
            <tr key={i}>
              <td >Check</td>
              <td >{dt["Estación"]}</td>
              <td >{dt["Nombre del canal"]}</td>
              <td >{dt["Fecha de emisión"]}</td>
              <td >{dt.Hora}</td>
              <td >{() => linkAudio(dt.Audio)}</td>
            </tr>;
          })
        )}
      </tbody>
    </table>
  );
};

export default Table;
