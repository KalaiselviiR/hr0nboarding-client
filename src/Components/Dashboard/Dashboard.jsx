import React, { useEffect, useState } from 'react'
import "./Dashboard.css"
import { LuPen, LuTrash2 } from "react-icons/lu";
import { MDBBadge, MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import AddNewCandidate from '../AddNewCandidate/AddNewCandidate'
import EditNewCandidate from '../EditNewCandidate/EditNewCandidate'
import { Modal, Button, Container, Navbar } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import moment from 'moment';
import Nav from 'react-bootstrap/Nav';
import { FiUser } from "react-icons/fi";
import { IoLogOutOutline } from "react-icons/io5";
import { ConformdeleteCandidate, deleteCandidate, getallCandidates } from '../../service/allapi';
import { useNavigate } from 'react-router-dom';
import Login from '../Login/Login';



function Dashboard() {

  const [isShow, setInvokeModal] = useState(false);
  const [UserToEdit, setUserToEdit] = useState(null);

  const [filterType, setFilterType] = useState('isDelete');
  const [search, setSearch] = useState('no');

  const [showModal, setShowModal] = useState(false);

  const initModal = () => {
    setInvokeModal(!isShow);
  };


  const [allcandidate, SetAllCandidate] = useState([])

  const [addModalIsOpen, setAddModalIsOpen] = useState(false)
  const [editModalIsOpen, setEditModalIsOpen] = useState(false)

  const [deleteId, setDeleteId] = useState('')

  const [deleteStatus, setDeleteStatus] = useState('')

  // const [currentPage, setCurrentPage] = useState(1);

  const openAddModal = () => {
    setAddModalIsOpen(true)
  }

  const closeAddModal = () => {
    setAddModalIsOpen(false)
    getAllCandidate()
  }
  const openEditModal = (user) => {
    setUserToEdit(user)
    setEditModalIsOpen(true)
  }

  const closeEditModal = () => {
    getAllCandidate()
    setEditModalIsOpen(false)
    
   
  }

  const navigate = useNavigate();

  const handleUserIconClick = () => {
    setShowModal(true);
    // Add logic to fetch and display user email here if needed
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn")
    navigate('/')
  }

  // useEffect(() => {
  //   const handleClickedOutside = (event) => {
  //     if ((addModalIsOpen || editModalIsOpen) && !event.target.closest('.addCandidateModal')) {
  //       closeAddModal()
  //       closeEditModal()
  //     }
  //   }

  //   document.addEventListener('mousedown', handleClickedOutside)

  //   return () => {
  //     document.removeEventListener('mousedown', handleClickedOutside)
  //   };

  // }, [addModalIsOpen, editModalIsOpen])

  const [currentPage, setCurrentPage] = useState(1)
  const recordsPerPage = 10;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = allcandidate.slice(firstIndex, lastIndex);
  const npages = Math.ceil(allcandidate.length / recordsPerPage);
  const numbers = [...Array(npages + 1).keys()].slice(1)

    // Function to handle filter type selection
    const handleFilterSelect = (type) => {
      setFilterType(type);
  
    };

  //define a function to call api
  const getAllCandidate = async () => {
    const response = await getallCandidates()
    SetAllCandidate(response.data)
    console.log(response);

  }

  //  to fetch all candidates on component mount
  useEffect(() => {
    getAllCandidate();
  }, []);


  const handleDeleteClick = (id,status) => {
    initModal()
    setDeleteId(id)
    setDeleteStatus(status)
  
  }

  const cancleDelete = () => {
    setInvokeModal(false)
    setDeleteId(null)
    setDeleteStatus(null)
  }


  const confirmDelete = async () => {

    if(deleteStatus!="Rejected"){
      
    const response = await deleteCandidate(deleteId)
    if (response.status == 200) {
      toast.success(response.data.message);
      getAllCandidate()
      setInvokeModal(false)
    

  } else {
      toast.error(response.data.message)
  }

    }
    else{
      const response = await ConformdeleteCandidate(deleteId)
      if (response.status == 200) {
        toast.success(response.data.message);
        getAllCandidate()
        setInvokeModal(false)
      
  
    } else {
        toast.error(response.data.message)
    }
      
    }
 
  }


  return (
    <div className='' style={{ backgroundColor: " rgba(250, 251, 255, 1)", position: 'relative', minHeight: "100vh" }}>
       <Navbar
        bg="white"
        className='mb-0 n'
        variant="black"
        style={{
          background: "white",
          marginBottom: "10px",
          width: "100%",
          boxSizing: "border-box"

        }}
      >
        <Container style={{gap:"25px"}}>
          <Navbar.Brand href="#home">
            <img
              alt="Techjays Logo"
              src="https://www.thenewstuff.in/sites/default/files/inline-images/download.png"
              height="40"
              className="d-inline-block align-top"
            />
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home" className="d-none d-md-block" style={{ backgroundColor: " rgba(249, 250, 251, 1)" ,  
            boxShadow: "0 0 1px 1px rgba(0,0,0,0.1)",
            borderRadius:"5px",
            fontWeight:"500"
            }}
            >
              Dashboard
            </Nav.Link>
          </Nav>

              
          {/* <Navbar.Brand href="http://localhost:5173/"> */}
      {/* <IoLogOutOutline className="d-inline-block align-top" style={{
        color: "#7F56D9",
        height: "30px",
        width: '30px',
        borderRadius: "200px",
        backgroundColor: " rgba(249, 245, 255, 1)"
      }} onClick={Logout} /> */}
    {/* </Navbar.Brand> */}
          
         <Navbar.Brand onClick={handleUserIconClick}>
            <FiUser
              className="d-inline-block align-top"
              style={{
                color: "#7F56D9",
                height: "30px",
                width: "30px",
                borderRadius: "200px",
                backgroundColor: "rgba(249, 245, 255, 1)",
                cursor: "pointer",
              }}
            />
          </Navbar.Brand>


      <Modal show={showModal} onHide={handleCloseModal} style={{  height: "350px", width: "2000px" }}>
            <Modal.Header closeButton>
              
            </Modal.Header>
            <Modal.Body>
              {/* You can display the logged-in user's email here */}
              User Email: techjays.com
            </Modal.Body>
            <Modal.Footer>
              
              <Button variant="primary" onClick={handleLogout} style={{ backgroundColor: '#7F56D9', border: '10px' }}
            className='btn-login'>
                Logout
              </Button>
            </Modal.Footer>
          </Modal>



        </Container>
      </Navbar>

       <Nav className=' p-3 ' variant="black" defaultActiveKey="/home"  >
      <Nav.Item style={{paddingLeft:"76px"}}>
        <Nav.Link 
         className='' eventKey="link-1"  onClick={() => setSearch('no')} style={{fontWeight:"500",color: "#344054"}}>
          All Candidates</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link className='' onClick={() => setSearch('Yes')}
           eventKey="link-2" style={{ color: "#344054",fontWeight:"500" }}>Rejected</Nav.Link>
        </Nav.Item>

      </Nav>
      <div className={`container ${(addModalIsOpen || editModalIsOpen) ? 'blur' : ''}`}
       style={{ backgroundColor: " rgba(249, 250, 251, 1)" }} >
        <div className=' d-flex mt-4   justify-content-between border bg-white'
         style={{borderTopLeftRadius:"8px",borderTopRightRadius:"8px"}} >

          <h5 className='float-left  mt-4 ' style={{ paddingLeft: "30px" }}>Team Members</h5>


          <button style={{ backgroundColor: "#7F56D9", color: "white", marginRight: "30px" }} 
          onClick={openAddModal} id='b' className='btn mb-4 mt-4 float-right'  >
            Add new candidate
          </button>
        </div>
        <MDBTable   align='middle' border={"1px"} responsive className=' mb-0' >
          <MDBTableHead >


            <tr >
              <td style={{ backgroundColor: " rgba(249, 250, 251, 1)", paddingLeft: "36px" }}
               scope='col' className='text-start '>Candidate</td>
              <td style={{ backgroundColor: " rgba(249, 250, 251, 1)" }} scope='col'>Date of joining</td>
              <td style={{ backgroundColor: " rgba(249, 250, 251, 1)" }} scope='col'>Designation</td>
              <td style={{ backgroundColor: " rgba(249, 250, 251, 1)" }} scope='col'>Email Address</td>
              <td style={{ backgroundColor: " rgba(249, 250, 251, 1)" }} scope='col'>Status</td>
              <td style={{ backgroundColor: " rgba(249, 250, 251, 1)" }} scope='col'>Action</td>
            </tr>

          </MDBTableHead>
          <MDBTableBody>
          {records.filter((item) => {
            const searchTerm = search.toLowerCase();
            const projectValue = item[filterType].toLowerCase();
            return projectValue.includes(searchTerm);
          }).map((i, index) => (
                <tr>
                  <td>
                    <div className='d-flex align-items-center'>

                      <div className='ms-3'>
                        <p style={{ padding: "8px" }} className='fw-normal mb-1'>
                          <a href={`/recruiterView/${i._id}`} style={{textDecoration:"none",color:'black'}}>
                            {i.fname} {i.lname}</a></p>

                      </div>
                    </div>
                  </td>
                  <td>
                    {moment(i.jdate).format("DD/MM/YYYY")}
                  </td>
                  <td>
                    <p className='fw-normal mb-1'>{i.dsesignation}</p>

                  </td>
                  <td>{i.email}</td>
                  <td>
                    <MDBBadge className={` ${i.status === "Completed" ? 'green' : ""
                     || i.status === "Active" ? 'violet' : ""
                     || i.status === "Pending" ? 'orange' : ""
                     || i.status === "Review pending" ? 'blue' : ""
                     || i.status === "Rejected" ? 'red' : "" }`} pill>
                     {i.status}
                    </MDBBadge>

                  </td>
                  <td>
                    <LuPen onClick={() => openEditModal(i)} className="  icon" />
                    <LuTrash2 className=" icon2" onClick={() => handleDeleteClick(i._id,i.status)}/>

                  </td>
                </tr>
             ))}


          </MDBTableBody>


        </MDBTable>
        <nav className='border' style={{ backgroundColor: " white",
        borderBottomLeftRadius:"8px",borderBottomRightRadius:"8px" }}  >
          <ul className='pagination d-flex  justify-content-between p-1 mt-3' >

            <li className='page-item float-left ' style={{ paddingLeft: '30px' }} >
              <a href='#' style={{ borderRadius: "8px" }}
               className='page-link bg-white  text-dark border index ' onClick={prePage}> Previous</a>

            </li>
 
               <div className='page-item d-flex'>
               {
              numbers.map((n, i) => (
                <li className="ms-2" key={i} >
                  <a className={`page-link float-center one ${currentPage === n ? 'active' : ''}`} 
                  onClick={() => changeCpage(n)}>{n}</a>
                </li>
                  ))
                }
                </div>


            
            <li className='page-item float-right ' style={{ paddingRight: '30px' }} >
              <a href='#' style={{ borderRadius: "8px" }} className='page-link bg-white text-dark  index' 
              onClick={nextPage}>Next </a>

            </li>
          </ul>
        </nav>
        <Modal className='deleteModal' show={isShow} onHide={initModal}>

          <div className="deleteModalBody">

            <div className="deleteModalContent">
              <h3>Delete Candidate</h3>
              <p>Are you sure you want to delete the candidate?</p>
            </div>

            <div className="deleteModalButtons">
              <button onClick={cancleDelete} className='deleteButtonNo'>No</button>
              <button onClick={confirmDelete} className='deleteButtonYes'>Yes</button>
            </div>

          </div>


        </Modal>



      </div>
      {(addModalIsOpen || editModalIsOpen) && <div className="overlay"></div>}

      {addModalIsOpen &&
        <div className='addCandidateModal'>
          <AddNewCandidate close={closeAddModal} />
        </div>
      }

      {editModalIsOpen &&
        <div className='addCandidateModal'>
          <EditNewCandidate close={closeEditModal} UserToEdit={UserToEdit} />
        </div>
      }

      <ToastContainer autoClose={800} position="top-center" />

    </div>
  )
  function prePage() {
    if (currentPage !== firstIndex) {
      setCurrentPage(currentPage - 1)
    }

  }
  function nextPage() {
    if (currentPage !== lastIndex) {
      setCurrentPage(currentPage + 1)
    }

  }

  function changeCpage(id) {
    setCurrentPage(id)

  }
}

export default Dashboard