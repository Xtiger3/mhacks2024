import React, { useEffect, useState } from 'react';

const List = ({ title, fetchData }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchData();
        setItems(data);
      } catch (error) {
        console.error(`Error fetching data for ${title}:`, error);
      }
    };

    getData();
  }, [fetchData, title]);

  return (
    <div className="list">
      <h2>{title}</h2>
      <ul>
        {items.length > 0 ? (
          items.map((item, index) => <li key={index}>{item}</li>)
        ) : (
          <li>No items available</li>
        )}
      </ul>
    </div>
  );
};

export default List;
