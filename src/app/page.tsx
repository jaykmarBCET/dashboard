'use client'
import { UserFlatList } from '@/components/UserFlatList'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect } from 'react'
import { UserStore } from '@/store/User'

const Home = () => {
  const router = useRouter()
  const {users,getUser} = UserStore()
  const handelAdd = useCallback(()=>{
    router.push("/add")
  },[router])

  useEffect(()=>{
    getUser()
  },[getUser])
  return (
    <div className="w-screen min-h-screen bg-white text-black">
      <h3 className='text-3xl font-bold text-center pt-4 mb-2 font-serif'>Dashboard</h3>
      {
        <UserFlatList users={users}/>
      }
      <div className='w-screen flex justify-center'>
        <button onClick={handelAdd} className='bg-blue-400 mt-4 px-6 py-1 rounded-sm hover:bg-blue-600'>Add User</button>
      </div>
      
    </div>
  )

}

export default Home