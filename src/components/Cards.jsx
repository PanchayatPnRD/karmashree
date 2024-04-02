import { FaUsersBetweenLines } from "react-icons/fa6";
import { HiMiniCurrencyRupee } from "react-icons/hi2";
import { LuTreeDeciduous } from "react-icons/lu";
import { MdGroups3 } from "react-icons/md";
import { GiPayMoney } from "react-icons/gi";
import { FaPeopleCarryBox } from "react-icons/fa6";

export const Cards = () => {
  return (
    <>
      <div className="bg-banner h-64 flex items-center justify-evenly">
        <div className="size-48 space-y-4 bg-emerald-100 shadow-lg rounded-xl flex flex-col items-center justify-center">
          <FaUsersBetweenLines className="text-green-600 text-7xl" />
          <h4 className="capitalize">total no of sectors</h4>
          <h1 className="text-2xl font-bold tracking-tight">666</h1>
        </div>
        <div className="size-48 space-y-4 bg-emerald-100 shadow-lg rounded-xl flex flex-col items-center justify-center">
          <HiMiniCurrencyRupee className="text-green-600 text-7xl" />
          <h4 className="capitalize">total no of funding</h4>
          <h1 className="text-2xl font-bold tracking-tight">666</h1>
        </div>
        <div className="size-48 space-y-4 bg-emerald-100 shadow-lg rounded-xl flex flex-col items-center justify-center">
          <LuTreeDeciduous className="text-green-600 text-7xl" />
          <h4 className="capitalize">total no of schemes</h4>
          <h1 className="text-2xl font-bold tracking-tight">666</h1>
        </div>
        <div className="size-48 space-y-4 bg-emerald-100 shadow-lg rounded-xl flex flex-col items-center justify-center">
          <MdGroups3 className="text-green-600 text-7xl" />
          <h4 className="capitalize">total project cost</h4>
          <h1 className="text-2xl font-bold tracking-tight">666</h1>
        </div>
        <div className="size-48 space-y-4 bg-emerald-100 shadow-lg rounded-xl flex flex-col items-center justify-center">
          <GiPayMoney className="text-green-600 text-7xl" />
          <h4 className="capitalize">total amount spent</h4>
          <h1 className="text-2xl font-bold tracking-tight">666</h1>
        </div>
        <div className="size-48 space-y-4 bg-emerald-100 shadow-lg rounded-xl flex flex-col items-center justify-center">
          <FaPeopleCarryBox className="text-green-600 text-7xl" />
          <h4 className="capitalize">total no of workers</h4>
          <h1 className="text-2xl font-bold tracking-tight">666</h1>
        </div>
      </div>
    </>
  );
};
