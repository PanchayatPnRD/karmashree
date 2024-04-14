import { FaUsersBetweenLines } from "react-icons/fa6";
import { HiMiniCurrencyRupee } from "react-icons/hi2";
import { LuTreeDeciduous } from "react-icons/lu";
import { MdGroups3 } from "react-icons/md";
import { GiPayMoney } from "react-icons/gi";
import { FaPeopleCarryBox } from "react-icons/fa6";

export const Cards = () => {
  const iconClass = "text-green-400 text-7xl";

  const cardList = [
    { text: "total of sectors", Icon: FaUsersBetweenLines },
    { text: "total no of funding", Icon: HiMiniCurrencyRupee },
    { text: "total no of schemes", Icon: LuTreeDeciduous },
    { text: "total project cost", Icon: MdGroups3 },
    { text: "total amount spent", Icon: GiPayMoney },
    { text: "total no of workers", Icon: FaPeopleCarryBox },
  ];

  return (
    <>
      <div className="bg-banner h-64 flex items-center justify-evenly">
        {cardList.map(({ text, Icon }) => {
          return (
            <div key={text} className="size-48 space-y-4 bg-emerald-100 shadow hover:shadow-xl transition-all duration-300 rounded-xl flex flex-col items-center justify-center cursor-pointer">
              <Icon className={iconClass} />
              <h4 className="capitalize">{text}</h4>
              <h1 className="text-2xl font-bold tracking-tight">666</h1>
            </div>
          );
        })}
      </div>
    </>
  );
};
