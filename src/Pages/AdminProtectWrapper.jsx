import { useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { setAdminData } from '../store/adminSlice'
 
const AdminProtectWrapper = ({ children }) => {

    const token = localStorage.getItem('token') 
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(true)
    const dispatch = useDispatch()
    
    useEffect(() => {
     
     if(!token){
        navigate('/signin')
     }
     axios.get(`${import.meta.env.VITE_BASE_URL}/admin/profile`, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    }).then(response => {
        if (response.status === 200) {
            dispatch(setAdminData({adminData: response.data.admin}))
            setIsLoading(false)
        }
    })
        .catch(error => {
            localStorage.removeItem('token')
            navigate('/signin')
        })
     

    }, [dispatch, token, navigate])
    
    if(isLoading) {
        return (
            <div className="w-full h-full flex justify-center items-center py-56">
                <div className="w-16 h-16 border-gray-500 border-4 border-t-transparent rounded-full animate-spin"></div>
            </div>
        )
    }
    return (
        <>
        { children }
        </>
    )

}

export default AdminProtectWrapper