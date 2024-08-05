import { FaUsersBetweenLines } from "react-icons/fa6";
import { HiMiniCurrencyRupee } from "react-icons/hi2";
import { LuTreeDeciduous } from "react-icons/lu";
import { MdGroups3 } from "react-icons/md";
import { GiPayMoney } from "react-icons/gi";
import { FaPeopleCarryBox } from "react-icons/fa6";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { devApi } from "../WebApi/WebApi";
import CountUp from "react-countup";
export const Cards = () => {
  const iconClass = "text-green-400 text-7xl";

  const { data: Stats } = useQuery({
    queryKey: ["dashboardData"],
    queryFn: async () => {
      const axiosInstance = axios.create({
        baseURL: devApi,
      });

      axiosInstance.interceptors.request.use((config) => {
        config.headers["x-api-key"] = import.meta.env.VITE_X_API_KEY;
        return config;
      });
      const response = await axiosInstance.get(
        "/api/schememaster/home_dashboard"
      );
      return response.data.result;
    },
  });
  const formatNumberToINR = (number, withDecimal) => {
    return new Intl.NumberFormat("en-IN", {
      minimumFractionDigits: withDecimal ? 2 : 0,
      maximumFractionDigits: withDecimal ? 2 : 0,
    }).format(number);
  };

  const cardList = [
    {
      text: "total no of funding department",
      Icon: MdGroups3,
      //value: formatNumberToINR(Stats?.["Total No Of Funding"], false),
      value: (
        <CountUp
          start={0}
          end={Stats?.["Total No Of Funding"]}
          duration={2.75}
          // delay={0}
        />
      ),
    },
    {
      text: "total of sectors",
      Icon: FaUsersBetweenLines,
      //value: formatNumberToINR(Stats?.["Total Of Sectors"], false),
      value: (
        <CountUp
          start={0}
          end={Stats?.["Total Of Sectors"]}
          duration={2.75}
          // delay={0}
        />
      ),
    },
    {
      text: "total no of schemes",
      Icon: LuTreeDeciduous,
      //value: formatNumberToINR(Stats?.["Total No Of Schemes"], false),
      value: (
        <CountUp
          start={0}
          end={Stats?.["Total No Of Schemes"]}
          duration={2.75}
          // delay={0}
        />
      ),
    },
    {
      text: "total project cost(rs)",
      Icon: HiMiniCurrencyRupee,

      value: (
        <CountUp
          start={0}
          end={Stats?.["Total Project Cost"]}
          duration={2.75}
          decimals={2}
          prefix="₹"
          // delay={0}
        />
      ),
    },
    {
      text: "total amount spent",
      Icon: GiPayMoney,

      value: (
        <CountUp
          start={0}
          end={Stats?.["Total Amount Spent"]}
          duration={2.75}
          decimals={2}
          prefix="₹"
          // delay={0}
        />
      ),
    },
    {
      text: "total no of workers",
      Icon: FaPeopleCarryBox,
      //value: formatNumberToINR(Stats?.["Total No Of Workers"], false),
      value: (
        <CountUp
          start={0}
          end={formatNumberToINR(Stats?.["Total No Of Workers"], false)}
          duration={2.75}
          // delay={0}
        />
      ),
    },
  ];

  return (
    <>
      <div className="bg-banner h-64 flex items-center justify-evenly">
        {cardList.map(({ text, Icon, value }) => {
          return (
            <div
              key={text}
              className="size-48 space-y-4 bg-emerald-100 shadow hover:shadow-xl transition-all duration-300 rounded-xl flex flex-col items-center justify-center cursor-pointer"
            >
              <Icon className={iconClass} />
              <h4 className="capitalize text-center">{text}</h4>
              <h1 className="text-2xl font-bold tracking-tight">
                {value == null ? "0" : value}
              </h1>
            </div>
          );
        })}
      </div>
    </>
  );
};
