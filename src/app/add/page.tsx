'use client'

import React, { useCallback, useState } from 'react';
import { IUsers } from '@/models/user.model';
import { UserStore } from '@/store/User';
import { useRouter } from 'next/navigation';

function AddPage() {
    const [user, setUser] = useState<IUsers>({
        email: '',
        phoneNumber: '',
        officeEmail: '',
        companyEmail: '',
        createdAt: new Date(),
        updatedAt: new Date(),
        cinPanGst: '',
        remarks: '',
        isVerified: false,
        isRecruiter: false,
        password: '',
        favouriteCourses: [],
        agreeToTerms: false,
    });
    const router = useRouter()
    const { createUser } = UserStore();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setUser((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = useCallback(async () => {
        await createUser(user);
    }, [user, createUser]);

    return (
        <div className="bg-gray-300 flex flex-col justify-center items-center w-screen h-screen text-black">
            <div className="w-96  overflow-y-auto border border-gray-200 bg-gray-200 rounded-2xl shadow-2xl p-4">
                <h3 className="font-bold text-xl text-center py-1">Add User</h3>
                <hr className="text-gray-300 mb-4" />

                {[
                    { label: 'Phone Number', name: 'phoneNumber',require:true , type:"number" },
                    { label: 'Email', name: 'email', require:false, type:"email" },
                    { label: 'Company Email', name: 'companyEmail',require:false, type:"email" },
                    { label: 'Office Email', name: 'officeEmail',require:false, type:"email" },
                    { label: 'CIN/PAN/GST', name: 'cinPanGst', require:false , type:'text'},
                    { label: 'Remarks', name: 'remarks', require:false, type:"text" },
                    { label: 'Password', name: 'password',require:true , type:"password" },
                ].map(({ label, name,require,type }) => (
                    <div key={name} className="flex flex-col mb-2">
                        <label className="text-sm pl-1 font-semibold">
                            {label} {require&&<span className="text-red-500">*</span>}
                        </label>
                        <input
                            name={name}
                            
                            value={user[name as keyof IUsers] as string}
                            onChange={handleChange}
                            className="outline-none text-sm px-2 border py-1 rounded border-gray-300"
                            type={type}
                            placeholder={`Enter ${label}`}
                            required={require}
                        />
                    </div>
                ))}

                <div className="flex items-center mb-2">
                    <input
                        name="agreeToTerms"
                        type="checkbox"
                        checked={user.agreeToTerms}
                        onChange={handleChange}
                        className="mx-2"
                    />
                    <label className="text-sm font-semibold">Agree to Terms <span className="text-red-500">*</span></label>
                </div>

                <div className="flex items-center mb-2">
                    <input
                        name="isRecruiter"
                        type="checkbox"
                        checked={user.isRecruiter}
                        onChange={handleChange}
                        className="mx-2"
                    />
                    <label className="text-sm font-semibold">Is Recruiter</label>
                </div>

                <div className="flex items-center mb-4">
                    <input
                        name="isVerified"
                        type="checkbox"
                        checked={user.isVerified}
                        onChange={handleChange}
                        className="mx-2"
                        
                    />
                    <label className="text-sm font-semibold">Is Verified <span className="text-red-500">*</span></label>
                </div>
                <div className="flex justify-between gap-4 mt-4">
                    <button onClick={()=>router.push("/")} className="w-1/2 bg-blue-600 text-white font-semibold py-1 rounded hover:bg-blue-700 transition">Dashboard</button>
                    <button
                        onClick={() =>
                            setUser({
                                email: '',
                                phoneNumber: '',
                                officeEmail: '',
                                companyEmail: '',
                                createdAt: new Date(),
                                updatedAt: new Date(),
                                cinPanGst: '',
                                remarks: '',
                                isVerified: false,
                                isRecruiter: false,
                                password: '',
                                favouriteCourses: [],
                                agreeToTerms: false,
                            })
                        }
                        className="w-1/2 bg-gray-400 text-white font-semibold py-1 rounded hover:bg-gray-500 transition"
                    >
                        Reset
                    </button>
                    
                    <button
                        onClick={handleSubmit}
                        className="w-1/2 bg-blue-600 text-white font-semibold py-1 rounded hover:bg-blue-700 transition"
                    >
                        Submit
                    </button>
                </div>

            </div>
        </div>
    );
}

export default AddPage;
