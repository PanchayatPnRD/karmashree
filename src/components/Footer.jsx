export const Footer = ({ bg }) => {
  return (
    <>
      <section className="inset-x-0 bottom-0 ">
        <div className={bg || "bg-transparent"}>
          <img
            src="/assets/img/mainfooterbg.png"
            alt=""
            className="img-fluid w-screen"
          />
        </div>
        <div className="copyright">
          <div className="site-wrapper">
            <div className="row">
              <div className="site-inner-wrapper">
                <div className="copyinner">
                  <div className="flex flex-col items-center bg-[#d7e2f6]">
                    <p className="text">
                      © 2024 Designed and Developed By
                      <span className="font-bold">
                        {" "}
                        IT And Statistical Cell
                      </span>
                      , Panchayat & Rural Development Department
                      <span className="font-bold"> Govt. of West Bengal</span>
                    </p>
                    <p className="text-sm text-zinc-700">
                      Site best viewed with 1920x1080 resolution in Google
                      Chrome 31.0.1650.63, Firefox 55.0.2, Safari 5.1.7 & IE
                      11.0 and above
                    </p>
                  </div>
                  {/* <div className="visitor-count">
								<h4>Current Visitors : 5638</h4>
								<h4>Total Visitors : 281893</h4>
							</div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
