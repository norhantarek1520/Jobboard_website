import React from "react";

function Footer() {
    return(<>
      <footer className="footer">
    <div className="copy-right_text wow fadeInUp" data-wow-duration="1.4s" data-wow-delay=".3s">
        <div className="container">
            <div className="footer_border"></div>
            <div className="row">
                <div className="col-xl-12">
                    <p className="copy_right text-center">
                        {/* <!-- Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. --> */}
Copyright &copy;<script>document.write(new Date().getFullYear());</script> All rights reserved | This template is made with <i className="fa fa-heart-o" aria-hidden="true"></i> by <a href="https://colorlib.com" target="_blank">Colorlib</a>
{/* <!-- Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. --> */}
                    </p>
                </div>
            </div>
        </div>
    </div>
</footer>
    </>)
    
}
export default Footer