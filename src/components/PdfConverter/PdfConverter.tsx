import React from "react";
import JasaimLogo from "@src/assets/resume/jasaim_logo.svg";
import EdiplomaLogo from "@src/assets/resume/logo_ediploma.svg";

const PdfConverter = () => {
  const styles = {
    page: {
      marginLeft: '5rem',
      marginRight: '5rem',
    },
    imgLeft: {
      position: "relative",
      left: "0",
      top: "10%",
      zIndex: "99",
      height: "70%",
    }
  };
  return (
    <div style={{
      width: "446px",
      height: "631px",
      display: "flex",
      flexDirection: "column",
      border: "1px solid red",
      backgroundColor: "#FFF",
    }}>
      <div style={{
        backgroundColor: "#EBF2FE",
        display: "flex",
        height: "1rem",
        width: "100%",
        position: "absolute",
        left: "0",
        top: "0",
        zIndex: "3",
      }}>
        <img src={JasaimLogo} style={{
          position: "relative",
          left: "0",
          top: "10%",
          zIndex: "99",
          height: "70%",
        }}/>
        <img src={EdiplomaLogo}
             style={{
               position: "absolute",
               right: "0",
               top: "10%",
               zIndex: "99",
               height: "70%",
             }}/>
      </div>
      <div style={{
        zIndex: "1",
        position: "absolute",
        left: "0",
        top: "0",
        width: "30%",
        height: "100%",
        backgroundColor: "#111C44"
      }}>
        <h4>Subtitle Two</h4>
        <h4>Subtitle Two</h4>
        <h4>Subtitle Two</h4>
        <h4>Subtitle Two</h4>
        <h4>Subtitle Two</h4>

      </div>
      <div style={{
        zIndex: "2",
        margin: "0 4%",
        width: "92%",
        height: "30%",
        position: "absolute",
        backgroundColor: "#3B82F6"
      }}></div>
    </div>
  );
};

export default PdfConverter;