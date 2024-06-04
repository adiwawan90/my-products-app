import React from "react";
import { Layout } from "antd";
import { useTheme } from "next-themes";

const { Content, Footer } = Layout;

type Props = {};

export const socialMedia = [
  {
    id: 1,
    img: "/icons/git.svg",
  },
  {
    id: 2,
    img: "/icons/twit.svg",
  },
  {
    id: 3,
    img: "/icons/link.svg",
  },
];

const FooterComponent = (props: Props) => {
  const { theme } = useTheme();

  return (
    <Footer
      style={{ textAlign: "center" }}
      className={`${theme === "dark" ? "bg-black-100 text-white " : "bg-white text-black-100"}`}
    >
      <div className="flex flex-col items-center">
        <p className="text-white-200 md:mt-10 my-5 text-center">
          Reach out to me today and let&apos;s discuss how I can help you
          achieve your goals.
        </p>
        <a href="mailto:contact@jsmastery.pro">
          <button type="button">HALO </button>
        </a>
      </div>
      <div className="flex mt-16 md:flex-row flex-col justify-between items-center">
        <p className="md:text-base text-sm md:font-normal font-light">
          Copyright © 2024 Adi Setyawan
        </p>

        <div className="flex items-center md:gap-3 gap-6">
          {socialMedia.map((info) => (
            <div
              key={info.id}
              className="w-10 h-10 cursor-pointer flex justify-center items-center backdrop-filter backdrop-blur-lg saturate-180 bg-opacity-75 bg-black-200 rounded-lg border border-black-300"
            >
              <img src={info.img} alt="icons" width={20} height={20} />
            </div>
          ))}
        </div>
      </div>
    </Footer>
  );
};

export default FooterComponent;
