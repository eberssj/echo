import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import './AboutUs.css';

const AboutUs: React.FC = () => {
  return (
    <React.Fragment>
      <Navbar />
      <div className="about-container pages">
        <h1 className="about-page-title">
          This is <span className="about-echo">Echo</span>.
        </h1>
        <div className="about-content">
          <p>
            Echo is a personal financial management application designed to help you track your incomes and expenses throughout the month. With Echo, you can easily add your financial transactions day by day and monitor your balance in real-time.
          </p>
          <p>
            Developed by a single individual, Echo is continuously being improved to provide a better user experience. Whether you're managing daily expenses or planning your budget, Echo is here to simplify your financial life.
          </p>
          <p>
            Thank you for choosing Echo as your personal finance companion. We hope it helps you achieve your financial goals!
          </p>
        </div>
        <h1 className="about-page-title">
          How it works?
        </h1>
        <div className="about-howitworks-container">
          <div className="about-image">
            <img src="/assets/calendar-example.png" alt="Calendar Example" />
          </div>
          <div className="about-content">
            <p>
              The Echo calendar is designed to help you easily manage your financial transactions. To add incomes or expenses, simply click on the day when the transaction occurred. Once you select the day, you can choose whether it's an income or an expense. Additionally, you can add tags to categorize the type of spending or income, such as "Groceries," "Salary," or "Utilities." This tagging system allows you to organize and analyze your finances more effectively.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default AboutUs;