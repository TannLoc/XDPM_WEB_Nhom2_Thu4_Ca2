import React from "react";

type Props = {
  paymentInfo: {
    orderCode?: string;
    payDate?: string;
    amount?: string;
  };
};

const Complete = (props: Props) => {
  const { paymentInfo } = props;

  return (
    <div className="mt-10">
      <div className="text-center">
        <i className="text-3xl text-green-600 bi bi-check-circle"></i>
      </div>
      <h2 className="text-2xl text-center text-green-600">Order successful</h2>

      <div className="flex gap-20 mt-5">
        <div className="flex-1">
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
        {Object.keys(paymentInfo).length !== 0 && (
          <div className="flex-1">
            <h2 className="text-xl font-semibold uppercase">
              Payment information
            </h2>
            <p>
              <span className="font-semibold">Order code:</span>{" "}
              {paymentInfo.orderCode}
            </p>
            <p>
              <span className="font-semibold">Payment date:</span>{" "}
              {paymentInfo.payDate}
            </p>
            <p>
              <span className="font-semibold">Total amount:</span>{" "}
              {paymentInfo.amount}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Complete;
