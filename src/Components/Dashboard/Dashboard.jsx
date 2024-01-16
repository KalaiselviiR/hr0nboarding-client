import React, { useEffect, useState } from 'react'
import "./Dashboard.css"
import { LuPen, LuTrash2 } from "react-icons/lu";
import { MDBBadge, MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import AddNewCandidate from '../AddNewCandidate/AddNewCandidate'
import EditNewCandidate from '../EditNewCandidate/EditNewCandidate'
function Dashboard() {

  const [allExp, SetAllexp] = useState([])

  const [addModalIsOpen, setAddModalIsOpen] = useState(false)
  const [editModalIsOpen, setEditModalIsOpen] = useState(false)

  const openAddModal = () => {
    setAddModalIsOpen(true)
  }

  const closeAddModal = () => {
    setAddModalIsOpen(false)
  }

  const openEditModal = () => {
    setEditModalIsOpen(true)
  }

  const closeEditModal = () => {
    setEditModalIsOpen(false)
  }

  useEffect(() => {
    const handleClickedOutside = (event) => {
      if (addModalIsOpen ||editModalIsOpen && !event.target.closest('.addCandidateModal')) {
        closeAddModal() 
        closeEditModal()
      }
    }

    document.addEventListener('mousedown', handleClickedOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickedOutside)
    };

  }, [addModalIsOpen,editModalIsOpen])

  const [currentPage, setCurrentPage] = useState(1)
  const recordsPerPage = 4;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = allExp.slice(firstIndex, lastIndex);
  const npages = Math.ceil(allExp.length / recordsPerPage);
  const numbers = [...Array(npages + 1).keys()].slice(1)

  return (
    <div style={{ backgroundColor: " rgba(250, 251, 255, 1)", position: 'relative' }} >

      <div className={` ${addModalIsOpen || editModalIsOpen ? 'blur' : ''}`} >
        <MDBTable style={{ boxShadow: "0 4px 4px 4px rgba(0,0,0,0.1)" }} align='middle' border={"1px"} responsive className='mt-3' >
          <MDBTableHead >
            <div className='row' >
              <div className='col ms-4'>
                <h5 className='text-start  mt-4 ' >Team Members</h5>
              </div>
              <div className='col '>
                <button onClick={openAddModal} className='btn mb-4 mt-3 '  >
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
            <tr>
              <td>
                <div className='d-flex align-items-center'>

                  <div className='ms-3'>
                    <p style={{ padding: "12px" }} className='fw-normal mb-1'>John Doe</p>

                  </div>
                </div>
              </td>
              <td>
                27/10/2023
              </td>
              <td>
                <p className='fw-normal mb-1'>Software engineer</p>

              </td>
              <td>Jhon@gmail.com</td>
              <td>
                <MDBBadge className="violet" pill>
                  Active
                </MDBBadge>

              </td>
              <td>
                <LuPen onClick={openEditModal} className="  icon" />
                <LuTrash2 className=" icon2" />

              </td>
            </tr>
            <tr>
              <td>
                <div className='d-flex align-items-center'>

                  <div className='ms-3'>
                    <p style={{ padding: "12px" }} className='fw-normal mb-1'>Alex Ray</p>

                  </div>
                </div>
              </td>
              <td>
                09/10/2023
              </td>
              <td>
                <p className='fw-normal mb-1'>Consultant</p>

              </td>

              <td>Alex@gmail.com</td>
              <td>
                <MDBBadge className="green" pill>

                  Completed
                </MDBBadge>

              </td>
              <td >

                <LuPen className="  icon" />
                <LuTrash2 className=" icon2" s />

              </td>
            </tr>
            <tr>
              <td>
                <div className='d-flex align-items-center'>

                  <div className='ms-3'>
                    <p style={{ padding: "12px" }} className='fw-normal mb-1'>Alex Ray</p>

                  </div>
                </div>
              </td>
              <td>
                09/10/2023
              </td>
              <td>
                <p className='fw-normal mb-1'>Consultant</p>

              </td>

              <td>Alex@gmail.com</td>
              <td>
                <MDBBadge className="orange" pill>

                  Pending
                </MDBBadge>

              </td>
              <td>
                <LuPen className="  icon" />
                <LuTrash2 className="icon2" />

              </td>
            </tr>
            <tr>
              <td>
                <div className='d-flex align-items-center'>

                  <div className='ms-3'>
                    <p style={{ padding: "12px" }} className='fw-normal mb-1'>Alex Ray</p>

                  </div>
                </div>
              </td>
              <td>
                09/10/2023
              </td>
              <td>
                <p className='fw-normal mb-1'>Consultant</p>

              </td>

              <td>Alex@gmail.com</td>
              <td>
                <MDBBadge className="blue" pill>

                  Review Pending
                </MDBBadge>

              </td>
              <td>
                <LuPen className="icon" />
                <LuTrash2 className="icon2" />

              </td>
            </tr>


          </MDBTableBody>
          <nav className=' fs-5 p-4 ' >
            <ul className='pagination  ' >

              <li className='page-item'   >
                <a href='#' style={{ borderRadius: "8px" }} className='page-link bg-white  text-dark border index float-left' onClick={prePage}> Previous</a>

              </li>
              {
                numbers.map((n, i) => (
                  <li className={`page-item ${currentPage === n ? 'active' : ''}`} key={i}>
                    <a className='page-link bg-secondary border' onClick={() => changeCpage(n)}>{n}</a>
                  </li>

                ))
              }
              <li className='page-item btn-page '  >
                <a href='#' style={{ borderRadius: "8px" }} className='page-link bg-white text-dark border index ' onClick={nextPage}>Next </a>

              </li>
            </ul>
          </nav>
        </MDBTable>
      </div>
      {addModalIsOpen &&
        <div className='addCandidateModal'>
          <AddNewCandidate />
        </div>
      }

      {editModalIsOpen &&
        <div className="addCandidateModal">
          <EditNewCandidate />
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