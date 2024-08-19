import { Carousel } from "flowbite-react";
import { Cards } from "../components/Cards";
import { Footer } from "../components/Footer";
import WestBengalMap from "./WBMap";

const Home = () => {
  const portalList = [
    {
      src: "/assets/img/PublicGrievance.png",
      href: "http://prdgrievance.wb.gov.in/",
    },
    {
      src: "/assets/img/GA.png",
      href: "https://play.google.com/store/apps/details?id=com.igmsmobile",
    },
    {
      src: "/assets/img/OnlineBookingGuestHouse.png",
      href: "https://prdtourism.wb.gov.in/",
    },
    {
      src: "/assets/img/SHIR.png",
      href: "http://www.wbprd.gov.in/HtmlPage/shisti.aspx",
    },
    {
      src: "/assets/img/MRITTIKA.png",
      href: "https://wbcadc.com/",
    },
    {
      src: "/assets/img/bsk.jpg",
      href: "https://bsk.wb.gov.in/",
    },
  ];
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        <div className="flex space-x-2 ">
          <Carousel className="h-[28.5rem] animate-gradient-x bg-gradient-to-l from-white to-blue-600">
            <img
              className="scale-y-[1.2] scale-x-100 transform-gpu "
              src="/assets/banners/KarmashreeBanner.jpg"
              alt="Karmashree"
            />

            <img
              className="scale-y-[1.2] scale-x-100 transform-gpu "
              src="/assets/banners/bsk_banner_638036856070175633.jpg"
              alt="BSK"
            />
            <img
              className="scale-y-[1.2] scale-x-100 transform-gpu"
              src="/assets/banners/DU_638036063636506648.jpg"
              alt="Duare Sarkar"
            />
          </Carousel>
          {/* <div className="border-l-[12px] border-zinc-400">
            <WestBengalMap />
          </div> */}
        </div>
        <div className="h-4"></div>
        {/* <div className="container mx-auto p-4 flex space-x-4">
          {portalList.map(({ href, src }) => {
            return (
              <div key={src} className="border rounded-xl overflow-hidden">
                <a href={href} target="_blank">
                  <img src={src} alt="" />
                </a>
              </div>
            );
          })}
        </div> */}
        <Cards />
        <div className="bg-curve h-[30px]"></div>
      </main>
      <div className="h-40"></div>
      <Footer />
    </div>
  );
};

export default Home;
