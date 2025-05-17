import GetUserEmail from '@/utils/currentemailUser'
import GetUserDetails from '@/utils/currentUser'
import { UserButton } from '@clerk/nextjs'
import { ArrowLeft, LogIn } from 'lucide-react';
import React from 'react'
import SignedOutLinks from '../Navbar/SignedOutLinks';

const Usercard = () => {
    return (
        <div className='md:ml-35'>
            {/* โปรไฟล์ */}
            <div className="border-2 border-purple-500 rounded-2xl p-4  m-20 flex flex-col items-center w-70 h-80">
                {/* ตรงนี้คือIcons */}
                <div className="flex  w-full mb-2 justify-between">
                    <button className="text-purple-600 text-2xl"><ArrowLeft /></button>
                    <button className="text-purple-600 text-2xl"><SignedOutLinks /></button>
                </div>
                {/* ส่วนของรูปโปรไฟล์ปรับแปต่งได้ถ้าไม่พอใจ มี Dose ในREADME */}
                <div>
                    <UserButton appearance={
                        {
                            elements: {
                                userButtonAvatarBox: {
                                    width: 100,
                                    height: 100,
                                    borderStyle: 'solid',
                                    borderWidth: '3px',
                                    borderColor: '#6500E0'
                                }
                            }
                        }
                    }
                    />
                </div>
                {/* ข้อมูลชื่อ อีเมล์ */}
                <div className="text-center mt-4">
                    <h2 className="text-purple-700 font-bold"><GetUserDetails /></h2>
                    <hr className="my-2 border-purple-300" />
                    <h1 className="text-purple-700"><GetUserEmail /></h1>
                    
                </div>
                {/* ปุ่ม */}
            </div>
        </div>

    )
}

export default Usercard