import { useEffect, useState } from 'react';
import { FloatingLabel, ProgressBar, Form, Button, Table } from 'react-bootstrap';
import './App.css';
import { data } from './data';

function App() {

  const [value, setValue] = useState();
  const[error, setError] = useState("");
  const [results, setResults] = useState({});
  const[overall, setOverall] = useState();
  const [color,setColor] = useState();
  const [rank, setRank] = useState();
  let student = data;

  // console.log("useResult :", results);

  console.log("error :", error)

  

  const changeColor = () => {
    
    if (overall >= 90){
      setColor("success");
      setRank("Excellent")
    }
   
    else if( overall >= 70){
       setColor("info")
       setRank("Average")
    }
    else if(overall >= 50){
     setColor("warning")
     setRank("Pass")
    }
    else if(overall < 30){
       setColor("danger")
       setRank("Fail")
    }
   

  }

  useEffect(changeColor)


  const handleClick = () => {
    const result = student.find((item) => item.id == value)

    if (result) {
      setResults(result);
      setError("");
      // console.log("results :", result);

      const { id, ...rest } = result;
      const average = (Object.values(rest).reduce((sum, curr) => sum + curr, 0) / Object.values(rest).length).toFixed();
      // console.log("average :", average);
      setOverall(average);
    }
    else{
        setError("ID not found")
    }
}




  return (
    <div className="App">
      <div className='topbar'>
        <h3>Student_Corner</h3>
      </div>
      <div className='container'>
        <div className='input-container'>
          <h4 className='heading'>Enter the student ID to get results</h4>
          <FloatingLabel
            controlId="floatingInput"
            label="Enter ID"
            className="mb-3"
          >
            <Form.Control type="text" placeholder='Enter_ID' onChange={(e) => setValue(e.target.value)} />
          </FloatingLabel>
         {value ? <Button onClick={handleClick} variant="info">Get Data From Server</Button> : ""} 
        </div>
        <hr/>
       {  Object.values(results).length > 1 ? ( <div>
       { !error ? ( <div className='result-container'>
          <div className='percentage-container'> 
          <h3 className='heading'>Subject wise percentage</h3>
          <Table responsive="md" striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>ID</th>
                <th>English</th>
                <th>Maths</th>
                <th>Physics</th>
                <th>Chemistry</th>
                <th>Biology</th>
              </tr>
            </thead>
            {Object.values(results).length > 1 ? (<tbody>
              <tr>
                <td>{results.id}</td>
                <td>{results.english}</td>
                <td>{results.maths}</td>
                <td>{results.physics}</td>
                <td>{results.chemistry}</td>
                <td>{results.biology}</td>
              </tr>
            </tbody>) : ""}
          </Table>
        </div>
        <hr/>
        <div className='total-percentage'>
          <h3 className='heading'>Overall percentage</h3>
          <ProgressBar className='percent-bar' variant={color} label={`${rank} ${overall}%`} now={overall} />
        </div>
        </div>) : <Notfound/>}
      </div>) : !error ? ("") : (<Notfound/>) }
    </div>
    </div>
  );
}

function Notfound () {
  return (
    <div className='error-container'>  
    <h2>ID not found</h2>
    <i className="icon fas fa-times-circle"></i>
    </div>
  )
}

export default App;
