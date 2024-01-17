import React, { useEffect, useState } from 'react'
import "./Dashboard.css"
import { LuPen, LuTrash2 } from "react-icons/lu";
import { MDBBadge, MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import AddNewCandidate from '../AddNewCandidate/AddNewCandidate'
import { Modal, Button } from 'react-bootstrap';

import moment from 'moment';
import { getallCandidates } from '../../service/allapi';
function Dashboard() {

  const [isShow, invokeModal] = useState(false);

  const initModal = () => {
    invokeModal(!isShow);
  };


  const [allcandidate, SetAllCandidate] = useState([])

  const [modalIsOpen, setModalIsOpen] = useState(false)

  const openModal = () => {
    setModalIsOpen(true)
  }

  const closeModal = () => {
    setModalIsOpen(false)
  }

  useEffect(() => {
    const handleClickedOutside = (event) => {
      if (modalIsOpen && !event.target.closest('.addCandidateModal')) {
        closeModal()
      }
    }

    document.addEventListener('mousedown', handleClickedOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickedOutside)
    };

  }, [modalIsOpen])

  //pagenation

  const [currentPage, setCurrentPage] = useState(1)
  const recordsPerPage = 7;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = allcandidate.slice(firstIndex, lastIndex);
  const npages = Math.ceil(allcandidate.length / recordsPerPage);
  const numbers = [...Array(npages + 1).keys()].slice(1)

     //define a function to call api
     const getAllCandidate=async()=>{
      const response=await getallCandidates()
      SetAllCandidate(response.data)
      console.log(response);
     
     }

       //  to fetch all candidates on component mount
  useEffect(() => {
    getAllCandidate();
  }, []);

  return (
    <div className='container' style={{ backgroundColor: " rgba(250, 251, 255, 1)", position: 'relative' }} >

      <div className={` ${modalIsOpen ? 'blur' : ''}`} >
      <div className=' d-flex mt-5  justify-content-between border bg-white'  >
            
            <h5 className='float-left  mt-4 '  style={{paddingLeft:"30px"}}>Team Members</h5>
        
         
          <button onClick={openModal} id='b' className='btn mb-4 mt-4 float-right'  >
              Add new candidate
            </button>
          </div>
        <MDBTable  align='middle' border={"1px"} responsive className='mb-0' >
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
        records.length > 0 ? records.map((i,index) => (
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
                <LuPen className="  icon" />
                <LuTrash2 className=" icon2"  onClick={initModal} />

              </td>
            </tr>
                )
                ):""
            }


          </MDBTableBody>

      
        </MDBTable>
        <nav className='border' style={{backgroundColor: " white"}} >
            <ul className='pagination d-flex  justify-content-between p-1 mt-3' >

              <li className='page-item float-left ' style={{paddingLeft:'30px'}} >
                <a href='#' style={{ borderRadius: "8px" }} className='page-link bg-white  text-dark border index ' onClick={prePage}> Previous</a>

              </li> 
              {
                numbers.map((n, i) => (
                 
                  <li   className={`page-item float-center ${currentPage === n ? 'active' : ''}`} key={i}>
                    <a className='page-link  border ' onClick={() => changeCpage(n)}>{n}</a>
                  </li>
               

                ))
              }
              <li className='page-item float-right ' style={{paddingRight:'30px'}} >
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
      {modalIsOpen &&
        <div className='addCandidateModal'>
          <AddNewCandidate />
        </div>
      }




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