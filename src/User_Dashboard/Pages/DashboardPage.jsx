import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  FolderIcon, 
  VideoIcon, 
  ImageIcon, 
  UploadIcon, 
  DownloadIcon, 
  ShareIcon 
} from "lucide-react";
import axios from 'axios'

const Dashboard = () => {

  const [totalUploads, setTotalUploads] = useState(0)
  const [totalImages, setTotalImages] = useState(0)
  const [totalVideos, setTotalVideos] = useState(0)
  const [imageFormats, setImageFormats] = useState({})
  const [videoFormats, setVideoFormats] = useState({})
  const [recentActivity, setRecentActivity] = useState([])

  
  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BASE_URL}/media/mediaData`, {
        headers: {
             Authorization: `Bearer ${localStorage.getItem('token')}`,
        }
    }).then((response) => {
          setTotalUploads(response.data.totalUploads)
          setTotalVideos(response.data.totalVideos)
          setTotalImages(response.data.totalImages)
          setImageFormats(response.data.imageFormats)
          setVideoFormats(response.data.videoFormats)
          setRecentActivity(response.data.recentUploads)
          // setMediaList(response.data.media)
    }).catch((error) => {
         console.log(error)
    }) 
  }, [])

 
 
  const storageData = {

    totalSpace: "500GB",
    usedSpace: "375GB",
    freeSpace: "125GB",
    totalVideos: totalVideos,
    totalImages: totalImages,
    recentUploads: 87,
    storageUsage: {
      videos: "225GB",
      images: "125GB",
      documents: "25GB"
    },
    popularFormats: {
      mp4: 289,
      mov: 145,
      avi: 76,
      jpg: 734,
      png: 498,
      gif: 55
    },
    monthlyStats: {
      uploads: totalUploads,
      downloads: 1892,
      shares: 245
    },
    recentActivity: [
      { type: 'upload', name: 'Project_Final.mp4', size: '1GB', date: '2 hours ago' },
      { type: 'share', name: 'Team_Photos.png', size: '156MB', date: '4 hours ago' },
      { type: 'download', name: 'Presentation.jpg', size: '8.5MB', date: '6 hours ago' },
      { type: 'upload', name: 'Client_Meeting.mov', size: '800MB', date: 'Yesterday' },
      { type: 'upload', name: 'Vacation.mp4', size: '345MB', date: 'Last Week' },
      { type: 'download', name: 'Work_Report.jpge', size: '12MB', date: '3 days ago' }
    ]
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        type: "spring",
        stiffness: 100 
      }
    }
  };

  const listItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { 
        duration: 0.3 
      }
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-50 p-0 md:p-8 xl:p-8 s:p-8 "
    >
      <motion.h1 
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        className="text-3xl font-bold mb-8 text-gray-800"
      >
        Storage Dashboard
      </motion.h1>
      
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={cardVariants}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6"
      >
        {/* Storage Card */}
        <motion.div 
          variants={cardVariants}
          className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
        >
          <div className="px-6 py-4 border-b flex items-center space-x-3">
            <FolderIcon className="w-6 h-6 text-blue-500" />
            <span className="font-semibold text-lg">Storage Overview</span>
          </div>
          <div className="p-6 space-y-4">
            <div className="space-y-2">
              <p className="text-gray-600">Total Space: <span className="font-bold">{storageData.totalSpace}</span></p>
              <p className="text-gray-600">Used Space: <span className="font-bold text-red-500">{storageData.usedSpace}</span></p>
              <p className="text-gray-600">Free Space: <span className="font-bold text-green-500">{storageData.freeSpace}</span></p>
              <motion.div 
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full bg-gray-200 rounded-full h-3 mt-2"
              >
                <div 
                  className="bg-blue-500 h-3 rounded-full" 
                  style={{ width: '75%' }}
                ></div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Videos Card */}
        <motion.div 
          variants={cardVariants}
          className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
        >
          <div className="px-6 py-4 border-b flex items-center space-x-3">
            <VideoIcon className="w-6 h-6 text-purple-500" />
            <span className="font-semibold text-lg">Video Statistics</span>
          </div>
          <div className="p-6 space-y-4">
            <motion.p 
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="text-4xl font-bold text-purple-600"
            >
              {storageData.totalVideos}
            </motion.p>
            <div className="space-y-2">
              <p className="text-sm text-gray-600">Popular Formats:</p>
              <div className="flex justify-between text-sm">
              {videoFormats && Object.keys(videoFormats).length > 0 ? (
                Object.keys(videoFormats).map((format, index) => (
                  <span key={index}>
                    {format.toUpperCase()}: {videoFormats[format]}
                  </span>
                ))
              ) : (
                <span>No video formats available</span>
              )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Images Card */}
        <motion.div 
          variants={cardVariants}
          className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
        >
          <div className="px-6 py-4 border-b flex items-center space-x-3">
            <ImageIcon className="w-6 h-6 text-pink-500" />
            <span className="font-semibold text-lg">Image Statistics</span>
          </div>
          <div className="p-6 space-y-4">
            <motion.p 
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="text-4xl font-bold text-pink-600"
            >
              {storageData.totalImages}
            </motion.p>
            <div className="space-y-2">
              <p className="text-sm text-gray-600">Popular Formats:</p>
              <div className="flex justify-between text-sm">
              {imageFormats && Object.keys(imageFormats).length > 0 ? (
                Object.keys(imageFormats).map((format, index) => (
                  <span key={index}>
                    {format.toUpperCase()}: {imageFormats[format]}
                  </span>
                ))
              ) : (
                <span>No image formats available</span>
              )}
                
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Additional Stats */}
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={cardVariants}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        {/* Monthly Activity */}
      <motion.div
        variants={cardVariants}
        className=" bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
      >
        <div className="px-6 py-4 border-b">
          <span className="font-semibold text-lg">Monthly Activity</span>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-center">
            <motion.div
              variants={listItemVariants}
              className="bg-blue-50 p-4 rounded-lg"
            >
              <div className="flex items-center justify-center mb-2">
                <UploadIcon className="w-6 h-6 text-blue-500 mr-2" />
                <p className="text-3xl font-bold text-blue-600">{storageData.monthlyStats.uploads}</p>
              </div>
              <p className="text-sm text-gray-600">Uploads</p>
            </motion.div>
            <motion.div
              variants={listItemVariants}
              className="bg-green-50 p-4 rounded-lg"
            >
              <div className="flex items-center justify-center mb-2">
                <DownloadIcon className="w-6 h-6 text-green-500 mr-2" />
                <p className="text-3xl font-bold text-green-600">{storageData.monthlyStats.downloads}</p>
              </div>
              <p className="text-sm text-gray-600">Downloads</p>
            </motion.div>
            <motion.div
              variants={listItemVariants}
              className="bg-purple-50 p-4 rounded-lg"
            >
              <div className="flex items-center justify-center mb-2">
                <ShareIcon className="w-6 h-6 text-purple-500 mr-2" />
                <p className="text-3xl font-bold text-purple-600">{storageData.monthlyStats.shares}</p>
              </div>
              <p className="text-sm text-gray-600">Shares</p>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Recent Activity */}
      <motion.div
        variants={cardVariants}
        className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden mt-6"
      >
        <div className="px-6 py-4 border-b">
          <span className="font-semibold text-lg">Recent Activity</span>
        </div>
        <div className="p-6">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
            className="space-y-4 "
          >
            {recentActivity.map((activity, index) => (
                <motion.div
                key={index}
                variants={listItemVariants}
                className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-gray-50 p-3 rounded-lg"
              >
                <div className="flex-1 mb-2 sm:mb-0">
                  <span className="font-medium">{`${activity.title}.${activity.type.split('/')[1]}`}</span>
                </div>
                <span className="text-gray-500 text-sm">{activity.uploadedAt}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Dashboard;