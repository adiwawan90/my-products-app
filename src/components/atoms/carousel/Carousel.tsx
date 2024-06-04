import React from "react";
import { Carousel } from "antd";

const contentStyle: React.CSSProperties = {
  margin: 0,
  height: "160px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
};

const CarouselComp: React.FC = () => (
  <>
    <Carousel arrows infinite={true} autoplay className="h-32">
      <div className="h-32">
        <h3 style={contentStyle}>1</h3>
      </div>
      <div className="h-32">
        <h3 style={contentStyle}>2</h3>
      </div>
      <div className="h-32">
        <h3 style={contentStyle}>3</h3>
      </div>
      <div className="h-32">
        <h3 style={contentStyle}>4</h3>
      </div>
    </Carousel>
  </>
);

export default CarouselComp;
