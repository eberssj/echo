import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import Navbar from "../components/Navbar";
import Balance from "../components/Balance";
import Calendar from "../components/Calendar";
import TagList from "../components/TagList";
import Footer from "../components/Footer";
import './Home.css';

const Home: React.FC = () => {
  const [tags, setTags] = useState<{ [key: string]: { tag: string; value: number }[] }>({});
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [incomes, setIncomes] = useState<{ tag: string; value: number }[]>([]);
  const [expenses, setExpenses] = useState<{ tag: string; value: number }[]>([]);

  
  const handleTagsUpdate = (newTags: { [key: string]: { tag: string; value: number }[] }) => {
    setTags(newTags);
  };

  useEffect(() => {
    const incomeList: { tag: string; value: number }[] = [];
    const expenseList: { tag: string; value: number }[] = [];
  
    Object.values(tags).forEach(dayTags => {
      dayTags.forEach(tag => {
        if (tag.tag.toLowerCase() === 'income') {
          incomeList.push(tag);
        } else if (tag.tag.toLowerCase() === 'expense') {
          expenseList.push(tag);
        } else {

          incomeList.push(tag); 
        }
      });
    });
  
    setIncomes(incomeList);
    setExpenses(expenseList);
  }, [tags]);

  console.log("Current Date in Home:", currentDate);

  return (
    <React.Fragment>
      <Navbar />
      <div className="home-container pages">
        <h1 className="home-page-title smooth-typing">
          Hello, Welcome to <span className="home-echo">Echo</span>.
        </h1>
        <div className="home-balance-container">
          <Balance
            tags={tags}
            currentDate={currentDate}
          />
        </div>
        <div className="home-content-container">
          <div className="home-calendar-container">
            <Calendar
              onTagsUpdate={handleTagsUpdate}
              currentDate={currentDate}
              setCurrentDate={setCurrentDate}
            />
          </div>
          <div className="home-tag-list-container">
            <TagList tags={tags} currentDate={currentDate} />
          </div>
        </div>
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default Home;