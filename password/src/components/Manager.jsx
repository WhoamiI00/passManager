import React, { useEffect, useState } from 'react'
import { IoEye, IoEyeOff } from "react-icons/io5";
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import 'react-toastify/dist/ReactToastify.css';

const Manager = () => {
    const [passVisible, setpassVisible] = useState(false);
    const [form, setform] = useState({ site: "", username: "", password: "", id: "" });
    const [passwordsArray, setpasswordsArray] = useState([])

    useEffect(() => {
        let passwords = localStorage.getItem("passwords");
        if (passwords) {
            setpasswordsArray(JSON.parse(passwords))
        }
    }, [])


    const copytext = (text) => {
        toast('Copied to ClipBoard!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
        navigator.clipboard.writeText(text)
    }
    const editPassword = (id) => {
        console.log("Editing password with id : ", id)
        setform(passwordsArray.filter(i=>i.id===id)[0])
        setpasswordsArray(passwordsArray.filter(item => item.id !== id))
    }
    const deletePassword = (id) => {
        let c = confirm("Confirm Delete")
        if(c) {
        console.log("Deleting password with id : ", id)
        setpasswordsArray(passwordsArray.filter(item => item.id !== id))
        localStorage.setItem("passwords", JSON.stringify(passwordsArray.filter(item => item.id !== id)))
        }
    }
    const toggleEye = () => {
        setpassVisible(!passVisible);
    };
    const savePassword = () => {
        if(form.site.length>3 && form.username.length>3 && form.password.length) {
        toast('Password Saved!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
        setpasswordsArray([...passwordsArray, { ...form, id: uuidv4() }])
        localStorage.setItem("passwords", JSON.stringify([...passwordsArray, { ...form, id: uuidv4() }]))
        console.log(...passwordsArray, form);
        setform({site:"",username:"",password:""})
    }
    else{
        toast('Error Password not Saved!')
    }
    }
    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }
    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
                transition="Bounce"
            />
            <ToastContainer />
            <div className="absolute inset-0 -z-10 h-full w-full bg-green-50 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
                <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,#C9EBFF,transparent)]"></div>
            </div>
            <div className='max-w-4xl md:mycontainer py-10'>
                <h1 className='text-4xl text font-bold text-center'><span className='text-green-700'>&lt;</span>Pass<span className='text-green-700'>OP/&gt;</span></h1>
                <p className='text-green-500 text-center'>Your Password Manager</p>
            </div>
            <div className='text-black flex flex-col p-0 gap-6 items-center w-full'>
                <input value={form.site} onChange={handleChange} className="rounded-full border border-green-500 w-1/2 p-4 py-1" type='text' name='site' placeholder='Enter Website URL' />
                <div className='flex flex-col md:flex-row w-1/2 justify-between gap-4'>
                    <input value={form.username} onChange={handleChange} className="rounded-full w-full border border-green-500 p-4 py-1" type='text' name='username' placeholder='Enter UserName' />
                    <div className="relative">
                        <input value={form.password} onChange={handleChange} className="right-0 z-0 w-full rounded-full border border-green-500 p-4 py-1" type={!passVisible ? 'text' : 'password'} name='password' placeholder='Enter Password' />
                        <span className='absolute right-2 top-1 z-1' onClick={toggleEye}>{!passVisible ? <IoEye className='text-2xl' /> : <IoEyeOff className='text-2xl' />}</span>
                    </div>
                </div>
                <button className='flex justify-center items-center bg-green-400 rounded-full px-4 py-2 w-fit hover:bg-green-300 gap-2 border-2 border-green-500' onClick={savePassword}>
                    <lord-icon src="https://cdn.lordicon.com/jgnvfzqg.json" trigger="hover" onClick={() => savePassword}></lord-icon>
                    Save</button>
                <div className="passwords w-1/2 my-10">
                    <h2 className='font-bold text-2xl py-4'>Your Passwords</h2>
                    {passwordsArray.length === 0 && <div> No Passwords to Show</div>}
                    {passwordsArray.length != 0 &&
                        <table className='table-auto w-full overflow-hidden rounded-md'>
                            <thead className='bg-green-800 text-white'>
                                <tr>
                                    <th className='py-2'>Site</th>
                                    <th className='py-2'>UserName</th>
                                    <th className='py-2'>Password</th>
                                    <th className='py-2'>Actions</th>
                                </tr>
                            </thead>
                            <tbody className='bg-green-100'>
                                {passwordsArray.map((item, index) => {
                                    return <tr key={index}>
                                        <td className='text-center w-65 py-2 border border-white'><a href={item.site} target='_blank'>{item.site}</a>
                                            <lord-icon onClick={() => copytext(item.site)} style={{ width: "25px", height: "25px", paddingTop: "8px", paddingLeft: "5px", cursor: "pointer" }} src="https://cdn.lordicon.com/iykgtsbt.json" trigger="hover"></lord-icon>
                                        </td>
                                        <td className='text-center w-38 py-2 border border-white'>{item.username}<lord-icon onClick={() => copytext(item.username)} style={{ width: "25px", height: "25px", paddingTop: "8px", paddingLeft: "5px", cursor: "pointer" }} src="https://cdn.lordicon.com/iykgtsbt.json" trigger="hover"></lord-icon></td>
                                        <td className='text-center w-38 py-2 border border-white'>{item.password}<lord-icon onClick={() => copytext(item.password)} style={{ width: "25px", height: "25px", paddingTop: "8px", paddingLeft: "5px", cursor: "pointer" }} src="https://cdn.lordicon.com/iykgtsbt.json" trigger="hover"></lord-icon></td>
                                        <td className='text-center w-20 py-2 px-0 border border-white'>
                                            <span className='cursor-pointer' onClick={() => editPassword(item.id)}>
                                                <lord-icon style={{ width: "25px", height: "25px", paddingTop: "8px", paddingLeft: "5px", cursor: "pointer" }} src="https://cdn.lordicon.com/gwlusjdu.json" trigger="hover"></lord-icon>
                                            </span>
                                            <span className='cursor-pointer mx-2' onClick={() => deletePassword(item.id)}>
                                                <lord-icon style={{ width: "25px", height: "25px", paddingTop: "8px", paddingLeft: "5px", cursor: "pointer" }} src="https://cdn.lordicon.com/skkahier.json" trigger="hover"></lord-icon>
                                            </span>
                                        </td>
                                    </tr>
                                })}

                            </tbody>
                        </table>
                    }
                </div>
            </div>
        </>
    )
}

export default Manager