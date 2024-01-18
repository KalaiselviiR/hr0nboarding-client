import React, { useEffect, useState } from 'react'
import "./Dashboard.css"
import { LuPen, LuTrash2 } from "react-icons/lu";
import { MDBBadge, MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import AddNewCandidate from '../AddNewCandidate/AddNewCandidate'
import EditNewCandidate from '../EditNewCandidate/EditNewCandidate'
import { Modal, Button } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import moment from 'moment';
import Nav from 'react-bootstrap/Nav';
import { getallCandidates } from '../../service/allapi';
function Dashboard() {

  const [isShow, invokeModal] = useState(false);
  const [UserToEdit, setUserToEdit] = useState(null);

  const initModal = () => {
    invokeModal(!isShow);
  };


  const [allcandidate, SetAllCandidate] = useState([])

  const [addModalIsOpen, setAddModalIsOpen] = useState(false)
  const [editModalIsOpen, setEditModalIsOpen] = useState(false)

  const openAddModal = () => {
    setAddModalIsOpen(true)
  }

  const closeAddModal = () => {
    setAddModalIsOpen(false)
  }
  const openEditModal = (user) => {
    console.log(user);
    setUserToEdit(user)
    setEditModalIsOpen(true)
  }

  const closeEditModal = () => {
    setEditModalIsOpen(false)
  }

  useEffect(() => {
    const handleClickedOutside = (event) => {
      if ((addModalIsOpen || editModalIsOpen) && !event.target.closest('.addCandidateModal')) {
        closeAddModal()
        closeEditModal()
      }
    }

    document.addEventListener('mousedown', handleClickedOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickedOutside)
    };

  }, [addModalIsOpen, editModalIsOpen])

  const [currentPage, setCurrentPage] = useState(1)
  const recordsPerPage = 7;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = allcandidate.slice(firstIndex, lastIndex);
  const npages = Math.ceil(allcandidate.length / recordsPerPage);
  const numbers = [...Array(npages + 1).keys()].slice(1)

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

  return (
    <div className='container' style={{ backgroundColor: " rgba(250, 251, 255, 1)", position: 'relative' }} >
       <Nav className='p-4 border' variant="pills" defaultActiveKey="/home" >
      <Nav.Item>
        <Nav.Link className='na' href="/dashboard">All Candidates</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link className='na' eventKey="link-1">Rejected</Nav.Link>
      </Nav.Item>
   
    </Nav>
      <div className={` ${(addModalIsOpen || editModalIsOpen) ? 'blur' : ''}`} >
        <div className=' d-flex   justify-content-between border bg-white'  >

          <h5 className='float-left  mt-4 ' style={{ paddingLeft: "30px" }}>Team Members</h5>


          <button style={{backgroundColor:"#7F56D9",color:"white",marginRight:"30px"}} onClick={openAddModal} id='b' className='btn mb-4 mt-4 float-right'  >
            Add new candidate
          </button>
        </div>
        <MDBTable align='middle' border={"1px"} responsive className='mb-0' >
          <MDBTableHead >


            <tr >
              <td style={{ backgroundColor: " rgba(249, 250, 251, 1)", paddingLeft: "36px" }} scope='col' className='text-start '>Candidate</td>
              <td style={{ backgroundColor: " rgba(249, 250, 251, 1)" }} scope='col'>Date of joining</td>
              <td style={{ backgroundColor: " rgba(249, 250, 251, 1)" }} scope='col'>Designation</td>
              <td style={{ backgroundColor: " rgba(249, 250, 251, 1)" }} scope='col'>Email Address</td>
              <td style={{ backgroundColor: " rgba(249, 250, 251, 1)" }} scope='col'>Status</td>
              <td style={{ backgroundColor: " rgba(249, 250, 251, 1)" }} scope='col'>Action</td>
            </tr>

          </MDBTableHead>
          <MDBTableBody>
            {
              records.length > 0 ? records.map((i, index) => (
                <tr>
                  <td>
                    <div className='d-flex align-items-center'>

                      <div className='ms-3'>
                        <p style={{ padding: "12px" }} className='fw-normal mb-1'>{i.fname} {i.lname}</p>

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
                    <MDBBadge className="violet" pill>
                      Active
                    </MDBBadge>

                  </td>
                  <td>
                    <LuPen onClick={() => openEditModal(i)} className="  icon" />
                    <LuTrash2 className=" icon2" onClick={initModal} />

                  </td>
                </tr>
              )
              ) : ""
            }


          </MDBTableBody>


        </MDBTable>
        <nav className='border' style={{ backgroundColor: " white" }} >
          <ul className='pagination d-flex  justify-content-between p-1 mt-3' >

            <li className='page-item float-left ' style={{ paddingLeft: '30px' }} >
              <a href='#' style={{ borderRadius: "8px" }} className='page-link bg-white  text-dark border index ' onClick={prePage}> Previous</a>

            </li>
            {
              numbers.map((n, i) => (

                <li className={`page-item float-center ${currentPage === n ? 'active' : ''}`} key={i}>
                  <a className='page-link   ' onClick={() => changeCpage(n)}>{n}</a>
                </li>


              ))
            }
            <li className='page-item float-right ' style={{ paddingRight: '30px' }} >
              <a href='#' style={{ borderRadius: "8px" }} className='page-link bg-white text-dark  index  ' onClick={nextPage}>Next </a>

            </li>
          </ul>
        </nav>
        <Modal show={isShow} onHide={initModal}>
          <Modal.Header className="custom-modal-header" closeButton>
            <Modal.Title>Delete Candidate</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure you want to the delete ?</Modal.Body>
          <Modal.Footer>
            <Button className='btn-no' style={{ backgroundColor: '#A020F0', borderColor: '#A020F0' }} onClick={initModal}>
              No
            </Button>
            <Button className='btn-yes' style={{ backgroundColor: '#A020F0', borderColor: '#A020F0' }} onClick={initModal}>
              Yes
            </Button>
          </Modal.Footer>
        </Modal>



      </div>

      {addModalIsOpen &&
        <div className='addCandidateModal'>
          <AddNewCandidate />
        </div>
      }

      {editModalIsOpen &&
        <div className='addCandidateModal'>
          <EditNewCandidate  UserToEdit={UserToEdit} />
        </div>
      }

<ToastContainer autoClose={800}  position="top-center" />

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