
import React, { useState, useEffect, useCallback } from "react";
import {
  Bar,
  Doughnut,
  HorizontalBar,
  Pie
} from "@reactchartjs/react-chart.js";
import Menu from "../../components/Menu";
import Header from "../../components/Header";
import { optionsInvoices ,dataInvoices} from './mock/invoices'
import {optionsBanner, dataAppointments} from './mock/appointments'
import { dataUsers} from './mock/users'
import { dataAmount} from './mock/amount'


import api from "../../services/api";
import Highlights from "./components/Highlights";

import * as S from "./styles";


const Dashboard = () => {


  // console.log('gendata', dataAppointments.labels)
  const [weddings, setWeddings] = useState([]);
  const [user, setUser] = useState([]);
  const [userPerMonth, setUserPerMonth] = useState(0);

  const [isRustico, setIsRustico] = useState([]); //array com todos os rusticos -- usar .length
  const [isModerno, setIsModerno] = useState([]);
  const [isClassico, setIsClassico] = useState([]);

  const [vendorCategory, setVendorCategory] = useState([]);
  const [singleCategory, setSingleCategory] = useState([]);
  const [arrayVendor, setArrayVendor] = useState([]);

  const [created, setCreated] = useState([]);
  const [confirmed, setConfirmed] = useState([]);
  const [canceled, setCanceled] = useState([]);

  const getWedding = async () => {
    const response = await api.get("/wedding").catch((err) => console.log(err));

    // console.log("wed", response.data);
    setIsRustico(response.data.filter((item) => item.STYLE === "rustico"));
    setIsModerno(response.data.filter((item) => item.STYLE === "moderno"));
    setIsClassico(response.data.filter((item) => item.STYLE === "classico"));

    return setWeddings(response.data);
  };

  const getApointments = async () => {
    const response = await api
      .get("/appointment")
      .catch((err) => console.log(err));

    // console.log("appoint", response.data);

    setCreated(response.data.filter((item) => item.STATUS === "CREATED"));
    setConfirmed(response.data.filter((item) => item.STATUS === "CONFIRMED"));
    setCanceled(response.data.filter((item) => item.STATUS === "CANCELED"));

    // return setUserPerMonth(Math.ceil(response.data.length / 30));
  };

  const getUser = async () => {
    const response = await api.get("/user").catch((err) => console.log(err));

    // console.log("user", response.data);

    return setUserPerMonth(Math.ceil(response.data.length / 30));
  };

  const getCategories = async () => {
    const response = await api.get("/invoice").catch((err) => console.log(err));
    // console.log("invoice", response.data);

    const singleCat = response.data
      .map((item) => item.VENDOR_CATEGORY)
      .filter(
        (item, i) =>
          response.data.map((item) => item.VENDOR_CATEGORY).indexOf(item) === i
      );
    // console.log("single", singleCat);

    setArrayVendor(
      singleCat.map((item) => item[0].toUpperCase() + item.slice(1))
    );

    return setSingleCategory(singleCat);
  };

  // useEffect(() => {
  //   getWedding();
  //   getUser();
  //   getCategories();
  //   getApointments();
  // }, []);

  const data2 = {
    labels: ["Criadas", "Confirmadas", "Canceladas"],
    datasets: [
      {
        label: "Visitas",
        data: [22, 34, 271],
        backgroundColor: [
          "rgba(255, 206, 86, 1)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 99, 132, 1)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",

        ],
        borderColor: [
          "rgba(255, 206, 86, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 99, 132, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const data3 = {
    labels: ["Clássico", "Rústico", "Moderno"],
    datasets: [
      {
        label: "Total",
        // data: [isClassico.length, isRustico.length, isModerno.length],
        data: [2200, 1370, 248],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  const data4 = {
    labels: ["Assessoria-de-casamento", "Mobiliario", "Decoracao-cenografia","Buffet", "Servico-de-bar-bartender",  "Banda",   "Dj", "Som-iluminacao", "Brinde-lembrancinhas", "Foto-e-filmagem", "Espaco", "Coral-orquestra", "Bolos-doces", "Danda-dj", "Aluguel-de-carro", "Lista-de-presentes"],
    datasets: [
      {
        label: "Total",
        data: [4, 10, 20, 5, 5, 6, 8, 5, 9, 5, 70, 10, 15, 20, 10, 19],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options2 = {
    layout: {
      padding: {
          left: 20,
          right: 20,
          top: 10,
          bottom: 10
      }
    },
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
    legend: {
      display: false,
    },
  };
  
  const options3 = {
    layout: {
      padding: {
          left: 5,
          right: 5,
          top: 5,
          bottom: 5
      }
    },
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },

      ],
    },
    legend: {
      display: false,
    },
  };
  const options4 = {
    layout: {
      padding: {
          left: 5,
          right: 5,
          top: 5,
          bottom: 5
      }
    },
    
    legend: {
      display: true,
      position: 'bottom',
      fontSize: 8,
    },
  };
  const totalData = [dataAppointments, dataAmount, dataUsers]

  const lastIndex = totalData.length;
  const [activeIndex, setActiveIndex] = useState(0);
  let interval

  const updateActiveIndex = useCallback(() => {
    if (activeIndex <= lastIndex) {
      setActiveIndex(prevState => prevState + 1);
      console.log('Setting index');
    } else {
      clearInterval(interval);
    }
  }, []);

  useEffect(() => {
    interval = setInterval(() => updateActiveIndex(), 10000);
  }, []);

  useEffect(() => {
    if (activeIndex >= lastIndex) {
      setActiveIndex(0);
      clearInterval(interval);
    }
  }, [activeIndex, interval, lastIndex]);


  return (
    <S.Container>
      <Header path='Dashboard Geral'/>
      <Menu />
      <S.ChartBannerWrapper>
        <Bar data={totalData[activeIndex]} options={optionsBanner} width={150} height={40} />
      </S.ChartBannerWrapper>
      <Highlights mediaUsuarios={154} casamentos={126} />
      <S.ContainerSquareChart>
        <S.ChartSquareWrapperDouble>
          <S.LabelChart>
          Invoices
          </S.LabelChart>
          <Bar
            data={dataInvoices}
            options={optionsInvoices}
            width={200}
            height={100}
          />
        </S.ChartSquareWrapperDouble>
      </S.ContainerSquareChart>
      <S.ContainerSquareChart>
        <S.ChartSquareWrapper>
        <S.LabelChart>
          Visitas
          </S.LabelChart>
          <Pie data={data2} width={85} height={85} options={options4} />
        </S.ChartSquareWrapper>
        <S.ChartSquareWrapper>
        <S.LabelChart>
          Tipos de casamentos
          </S.LabelChart>
          <Bar
            data={data3}
            label={true}
            options={options3}
            width={85}
            height={85}
          />
        </S.ChartSquareWrapper>
      </S.ContainerSquareChart>
      <S.ContainerSquareChart>
        {/* <S.ChartSquareWrapper>
          <Doughnut data={data2} />
        </S.ChartSquareWrapper> */}
        <S.ChartSquareWrapperDouble>
          <S.LabelChart>
          Serviços mais utilizados
          </S.LabelChart>
          <Bar
            data={data4}
            options={options2}
            width={200}
            height={100}
          />
        </S.ChartSquareWrapperDouble>
      </S.ContainerSquareChart>
    </S.Container>
  );
};

export default Dashboard;

