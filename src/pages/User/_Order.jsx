/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";

export const Order = () => {
  return (
    <div id="page-content-wrapper">
      <div className="container-fluid">
        <h5 className="mt-4">Order Page</h5>
        <p>
          The starting state of the menu will appear collapsed on smaller screens, and will appear non-collapsed on larger
          screens. When toggled using the button below, the menu will change.
        </p>
        <p>
          Make sure to keep all page content within the <code>#page-content-wrapper</code>. The top navbar is optional, and just
          for demonstration. Just create an element with the <code>#menu-toggle</code> ID which will toggle the menu when clicked.
        </p>
      </div>
    </div>
  );
};