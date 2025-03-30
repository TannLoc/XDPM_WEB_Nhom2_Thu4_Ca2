import React from "react";

const ContactPage = () => {
  return (
    <section className="mt-10">
      <div>
        <h2 className="text-xl uppercase mb-5 f font-semibold">
          NOT JUST AN ONLINE STORE
        </h2>
        <p>
          We are very pleased to welcome you to visit our store, with our
          dedicated service and knowledge of Watches, we hope to make you the
          most satisfied and happy when experiencing directly here.
        </p>
      </div>
      <div className="mt-5">
        <h2 className="text-xl uppercase mb-5 f font-semibold">M-Store</h2>
        <p>
          <span className="font-semibold">Email:</span> mstore@gmail.com.vn
        </p>
        <p>
          <span className="font-semibold">Address:</span> 123/456 Phường 1 Quận
          8 TP.HCM
        </p>
        <p>
          <span className="font-semibold">Phone number:</span> 0987654321
        </p>
      </div>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.954410425893!2d106.67525717480439!3d10.73799718940847!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f62a90e5dbd%3A0x674d5126513db295!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBDw7RuZyBuZ2jhu4cgU8OgaSBHw7Ju!5e0!3m2!1svi!2s!4v1731661899750!5m2!1svi!2s"
        loading="lazy"
        className="w-full h-[400px] mt-10"
      ></iframe>
    </section>
  );
};

export default ContactPage;
