// app.jsx 
import React, { useEffect, useState } from 'react';
import axios from 'axios';
function App() {
  // Call submitForm with your form data when needed
  const [lectures, setLectures] = useState([]);
  const [selectedWeek, setSelectedWeek] = useState(null);
  const [popupData, setPopupData] = useState(null);
  const [currentMonth, setCurrentMonth] = useState('February'); // Default starting month

  useEffect(() => {
    axios.get("http://fi1.bot-hosting.net:5919/getLectures")
      .then((response) => setLectures(response.data))
      .catch((error) => console.error("Error fetching lectures:", error));
  }, []);

  const handlePopupOpen = (weekId) => {
    setSelectedWeek(weekId);

   // axios.get(`https://good-jade-bullfrog-hat.cyclic.app/${weekId}`)

    // Fetch data based on the selected weekId from MongoDB
    axios.get(`https://zealous-bikini-ant.cyclic.app/getWeek/${weekId}`)

      .then((response) => setPopupData(response.data))
      .catch((error) => console.error('Error fetching popup data:', error));
  };

  const getNextMonth = () => {
    const monthNames = Object.keys(lectures.reduce((acc, lecture) => {
      acc[lecture.month] = true;
      return acc;
    
    }, {}));
    
    const currentIndex = monthNames.indexOf(currentMonth);
    const nextIndex = (currentIndex + 1) % monthNames.length;
    setCurrentMonth(monthNames[nextIndex]);
    
  };

  const getPrevMonth = () => {
    const monthNames = Object.keys(lectures.reduce((acc, lecture) => {
      acc[lecture.month] = true;
      return acc;
    }, {}));
    
    const currentIndex = monthNames.indexOf(currentMonth);
    const prevIndex = (currentIndex - 1 + monthNames.length) % monthNames.length;
    setCurrentMonth(monthNames[prevIndex]);
    
  };
// checkMonthClass
function checkMonthClass() {
  const monthElement = document.querySelector('.month');

  if (monthElement && monthElement.id !== 'mFebruary') {
    const monthContent = monthElement.innerHTML;
    // Add "non ancore" class to the content
    monthElement.innerHTML = `<div class="non ancore">${monthContent}</div>`;
  }
}
  return (
    <div className="container" id="root">
       <div className="monthbtn">{currentMonth}</div>
      <button onClick={getPrevMonth} className='getmonth'>Previous Month</button>
      <button onClick={getNextMonth} className='getmonth'>Next Month</button>

      {/* Display the current month */}
      <div className={`month open`} id={`m${currentMonth}`}>
       
        {lectures
          .filter(lecture => lecture.month === currentMonth)
          .map((lecture) => (
            <div key={lecture.weekN} className="week">
              <a className="fill-div" id={`open-popup${lecture.weekN}`} onClick={() => handlePopupOpen(lecture.weekN)}>
              </a>
              <div className="h">
                <div className="h1">{lecture.month} <br />Week {lecture.weekN}</div>
                <div className="h2"> {lecture.weekS}</div>
              </div>
              <div className="d">
                <span className="d1">Click here</span>
              </div>
              <div className="s">
                <span className="by">Included lectures:</span>
                <span className="s1"> {lecture.inLecture}</span>
              </div>
            </div>
          ))}
      </div>

      {/* Popup */}
      {selectedWeek && (
        <div className="popup" id={`popup${selectedWeek}`}>
          <div className="popup-content">
            <h2>Week {selectedWeek}</h2>
            {popupData ? (
              <div>
                <table>
                  <caption>{popupData.month}</caption>
                  <tr>
                    <th>Day</th>
                    <th colSpan="3">Lectures</th>
                  </tr>
                  <tr>
                    <td>Tuesday</td>
                    <td colSpan="3">
                      {popupData.tues.map((tues, index) => (
                        <a key={index} href={popupData.tuesL[index]}>
                          {tues}
                        </a>
                      ))}
                    </td>
                  </tr>
                  <tr>
                    <td>Thursday</td>
                    <td colSpan="3">
                      {popupData.thurs.map((thurs, index) => (
                        <a key={index} href={popupData.thursL[index]}>
                          {thurs}
                        </a>
                      ))}
                    </td>
                  </tr>
                </table>
              </div>
            ) : (
              <p>Loading...</p>
            )}
            <button className='close' onClick={() => setSelectedWeek(null)}>&times;</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
