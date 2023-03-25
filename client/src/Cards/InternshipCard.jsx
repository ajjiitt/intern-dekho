import React,{useState} from 'react'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkOutlinedIcon from '@mui/icons-material/BookmarkOutlined';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
const InternshipCard = (props) => {
    const [bookmark,setBookmark] = useState(0);
  return (
    <div>
        <div className='p-4' style={{transition:"box-shadow .25s, -webkit-box-shadow .25s",boxShadow:" 0 2px 2px 0 rgba(0,0,0,0.14),0 3px 1px -2px rgba(0,0,0,0.12),0 1px 5px 0 rgba(0,0,0,0.2)"}}>
            <div className='flex flex-row justify-between gap-1'>
                <div className='basis-1/12 flex justify-center'><LinkedInIcon className='' style={{fontSize:"45px",color:"rgb(10,102,194)"}}/></div>
                <div className='flex flex-col gap-2 basis-6/7'>
                    <div className=' shadow-black-100  rounded-md p-1 md:pt-2 flex items-center justify-start font-strong text-xl  '>{props.title}</div>
                    
                    <div className='flex flex-col sm:flex-row justify-between gap-1 '>
                        <div className=' shadow-black-100  rounded-md p-1 flex items-center justify-start font-semiStrong'>{props.company}</div>
                        <div className='flex items-center justify-start   shadow-black-100 font-semiStrong'>{props.location}</div>
                        <div className='flex items-center justify-start   shadow-black-100 font-semiStrong'>Salary : {props.salary} LPA</div>
                    </div>
                    <div className=' shadow-black-100  rounded-md p-1 flex items-center justify-start text-base ' style={{fontWeight:"500"}}>Lorem upawd aawda wawdawda adawda ...</div>
                    <div className=' shadow-black-100  rounded-md p-1 flex items-center justify-end cursor-pointer '><div className='bg-navOrange py-1 px-5 rounded-md'>view</div></div>
                </div>
                <div className='basis-1/12 flex justify-end pt-2 '>
                    {
                        bookmark === 0 && 
                        <BookmarkBorderIcon className='text-navOrange cursor-pointer' style={{fontSize:"30px"}} onClick={()=>{setBookmark(1)}}/>
                    }{
                        bookmark === 1 && 
                        <BookmarkOutlinedIcon className='text-navOrange cursor-pointer' style={{fontSize:"30px"}} onClick={()=>{setBookmark(0)}}/>
                    }     
                </div>
            </div>
        </div>
    </div>
  )
}

export default InternshipCard