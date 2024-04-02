export const Footer = () => {
  return (
    <>
      <section class="main-footer">
        <div class="bg-transparent">
          <img
            src="https://prd.wb.gov.in/img/mainfooterbg.png"
            alt=""
            class="img-fluid"
          />
        </div>
        <div class="site-wrapper">
          <div class="row">
            <div class="site-inner-wrapper">
              {/* <div class="footnav">
							<ul class="footer-menu">
								<li><a href="https://prd.wb.gov.in/contact-us">Contact Us</a></li>
								<li><a href="https://prd.wb.gov.in/help">Help</a></li>
								<li><a href="https://prd.wb.gov.in/feed-back">Feedback</a></li>
								<li><a href="https://prd.wb.gov.in/website-policies">Website Policy</a></li>
								<li><a href="https://prd.wb.gov.in/rti-acts">RTI</a></li>
								<li><a href="https://prd.wb.gov.in/site-map">Site Map</a></li>
							</ul>
						</div> */}
            </div>
          </div>
        </div>
      </section>
            
      <div class="copyright">
        <div class="site-wrapper">
          <div class="row">
            <div class="site-inner-wrapper">
              <div class="copyinner">
                <div className="flex flex-col items-center bg-[#d7e2f6]">
                  <p className="text">
                    © 2024 Designed and Developed By{" "}
                    <span className="font-bold">IT And Statistical Cell</span> ,
                    Panchayat & Rural Development Department
                    <span className="font-bold"> Govt. of West Bengal</span>
                  </p>
                  <p className="text-sm text-zinc-700">
                    Site best viewed with 1920x1080 resolution in Google Chrome
                    31.0.1650.63, Firefox 55.0.2, Safari 5.1.7 & IE 11.0 and
                    above
                  </p>
                </div>
                {/* <div class="visitor-count">
								<h4>Current Visitors : 5638</h4>
								<h4>Total Visitors : 281893</h4>
							</div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
