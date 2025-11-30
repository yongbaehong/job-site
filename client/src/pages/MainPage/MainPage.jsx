import { Row, Col, Carousel, Image } from "react-bootstrap";

import PageTemplate from "../../components/PageTemplate/PageTemplate";
import CustomButton from "../../components/CustomButton/CustomButton";
import CustomJumbotron from "../../components/CustomJumbotron/CustomJumbotron";
import Footer from "../../components/Footer/Footer";
import "./MainPage.css";

const MainPage = ({ history }) => {
  return (
    <PageTemplate customClasses="g-0 m-0">
      {/* TITLE Animation */}
      <Row className="bg-dark h-20">
        <Col
          xs={12}
          className="d-flex flex-column justify-content-center display-3 text-muted mb-3"
        >
          <div className="MainPage-title text-center">Métier</div>
        </Col>
      </Row>

      <CustomJumbotron
        customJumbotronCss="MainPage-CustomJumbotron-1"
        bgImage="./image/charles-forerunner-3fPXt37X6UQ-unsplash.jpg"
        bgRepeat="no-repeat"
        bgSize="cover"
        bgPosition="top center"
        height="85%"
        text={<span>Find your Job with Métier...</span>}
      >
        <CustomButton
          customClasses="Button Button--success"
          text="Signup"
          onClick={() => history.replace({ pathname: "/signup" })}
        />
      </CustomJumbotron>

      <CustomJumbotron
        customJumbotronCss="MainPage-CustomJumbotron-1"
        bgImage="./image/merakist-zFd9Zvs0yN8-unsplash.jpg"
        bgRepeat="no-repeat"
        bgSize="cover"
        bgPosition="center center"
        height="65%"
        text="Are you an Employer?"
      >
        <p className="text-info fs-3">Post your jobs here on Métier.</p>
        <p>
          <CustomButton
            customClasses="Button Button--success"
            text="Create Account"
            onClick={() => history.replace({ pathname: "/signup" })}
          />
        </p>
      </CustomJumbotron>

      <CustomJumbotron
        customJumbotronCss="MainPage-CustomJumbotron-1"
        bgImage="./image/copernico-cLmOptqvuFQ-unsplash.jpg"
        bgRepeat="no-repeat"
        bgSize="cover"
        bgPosition="center center"
        height="50%"
        text="Find work spaces that work for you."
      />
      <Footer />
    </PageTemplate>
  );
};

export default MainPage;
