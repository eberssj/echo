import React from 'react';
import './TagList.css';
import { format, parseISO } from 'date-fns';

interface Tag {
  tag: string;
  value: number;
}

interface TagListProps {
  tags: { [key: string]: { tag: string, value: number }[] };
  currentDate: Date;
}


const TagList: React.FC<TagListProps> = ({ tags, currentDate }) => {
  const currentMonth = format(currentDate, 'yyyy-MM');

  console.log("Current Date in TagList:", currentDate); 

  
  const filteredEntries = Object.entries(tags).filter(([day, tagList]) => {
    try {
      const tagDate = parseISO(day);
      return format(tagDate, 'yyyy-MM') === currentMonth;
    } catch (error) {
      console.error(`Erro ao processar a data: ${day}`, error);
      return false;
    }
  });

  console.log("Filtered Entries:", filteredEntries); 

  const getTotalByTag = (tagType: string) => {
    return filteredEntries.reduce((total, [day, tagList]) => {
      const tagTotal = tagList
        .filter(tag => tag.tag.toLowerCase() === tagType.toLowerCase())
        .reduce((sum, tag) => sum + tag.value, 0);
      return total + tagTotal;
    }, 0);
  };

  const totalIncome = getTotalByTag('Income');
  const totalExpense = getTotalByTag('Expense');

  return (
    <div className="tag-list">
      <h3>Transactions for {format(currentDate, 'MMMM yyyy')}:</h3>
      {filteredEntries.length === 0 ? (
        <p>No transactions this month.</p>
      ) : (
        <ul className="custom-list">
          {filteredEntries.map(([day, tagList]) => (
            <li key={day}>
              <span className="dot"></span>
              <strong>{format(parseISO(day), 'dd')}</strong>:
              {tagList.map((t, i) => (
                <span key={`${day}-${i}`} className={t.tag.toLowerCase() === 'income' ? 'income' : 'expense'}>
                  {t.tag} - ${t.value}
                </span>
              ))}
            </li>
          ))}
        </ul>
      )}
      <div className="totals">
        <p><strong>Total Income: </strong>${totalIncome}</p>
        <p><strong>Total Expenses: </strong>${totalExpense}</p>
      </div>
    </div>
  );
};

export default TagList;