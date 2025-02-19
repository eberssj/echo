import React, { useState, useEffect } from 'react';
import './Calendar.css';
import { format, startOfMonth, endOfMonth, addMonths, subMonths, eachDayOfInterval, isToday } from 'date-fns';

interface CalendarProps {
  onTagsUpdate: (tags: { [key: string]: { tag: string, value: number }[] }) => void;
  currentDate: Date;
  setCurrentDate: (date: Date) => void;
}

const Calendar: React.FC<CalendarProps> = ({ onTagsUpdate, currentDate, setCurrentDate }) => {
  const [tags, setTags] = useState<{ [key: string]: { tag: string; value: number }[] }>({});
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);
  const [showTagOptions, setShowTagOptions] = useState(false);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState<number | ''>('');
  const [monthlyProfit, setMonthlyProfit] = useState<{ [key: string]: number }>({});
  const [createdTags, setCreatedTags] = useState<string[]>([]);
  const [newTagName, setNewTagName] = useState<string>('');
  const [showTagViewer, setShowTagViewer] = useState(false);
  const [selectedTagName, setSelectedTagName] = useState<string | null>(null);
  const [incomes, setIncomes] = useState<string[]>([]); 
  const [expenses, setExpenses] = useState<string[]>([]); 
  const [chartData, setChartData] = useState<{ name: string; value: number }[]>([]);

  const startOfCurrentMonth = startOfMonth(currentDate);
  const endOfCurrentMonth = endOfMonth(currentDate);
  const startDayOfWeek = startOfCurrentMonth.getDay(); 
  const daysInMonth = eachDayOfInterval({ start: startOfCurrentMonth, end: endOfCurrentMonth });
  const emptyDays = Array(startDayOfWeek).fill(null); 
  const calendarDays = [...emptyDays, ...daysInMonth]; 
  const monthName = format(currentDate, 'MMMM yyyy');

  const updateChartData = () => {
    const data = createdTags
      .map(tag => {
        const totalValue = Object.values(tags).reduce((acc, dayTags) => {
          const tagValue = dayTags.find(t => t.tag === tag)?.value || 0;
          return acc + tagValue;
        }, 0);
        return { name: tag, value: totalValue };
      })
      .filter(item => item.value > 0); // Filtrar tags com valor maior que zero
  
    setChartData(data);
  };
  
  useEffect(() => {
    updateChartData();
  }, [tags, createdTags]);

  const goToPreviousMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };

  const handleDayClick = (day: Date) => {
    setSelectedDay(day);
    setShowTagOptions(true);
  };

  const handleTagSelect = (tag: string) => {
    if (selectedDay && inputValue !== '') {
      const dayString = format(selectedDay, 'yyyy-MM-dd');
      const inputValueNumber = Number(inputValue);

      setTags((prevTags) => {
        const updatedTags = { ...prevTags };

        if (!updatedTags[dayString]) {
          updatedTags[dayString] = [];
        }

        const existingTagIndex = updatedTags[dayString].findIndex((t) => t.tag === tag);

        if (existingTagIndex !== -1) {
          const updatedTagList = [...updatedTags[dayString]];
          updatedTagList[existingTagIndex] = {
            ...updatedTagList[existingTagIndex],
            value: updatedTagList[existingTagIndex].value + inputValueNumber,
          };
          updatedTags[dayString] = updatedTagList;
        } else {
          updatedTags[dayString] = [...updatedTags[dayString], { tag, value: inputValueNumber }];
        }

        onTagsUpdate(updatedTags);


        if (selectedTag === 'Income' && !incomes.includes(tag)) {
          setIncomes((prev) => [...prev, tag]);
        } else if (selectedTag === 'Expense' && !expenses.includes(tag)) {
          setExpenses((prev) => [...prev, tag]);
        }

        return updatedTags;
      });
    }

    setShowTagOptions(false);
    setInputValue('');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const numericValue = value === '' ? '' : Number(value);
    setInputValue(numericValue);
  };

  const handleAddNewTag = () => {
    if (newTagName.trim() !== '') {
      setCreatedTags((prevTags) => [...prevTags, newTagName]);
  
      if (selectedTag === 'Income' && !incomes.includes(newTagName)) {
        setIncomes((prev) => [...prev, newTagName]);
      } else if (selectedTag === 'Expense' && !expenses.includes(newTagName)) {
        setExpenses((prev) => [...prev, newTagName]);
      }
  
      setNewTagName('');
    }
  };
  

  const handleTagClick = (tag: string) => {
    if (selectedTagName === tag) {
      setSelectedTagName(null);
    } else {
      setSelectedTagName(tag);
    }
  };

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];


  return (
    <div className="calendar-container">
      <div className="calendar">
        <div className="calendar-header">
          <button onClick={goToPreviousMonth}>
            <img src="../assets/setaesquerda.png" alt="Seta para esquerda" />
          </button>
          <span>{monthName}</span>
          <button onClick={goToNextMonth}>
            <img src="../assets/setadireita.png" alt="Seta para direita" />
          </button>
        </div>

        <div className="calendar-weekdays">
          {daysOfWeek.map((day, index) => (
            <div key={index} className="calendar-weekday">
              {day}
            </div>
          ))}
        </div>

        <div className="calendar-grid">
          {calendarDays.map((day, index) => {
            if (day === null) {
              return <div key={index} className="calendar-day empty"></div>;
            }

            const dayOfMonth = format(day, 'd');
            const dayString = format(day, 'yyyy-MM-dd');
            const currentTag = tags[dayString] || [];

            return (
      <div
        key={index}
        className={`calendar-day ${isToday(day) ? 'today' : ''}`}
        onClick={() => handleDayClick(day)}
      >
        {dayOfMonth}
        {(currentTag.length > 0) && (
          <div className="tags">
            {currentTag.map((tag, idx) => (
              <div key={idx} className={`tag ${tag.tag.toLowerCase()}`}>
                <span className="tag-icon"></span>
              </div>
            ))}
          </div>
        )}
      </div>
            );
          })}
        </div>
        {showTagOptions && selectedDay && (
        <div className="tag-options">
          <button className="close-modal-button" onClick={() => setShowTagOptions(false)}>
            &times;
          </button>
          <div className="tag-option">
            <input
              type="number"
              value={inputValue}
              onChange={handleInputChange}
              placeholder="Enter amount"
              className="input-value"
            />
            <div className="tag-selection">
              <label htmlFor="income">
                <input
                  type="checkbox"
                  id="income"
                  checked={selectedTag === 'Income'}
                  onChange={() => setSelectedTag('Income')}
                />
                Income
              </label>
              <label htmlFor="expense">
                <input
                  type="checkbox"
                  id="expense"
                  checked={selectedTag === 'Expense'}
                  onChange={() => setSelectedTag('Expense')}
                />
                Expense
              </label>
            </div>
            <div className={`tag-viewer-toggle ${showTagViewer ? 'open' : ''}`} onClick={() => setShowTagViewer(!showTagViewer)}>
            <span>Tags</span>
            <span></span> 
          </div>
          <div className={`tag-viewer ${showTagViewer ? 'open' : ''}`}>
            {createdTags.length > 0 ? (
              createdTags.map((tag, index) => (
                <div
                  key={index}
                  className={`tag-item ${selectedTagName === tag ? 'selected' : ''}`}
                  onClick={() => handleTagClick(tag)}
                >
                  {tag}
                </div>
              ))
            ) : (
              <div className="no-tags-message">No tags available.</div>
            )}
            <input
              type="text"
              value={newTagName}
              onChange={(e) => setNewTagName(e.target.value)}
              placeholder="New tag name"
            />
            <button onClick={handleAddNewTag}>Add New Tag</button>
          </div>
          <button
            className="save-button"
            onClick={() => handleTagSelect(selectedTag || '')}
            disabled={selectedTag === null || inputValue === ''}
          >
            Save
          </button>
          </div>
        </div>
        
      )}
      </div>

    </div>
  );
};

export default Calendar;