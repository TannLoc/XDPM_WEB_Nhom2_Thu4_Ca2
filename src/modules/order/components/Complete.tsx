import React from "react";

const Complete = () => {
  return (
    <div className="mt-10">
      <div className="text-center">
        <i className="text-3xl text-green-600 bi bi-check-circle"></i>
      </div>
      <h2 className="text-2xl text-center text-green-600">Order successful</h2>
      <div className="mt-5">
        <p>
          We will send you a notification when the item is on its way. If you
          have any questions, please do not hesitate to contact:
        </p>
        <h2 className="text-xl font-semibold uppercase">M-Store</h2>
        <p>
          <span className="font-semibold">Email:</span> mstore@gmail.com.vn
        </p>
        <p>
          <span className="font-semibold">Address:</span> 123/456 Ward 1
          Districts 8 TP.HCM
        </p>
        <p>
          <span className="font-semibold">Phone number:</span> 0987654321
        </p>
        <p className="mt-5 text-xl font-semibold">
          Thank you for your trust and support!
        </p>
      </div>
    </div>
  );
};

export default Complete;
