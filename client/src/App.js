import React, { useState } from 'react'
import './index.css';
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

import Axios from 'axios';

function App() {
 var id=1;

   const [fname, setFname] = useState();
    const [lname, setLname] = useState();
    const [mobile, setMobile] = useState();
    const [adhar, setAdhar] = useState();
    const [data, setData] = useState([]);
//reset the state
  const resetdata = () => {
    setFname("");
    setLname("");
    setMobile("");
    setAdhar("");

}

//show add data from  mysql database 
const showData =()=>
{
    Axios.get('http://localhost:3001/recieve').then((response)=>
{
    setData(response.data)
})
}



// submit data into database
const submitData =()=>
{
  console.log(fname)
Axios.post('http://localhost:3001/create',{fname:fname,lname:lname,adhar:adhar,mobile:mobile}).then(()=>
{
//   console.log("success")
setData([...data,{fname:fname,lname:lname,adhar:adhar,mobile:mobile}])
alert("succes")
})
}


//

//delete the specific record from database
const deleteData =(id)=>
{
    alert(` Data Deleted ` )
   
    Axios.delete(`http://localhost:3001/delete/${id}`).then((response)=>
    {
        setData(data.filter((val)=>
        {
return id!=val.id
        }))
    })
  
}

  return (
    <>
    <div className="container my-5"><div>
                <div className="row mx-auto" >
                    <div className="col-sm-6 mx-auto my-4" style={{ border: "2px solid black", boxShadow: "4px 4px 10px blue" }}>
                        <form >
                            <div class="mb-3 my-4" >
                                <div className="row  ">
                                    <div className="col-3 mr-0 my-2">
                                        <label for="exampleInputEmail1"  autoComplete="off" class="form-label"><b>First Name :</b></label>
                                    </div>
                                    <div className="col-9">
                                        <input type="text" name="fname" value={fname} onChange={(e) => { setFname(e.target.value) }}
                                            autoComplete="off"
                                            class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" required />

                                    </div>
                                </div>

                            </div>
                            <div class="mb-3 my-4">
                                <div className="row ">
                                    <div className="col-3 mr-0 my-2">
                                        <label for="exampleInputEmail1"  class="form-label"><b>Last Name :</b></label>
                                    </div>
                                    <div className="col-9">
                                        <input type="text" name="lname" value={lname}  autocomplete="off"  autocomplete="off" onChange={(e) => { setLname(e.target.value) }}
                                            autoComplete="off"
                                            class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />

                                    </div>
                                </div>

                            </div>
                            <div class="mb-3 my-4">
                                <div className="row ">
                                    <div className="col-3 mr-0 my-2">
                                        <label for="exampleInputEmail1" class="form-label"><b>Adhar Number :</b></label>
                                    </div>
                                    <div className="col-9">
                                        <input type="Number" name="adhar" value={adhar}  autocomplete="off" onChange={(e) => { setAdhar(e.target.value) }}
                                            autoComplete="off"
                                            class="form-control" />

                                    </div>
                                </div>

                            </div>

                            <div class="mb-3 my-4">
                                <div className="row ">
                                    <div className="col-3 mr-0 my-2">
                                        <label for="exampleInputEmail1"  autocomplete="off" class="form-label"><b>Mobile Number:</b></label>
                                    </div>
                                    <div className="col-9">
                                        <input type="Number" name="mobile" value={mobile} onChange={(e) => { setMobile(e.target.value) }}
                                            autoComplete="off"
                                            class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />

                                    </div>
                                </div>

                            </div>



                            <div class="container  my-5">
                                <div class="col-md-12 text-center">
                                    <button type="button" class="btn btn-outline-success  mx-3 submitbtn" style={{ borderRadius: "30px", width: "120px" }} onClick={submitData}><b>Submit</b></button>
                                    <button type="button " class="btn btn-outline-primary mx-3" style={{ borderRadius: "20px", width: "120px" }} onClick={resetdata}><b>Reset</b></button>
                                    <button type="button " class="btn btn-outline-secondary mx-3" style={{ borderRadius: "20px", width: "140px" }} onClick={showData}><b>Show Data</b></button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div></div>



<div className="container">
    <div className="row">
    <table class="table table-hover table-bordered table-dark table-sm">
  <thead>
    <tr>
    <th scope="col"></th>
      <th scope="col">First Name</th>
      <th scope="col">Last Name</th>
      <th scope="col">Adhar Number</th>
      <th scope="col">Mobile Number</th>
      <th scope="col"></th>
    </tr>
  </thead>

  {data.map((curr,index)=>
            {
                
                return(
                    <>
                   
                   
  <tbody>
    <tr>
      <th scope="row">{curr.id}</th>
      <td>{curr.fname}</td>
      <td>{curr.lname}</td>
      <td>{curr.adhar}</td>
      <td>{curr.mobile}</td>
      <td><button onClick={()=>deleteData(curr.id)} className="btn btn-outline-danger ml-3">delete</button></td>
    </tr>
   
  </tbody>
  </>

)
})
}
</table>
    </div>
</div>

            
            <ToastContainer />
    </>
  );
}

export default App;





    
