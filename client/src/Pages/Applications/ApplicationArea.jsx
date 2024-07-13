import React, { useState } from 'react'; // Import useState for handling form state
import ApplicationCart from '../../Components/ApplicationCart'
function ApplicationArea() {


  return (
<div>
  <div className="bradcam_area bradcam_bg_1">
    <div className="container">
      <div className="row">
        <div className="col-xl-12">
          <div className="bradcam_text">
            <h3>Apply for Job</h3>
          </div>
        </div>
      </div>
    </div>
  </div>
  <ApplicationCart/>

</div>
  );
}

export default ApplicationArea;
