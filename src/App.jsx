import { useEffect, useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
import axios from "axios"
// import "bootstrap/dist/css/bootstrap.min.css"
import "../js/main.js"
function App() {
  const [lectures, setLectures] = useState([]);
  const [selectedWeek, setSelectedWeek] = useState(null);
  const [popupData, setPopupData] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:3001/getLectures")
      .then((response) => setLectures(response.data))
      .catch((error) => console.error("Error fetching lectures:", error));
  }, []);
  
 const handlePopupOpen = (weekId) => {
    setSelectedWeek(weekId);
    // Fetch data based on the selected weekId from MongoDB
    axios.get(`http://localhost:3001/getWeek/${weekId}`)
      .then((response) => setPopupData(response.data))
      .catch((error) => console.error('Error fetching popup data:', error));
  };
  return (
    <div className="month open" id="m10">
      {lectures.map((lecture) => (
        <div key={lecture.weekN} className="week" >
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
            <span className="by">included lectures:</span>
            <span className="s1"> {lecture.inLecture}</span>
          </div>
        </div>
      ))}
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

export default App
