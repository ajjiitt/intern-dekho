import React,{useState} from 'react'
import InternshipCard from '../Cards/InternshipCard';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
const SideNav = () => {
  const [sidenav,setSidenav] = useState(1);

  return (
    <div className='pt-6 md:pl-20 md:pr-20 pr-3 pl-3'>
        <div >
            <div className='text-2xl md:text-3xl  font-medium'>Search For Internships</div>
        </div>
        <div className='flex flex-row gap-5 pt-2 pb-2 flex-wrap'>
            <div className=' hover:bg-navOrange text-base p-2 rounded-md font-medium' onClick={()=>{setSidenav(1)}}>Browse All</div>
            <div className=' hover:bg-navOrange text-base p-2 rounded-md font-medium' onClick={()=>{setSidenav(2)}}>Internshala</div>
            <div className=' hover:bg-navOrange text-base p-2 rounded-md font-medium' onClick={()=>{setSidenav(3)}}>Linked In</div>
            <div className=' hover:bg-navOrange text-base p-2 rounded-md font-medium' onClick={()=>{setSidenav(4)}}>Indeed</div>
        </div>
        <hr></hr>
        {
            sidenav === 1 && 
            <div className='flex p-3 gap-2 flex-col sm:flex-row'>
                <div className='basis-1/4 flex items-center  flex-col p-3 gap-2'  style={{transition:"box-shadow .25s, -webkit-box-shadow .25s",boxShadow:" 0 2px 2px 0 rgba(0,0,0,0.14),0 3px 1px -2px rgba(0,0,0,0.12),0 1px 5px 0 rgba(0,0,0,0.2)"}}>
                    <div className='flex flex-row'>
                        <FilterAltOutlinedIcon/>
                        <div>Filter</div>
                    </div>
                    <div className='flex flex-col mt-9'>
                        <div className=' flex items-center justify-center'>Keyword search</div>
                        <input className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm" placeholder="Search for anything..."/>
                    </div>
                </div>
                <div className='basis-3/4'><InternshipCard/></div>
            </div>            
        } 
    </div>
  )
}

export default SideNav