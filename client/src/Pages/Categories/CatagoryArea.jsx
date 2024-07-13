import React from "react";
import CategoryList from '../../Components/CategoryList'
// import CategoriesCart from "../../Components/CategoriesCart";
function CatagoryArea(){
return(
<div>
{/* <!-- bradcam_area  --> */}
<div className="bradcam_area bradcam_bg_1">
        <div className="container">
            <div className="row">
                <div className="col-xl-12">
                    <div className="bradcam_text">
                        <h3>All Catagories </h3>
                    </div>
                </div>
            </div>
        </div>
    </div>
{/* <!--/ bradcam_area  --> */}
<CategoryList />


            
    
</div>)
}

export default CatagoryArea 