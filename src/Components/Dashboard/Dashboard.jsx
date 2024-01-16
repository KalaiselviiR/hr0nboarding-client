import React, { useEffect, useState } from 'react'
import "./Dashboard.css"
import { LuPen, LuTrash2 } from "react-icons/lu";
import { MDBBadge, MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import AddNewCandidate from '../AddNewCandidate/AddNewCandidate'
import {
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
} from 'mdb-react-ui-kit';
import moment from 'moment';
import { getallCandidates } from '../../service/allapi';
function Dashboard() {

  const [allcandidate, SetAllCandidate] = useState([])

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
        <MDBTable style={{ boxShadow: "0 4px 4px 4px rgba(0,0,0,0.1)" }} align='middle' border={"1px"} responsive className='mt-3' >
          <MDBTableHead >
            <div className='row' >
              <div className='col ms-4'>
                <h5 className='text-start  mt-4 ' >Team Members</h5>
              </div>
              <div className='col '>
                <button onClick={openModal} className='btn mb-4 mt-3 '  >
                  Add new candidate
                </button>
              </div>
            </div>
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
                <LuTrash2 className=" icon2" onClick={handleShow} />

              </td>
            </tr>
                )
                ):<p className='text-danger text-center ms-5'>No Data Present</p>
            }


          </MDBTableBody>
          {/* <nav className='' style={{paddingLeft:"120%"}}  >
    <ul className='pagination '>
      <li className='page-item ' >
        <a href='#' className='page-link bg-white text-dark border index'  onClick={prePage}>Prev</a>    

      </li>
      {
        numbers.map((n, i)=>(
          <li className={`page-item ${currentPage === n ? 'active' : ''}`}key={i}>
            <a className='page-link bg-white border text-dark' onClick={()=>changeCpage(n)}>{n}</a>
          </li>

        ))
      }
        <li className='page-item'>
        <a href='#' className='page-link bg-white text-dark border index' onClick={nextPage}>Next</a>    

      </li>
    </ul>
  </nav> */}
          <nav className=' fs-5 p-4 '  >
            <ul className='pagination' >

              <li className='page-item'  >
                <a href='#' style={{ borderRadius: "8px" }} className='page-link bg-white  text-dark border index float-left' onClick={prePage}> Previous</a>

              </li>
              {/* {
                numbers.map((n, i) => (
                 
                  <li   className={`page-item  ${currentPage === n ? 'active' : ''}`} key={i}>
                    <a className='page-link  border ' onClick={() => changeCpage(n)}>{n}</a>
                  </li>
               

                ))
              } */}
              <li className='page-item btn-page '  >
                <a href='#' style={{ borderRadius: "8px" }} className='page-link bg-white text-dark border index ' onClick={nextPage}>Next </a>

              </li>
            </ul>
          </nav>
        </MDBTable>
        <MDBModal show={show} onHide={handleClose} tabIndex='-1'>
      <MDBModalDialog>
        <MDBModalContent>
          <MDBModalHeader>
            <MDBModalTitle>Delete Candidate</MDBModalTitle>
            <MDBBtn className='btn-close' color='none' ></MDBBtn>
          </MDBModalHeader>
          <MDBModalBody>Are you sure you want to delete the candidate?</MDBModalBody>

          <MDBModalFooter>
            <MDBBtn color='secondary' onClick={handleClose}>
              NO
            </MDBBtn>
            <MDBBtn color='success' onClick={handleClose}>Yes</MDBBtn>
          </MDBModalFooter>
        </MDBModalContent>
      </MDBModalDialog>
    </MDBModal>

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