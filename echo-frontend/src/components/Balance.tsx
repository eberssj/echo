import React, { useState, useEffect } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, parseISO } from 'date-fns';
import './Balance.css'; // Importe o arquivo CSS

interface BalanceProps {
  tags: { [key: string]: { tag: string; value: number }[] };
  currentDate: Date;
}

const Balance: React.FC<BalanceProps> = ({ tags, currentDate }) => {
  const [monthlyProfit, setMonthlyProfit] = useState<{ [key: string]: number }>({});

  // Função para calcular o lucro de um mês específico
  const calculateMonthlyProfit = (date: Date) => {
    const monthKey = format(date, 'yyyy-MM');
    const startOfMonthDate = startOfMonth(date);
    const endOfMonthDate = endOfMonth(date);
    const daysInMonth = eachDayOfInterval({ start: startOfMonthDate, end: endOfMonthDate });

    const totalIncome = daysInMonth.reduce((total, day) => {
      const dayKey = format(day, 'yyyy-MM-dd');
      const tagList = tags[dayKey] || [];
      const income = tagList.filter(tag => tag.tag.toLowerCase() === 'income').reduce((sum, tag) => sum + tag.value, 0);
      return total + income;
    }, 0);

    const totalExpense = daysInMonth.reduce((total, day) => {
      const dayKey = format(day, 'yyyy-MM-dd');
      const tagList = tags[dayKey] || [];
      const expense = tagList.filter(tag => tag.tag.toLowerCase() === 'expense').reduce((sum, tag) => sum + tag.value, 0);
      return total + expense;
    }, 0);

    return totalIncome - totalExpense;
  };

  // Atualizar o lucro de cada mês sempre que as tags mudarem
  useEffect(() => {
    const months = Object.keys(tags).map(day => format(parseISO(day), 'yyyy-MM'));
    const uniqueMonths = Array.from(new Set(months));

    const newMonthlyProfit: { [key: string]: number } = {};
    uniqueMonths.forEach(month => {
      const date = parseISO(`${month}-01`);
      newMonthlyProfit[month] = calculateMonthlyProfit(date);
    });

    setMonthlyProfit(newMonthlyProfit);
  }, [tags]);

  // Calcular o saldo total (soma de todos os meses, independentemente da data atual)
  const calculateTotalBalance = () => {
    return Object.values(monthlyProfit).reduce((total, profit) => total + profit, 0);
  };

  // Calcular o lucro do mês atual
  const currentMonthProfit = calculateMonthlyProfit(currentDate);

  return (
    <div className="balance-container">
      {/* Quadrado do saldo total */}
      <div className="balance-total">
        ${calculateTotalBalance()} {/* Apenas o número do saldo total */}
      </div>

      {/* Total do mês */}
      <div className="month-total">
        Total for {format(currentDate, 'MMMM')}: ${currentMonthProfit}
      </div>
    </div>
  );
};

export default Balance;