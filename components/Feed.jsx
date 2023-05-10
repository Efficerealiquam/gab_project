"use client";
import React, { useEffect, useState } from "react";
import SelectBox from "./SelectBox";
import "@styles/Table.css";

const TablePrueba = ({ data }) => {
  const [seleccionados, setSeleccionados] = useState({});
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

  const selectAll = () => {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach((checkbox) => {
      if (checkbox.checked === false) {
        checkbox.checked = true;
      } else {
        checkbox.checked = false;
      }
    });
  };
  return (
    <table>
      <thead>
        <tr>
          <th
            style={{ width: "5%", cursor: "pointer" }}
            onClick={() => selectAll()}
          >
            Todo
          </th>
          <th style={{ width: "7%" }}>Emisora</th>
          <th style={{ width: "5%" }}>Ciudad</th>
          <th style={{ width: "23%" }}>Advertiser</th>
          <th style={{ width: "10%" }}>Orden</th>
          <th style={{ width: "10%" }}>Fecha</th>
          <th style={{ width: "10%" }}>Hora</th>
          <th style={{ width: "30%" }}>Grabacion</th>
        </tr>
      </thead>
      <tbody>
        {data &&
          data.map((dt, i) => (
            <tr key={i}>
              <td style={{ width: "5%" }}>
                <input
                  type="checkbox"
                  onChange={(e) =>
                    setSeleccionados({
                      ...seleccionados,
                      [i]: e.target.checked,
                    })
                  }
                  id={i}
                  className="cbx"
                  style={{ display: "none" }}
                />
                <label htmlFor={i} className="check">
                  <svg width="18px" height="18px" viewBox="0 0 18 18">
                    <path d="M1,9 L1,3.5 C1,2 2,1 3.5,1 L14.5,1 C16,1 17,2 17,3.5 L17,14.5 C17,16 16,17 14.5,17 L3.5,17 C2,17 1,16 1,14.5 L1,9 Z"></path>
                    <polyline points="1 9 7 14 15 4"></polyline>
                  </svg>
                </label>
              </td>
              <td style={{ width: "7%" }}>{dt["Estación"]}</td>
              <td style={{ width: "5%" }}>{dt["Nombre del canal"]}</td>
              <td style={{ width: "25%" }}>{dt.Advertiser}</td>
              <td style={{ width: "10%" }}>{dt.Orden}</td>
              <td style={{ width: "10%" }}>{dt["Fecha de emisión"]}</td>
              <td style={{ width: "10%" }}>{dt.Hora}</td>
              <td style={{ width: "30%" }}>{linkAudio(dt.Audio)}</td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};

function Feed() {
  const [textSelect, settextSelect] = useState({ Advertiser: "" });
  const [textSelect_1, setTextSelect_1] = useState("");
  const [dateSelectInitial, setDateSelectInitial] = useState("");
  const [dateSelectFinish, setDateSelectFinish] = useState("");
  const [dataTable, setDataTable] = useState("");
  const [dAdvertiser, setDAdvertiser] = useState("");
  const [dataFilter, setDataFilter] = useState("");

  const handleOrdenChange = (e) => {
    setTextSelect_1(e.target.value);
  };

  const getDataWithFilters = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/grabaciones/filters", {
        method: "POST",
        body: JSON.stringify({
          fechIni: dateSelectInitial || "",
          fechFin: dateSelectFinish || "",
          Advertiser: textSelect.Advertiser || "",
          Orden: textSelect_1 || "",
        }),
      });
      if (response.ok) {
        const data = await response.json();
        setTextSelect_1();
        setDataFilter(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchAdvertiser = async () => {
      const response = await fetch("/api/grabaciones/advertiser");
      const data2 = await response.json();
      setDAdvertiser(data2);
    };
    fetchAdvertiser();

    const fetchPosts = async () => {
      const response = await fetch("/api/grabaciones");
      const data = await response.json();
      setDataTable(data);
    };
    fetchPosts();
  }, []);

/*   const activePaginationCSS = (e) => {
    let link = document.getElementsByClassName("linkPag");
    let currentValue = 1;
    for (l of link) {
      l.classList.remove("active");
      e.target.classList.add("active");
      currentValue = e.target.value;
    }
  }; */

  return (
    <>
    <section className="feed border border-radius-5px">
      <form
        className="relative w-full background-blank p-2 border-radius-5px flex justify-start items-center "
        onSubmit={getDataWithFilters}
      >
        <div className="relative flex justify-start items-center ">
          <span className="text-label-filter">Advertiser: </span>
          <div className="relative" style={{ height: "42px", width: "250px" }}>
            <SelectBox
              data={dAdvertiser}
              setText={settextSelect}
              text={textSelect.Advertiser}
              type="Advertiser"
            />
          </div>
        </div>
        <div className=" relative flex justify-start items-center ">
          <span className="text-label-filter">Orden: </span>
          <input
            type="text"
            placeholder="Codigo de Orden"
            value={textSelect_1}
            onChange={handleOrdenChange}
            /*   required */
            className="search_input peer outline-none"
          />
        </div>
        <div className=" relative flex justify-start items-center ">
          <span className="text-label-filter" style={{ width: "147px" }}>
            Fecha Inicial:
          </span>
          <input
            type="text"
            placeholder="mm/dd/aaaa"
            value={dateSelectInitial}
            onChange={(e) => setDateSelectInitial(e.target.value)}
            /*   required */
            className="search_input peer outline-none"
          />
        </div>
        <div className=" relative flex justify-start items-center ">
          <span className="text-label-filter" style={{ width: "147px" }}>
            Fecha Final:
          </span>
          <input
            type="text"
            placeholder="mm/dd/aaaa"
            value={dateSelectFinish}
            onChange={(e) => setDateSelectFinish(e.target.value)}
            /*   required */
            className="search_input peer outline-none"
          />
        </div>
        <button
          type="submit"
          className="px-5 py-1.5 text-sm bg-primary-orange rounded-md p-2 text-white ml-2"
        >
          Buscar
        </button>
      </form>
      <TablePrueba data={dataFilter ? dataFilter : dataTable} />

    </section>
    <div className="pagination">
        <button className="btn1">
          {" "}
          <img src="/assets/images/arrow.png" alt="arrow" /> Prev
        </button>
        <ul>
          <li
            className="linkPag active"
            value="1"
           
          >
            1
          </li>
          <li className="linkPag" value="2">
            2
          </li>
          <li className="linkPag" value="3">
            3
          </li>
          <li className="linkPag" value="4">
            4
          </li>
          <li className="linkPag" value="5">
            5
          </li>
          <li className="linkPag" value="6">
            6
          </li>
        </ul>
        <button className="btn2">
        Next <img src="/assets/images/arrow.png" alt="arrow" /> 
        </button>
      </div>
    </>
  );
}

export default Feed;
