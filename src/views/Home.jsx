import { Carousel } from "flowbite-react";
import { Cards } from "../components/Cards";
import { Footer } from "../components/Footer";
import curveBorder from "../assets/img/curve_border.jpg"

const Home = () => {
  

  return (
    <div className="h-80">
      <Carousel>
        <img
          src="../src/assets/banners/KarmashreeBanner.jpg"
          alt="Karmashree"
        />
        <img
          src="../src/assets/banners/bsk_banner_638036856070175633.jpg"
          alt="BSK"
        />
        <img
          src="../src/assets/banners/DU_638036063636506648.jpg"
          alt="Duare Sarkar"
        />
      </Carousel>
      <div className="container mx-auto p-4 flex space-x-4">
        <div className="border rounded-xl overflow-hidden">
          <a href="http://www.prdgrievance.in/" target="_blank">
            <img
              src="../src/assets/img/PublicGrievance.png"
              alt=""
              className="img-fluid"
            />
          </a>
        </div>
        <div className="border rounded-xl overflow-hidden">
          <a
            href="https://play.google.com/store/apps/details?id=com.igmsmobile"
            target="_blank"
          >
            <img src="../src/assets/img/GA.png" alt="" className="img-fluid" />
          </a>
        </div>
        <div className="border rounded-xl overflow-hidden">
          <a href="https://prdtourism.in/" target="_blank">
            <img
              src="../src/assets/img/OnlineBookingGuestHouse.png"
              alt=""
              className="img-fluid"
            />
          </a>
        </div>
        <div className="border rounded-xl overflow-hidden">
          <a
            href="http://www.wbprd.gov.in/HtmlPage/shisti.aspx"
            target="_blank"
          >
            <img
              src="../src/assets/img/SHIR.png"
              alt=""
              className="img-fluid"
            />
          </a>
        </div>
        <div className="border rounded-xl overflow-hidden">
          <a href="https://wbcadc.com/" target="_blank">
            <img
              src="../src/assets/img/MRITTIKA.png"
              alt=""
              className="img-fluid"
            />
          </a>
        </div>

        <div className="border rounded-xl overflow-hidden">
          <a href="https://bsk.wb.gov.in/" target="_blank">
            <img src="../src/assets/img/bsk.jpg" alt="" className="img-fluid" />
          </a>
        </div>
      </div>
      <Cards />
      <img src={curveBorder} alt="" />
      <div className="h-40"></div>
      <Footer />
    </div>
  );
};

export default Home;
