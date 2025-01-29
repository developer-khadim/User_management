// import React, { useState, useRef, useEffect } from "react";
// import { Edit, Download, Trash2, UploadCloud, Plus, FileImage, FileVideo, Maximize, Minimize, Play, Pause } from "lucide-react";
// import { useDispatch, useSelector } from 'react-redux';
// import { updateUserMedia, deleteMedia } from "../../store/userSlice";
// import ClipLoader from "react-spinners/ClipLoader";
// import axios from 'axios';

// const MediaPage = () => {
//   const mediaFromState = useSelector((state) => state.user?.userData?.media || []);
//   const [mediaList, setMediaList] = useState(mediaFromState);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [newUpload, setNewUpload] = useState({ title: "", file: null });
//   const [currentEdit, setCurrentEdit] = useState(null);
//   const [fullScreenMedia, setFullScreenMedia] = useState(null);
//   const fileInputRef = useRef(null);
//   const videoRefs = useRef({});
//   const dispatch = useDispatch();
//   const [message, setMessage] = useState('')

//   useEffect(() => {
//     if (Array.isArray(mediaFromState)) {
//       setMediaList(mediaFromState);
//     }
//   }, [mediaFromState]);

//   useEffect(() => {
//     axios.get(`${import.meta.env.VITE_BASE_URL}/media/getMedia`, {
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem('token')}`,
//       }
//     }).then((response) => {
//       console.log(response.data);
//       dispatch(updateUserMedia({ media: response.data.media }));
//     }).catch((error) => {
//       console.log(error);
//     });
//   }, [dispatch]);

//   const handleFileSelect = (e) => {
//     const file = e.target.files[0];
//     if (file && (file.type.startsWith('image/') || file.type.startsWith('video/'))) {
//       setNewUpload(prev => ({
//         ...prev,
//         file,
//         title: file.name.split('.')[0]
//       }));
//     } else {
//       alert("Please upload only image or video files.");
//     }
//   };

//   const saveNewUpload = () => {
//     if (!newUpload.file || !newUpload.title) {
//       alert("Please select a file and provide a title.");
//       return;
//     }
//     setLoading(true);

//     const formData = new FormData();
//     formData.append('title', newUpload.title);
//     formData.append('file', newUpload.file);

//     axios.post(`${import.meta.env.VITE_BASE_URL}/media/upload-media`, formData, {
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem('token')}`,
//         "Content-Type": "multipart/form-data",
//       }
//     }).then((response) => {
//       const { id, title, url, type } = response.data.media;
//       const newMedia = {
//         id: currentEdit ? currentEdit.id : id,
//         title: title,
//         url: url,
//         type: type
//       };

//       if (currentEdit) {
//         dispatch(updateUserMedia({ media: mediaFromState.map(item => item.id === currentEdit.id ? newMedia : item) }));
//       } else {
//         dispatch(updateUserMedia({ media: [...mediaFromState, newMedia] }));
//       }

//       setNewUpload({ title: "", file: null });
//       setCurrentEdit(null);
//       setIsModalOpen(false);
//       if (fileInputRef.current) fileInputRef.current.value = "";
//     }).catch((error) => {
//       setMessage(error.response.data?.error)
//       window.alert(error.data.error);
//     }).finally(() => {
//       setLoading(false);
//     });
//   };

//   const handleDelete = (id) => {
//     console.log("the Media ID: ", id);
//     axios.delete(`${import.meta.env.VITE_BASE_URL}/media/delete-media/${id}`, {
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem('token')}`,
//       }
//     }).then((response) => {
//       dispatch(deleteMedia({ _id: response.data.id }));
//       console.log("The server response: ", response.data.id);
//     }).catch((error) => {
//       window.alert(error.message);
//       console.log(error);
//     });
//   };

//   const handleDownload = (item) => {
//     const link = document.createElement("a");
//     link.href = item.url;
//     link.download = item.title;
//     link.click();
//   };

//   const openFileUploader = () => {
//     fileInputRef.current.click();
//   };

//   const toggleFullScreen = (media) => {
//     if (fullScreenMedia === media) {
//       setFullScreenMedia(null);
//     } else {
//       setFullScreenMedia(media);
//     }
//   };

//   const togglePlayPause = (mediaId) => {
//     const videoElement = videoRefs.current[mediaId];
//     if (videoElement) {
//       if (videoElement.paused) {
//         videoElement.play();
//       } else {
//         videoElement.pause();
//       }
//     }
//   };

//   return (
//     <div>
//       <div className="space-y-4">
//         <h1 className="text-2xl font-bold tracking-tight">Media Page</h1>
//         <p className="text-muted-foreground">
//           You can upload videos and images of up to 1GB in size.
//           Additionally, you have the ability to download, edit,
//           and delete your files as needed. Rest assured, your
//           data is securely encrypted and safely stored, ensuring
//           privacy and protection. Explore the library to manage
//           your content effortlessly.
//         </p>
//       </div>

//       <div className="mx-auto pt-5">
//         <h1 className="text-3xl font-bold text-gray-800 mb-6">Media Library</h1>

//         <div className="mb-6">
//           <button
//             onClick={() => {
//               setCurrentEdit(null);
//               setIsModalOpen(true);
//             }}
//             className="flex items-center gap-2 bg-black/90 text-white px-4 py-3 rounded-lg hover:bg-black transition-colors"
//           >
//             <Plus size={20} />
//             Add Media
//           </button>
//           <p className="text-red-500">{message}</p>

//         </div>

//         {/* Media Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//           {mediaList == null ?
//             (<h1>Loading---</h1>) :
//             (mediaList.map((media) => (
//               <div
//                 key={media._id}
//                 className="relative bg-white rounded-lg shadow-md overflow-hidden hover:scale-105 transition transform"
//               >
//                 {media.type.startsWith('image') ? (
//                   <img src={media.url} alt={media.title} className="w-full h-64 object-cover" />
//                 ) : (
//                   <div className="relative">
//                     <video
//                   ref={el => (videoRefs.current[media.id] = el)}
//                   src={media.url}
//                   className="w-full h-64 object-cover"
//                   loop muted
//                 />
//                     <div className="absolute bottom-2 right-2 flex space-x-2">
//                       <button
//                         onClick={() => togglePlayPause(media._id)}
//                         className="bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
//                       >
//                         {videoRefs.current[media._id]?.paused ? <Play size={20} /> : <Pause size={20} />}
//                       </button>
//                     </div>
//                   </div>
//                 )}

//                 <div className="p-4">
//                   <h3 className="font-semibold text-gray-800 truncate">{media.title}</h3>
//                   <div className="flex justify-between items-center mt-2">
//                     <span className="text-sm text-gray-500">{media.type}</span>
//                     <div className="flex space-x-2">
//                       <button
//                         onClick={() => toggleFullScreen(media)}
//                         className="text-gray-500 hover:text-gray-700 transition-colors"
//                       >
//                         {fullScreenMedia === media ? <Minimize size={20} /> : <Maximize size={20} />}
//                       </button>
//                       <button
//                         onClick={() => handleDownload(media)}
//                         className="text-blue-500 hover:text-blue-700 transition-colors"
//                       >
//                         <Download size={20} />
//                       </button>
//                       <button
//                         onClick={() => handleDelete(media._id)}
//                         className="text-red-500 hover:text-red-700 transition-colors"
//                       >
//                         <Trash2 size={20} />
//                       </button>
//                       <button
//                         onClick={() => {
//                           setCurrentEdit(media);
//                           setNewUpload({ title: media.title, file: media.file });
//                           setIsModalOpen(true);
//                         }}
//                         className="text-green-500 hover:text-green-700 transition-colors"
//                       >
//                         <Edit size={20} />
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             )))}
//         </div>

//         {/* Full Screen Modal */}
//         {fullScreenMedia && (
//           <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4">
//             <button
//               onClick={() => toggleFullScreen(null)}
//               className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
//             >
//               <Minimize size={30} />
//             </button>

//             {fullScreenMedia.type.startsWith('image/') ? (
//               <img
//                 src={fullScreenMedia.url}
//                 alt={fullScreenMedia.title}
//                 className="max-w-full max-h-full object-contain"
//               />
//             ) : (
//               <div className="relative">
//                 <video
//                   src={fullScreenMedia.url}
//                   className="max-w-full max-h-full"
//                   controls
//                   autoPlay
//                 />
//               </div>
//             )}
//           </div>
//         )}

//         {/* Upload Modal */}
//         {isModalOpen && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//             <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
//               <h2 className="text-xl font-bold mb-4 text-gray-800">
//                 {currentEdit ? "Edit Media" : "Upload Media"}
//               </h2>

//               <input
//                 type="file"
//                 ref={fileInputRef}
//                 onChange={handleFileSelect}
//                 accept="image/*,video/*"
//                 className="hidden"
//               />

//               <div
//                 onClick={openFileUploader}
//                 className="border-2 border-dashed border-blue-300 rounded-lg p-6 text-center cursor-pointer hover:border-blue-500 transition-colors"
//               >
//                 {newUpload.file ? (
//                   <div className="flex items-center justify-center gap-4">
//                     {newUpload.file.type.startsWith('image/') ? (
//                       <FileImage size={40} className="text-blue-500" />
//                     ) : (
//                       <FileVideo size={40} className="text-blue-500" />
//                     )}
//                     <span>{newUpload.file.name}</span>
//                   </div>
//                 ) : (
//                   <div className="text-gray-500">
//                     <UploadCloud size={40} className="mx-auto mb-2" />
//                     <p>Click to select file</p>
//                   </div>
//                 )}
//               </div>

//               <input
//                 type="text"
//                 placeholder="Title"
//                 value={newUpload.title}
//                 onChange={(e) => setNewUpload(prev => ({ ...prev, title: e.target.value }))}
//                 className="w-full mt-4 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />

//               <div className="flex justify-end space-x-2 mt-4">
//                 <button
//                   onClick={() => setIsModalOpen(false)}
//                   className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={saveNewUpload}
//                   className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//                 >
//                   {loading ? (<ClipLoader color={"#FFFFFF"} loading={loading} size={20} />) : (currentEdit ? "Update" : "Upload")}
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default MediaPage;

import React, { useState, useRef, useEffect } from "react";
import {
  Edit,
  Download,
  Trash2,
  UploadCloud,
  Plus,
  FileImage,
  FileVideo,
  Maximize,
  Minimize,
  Play,
  Pause,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserMedia, deleteMedia } from "../../store/userSlice";
import ClipLoader from "react-spinners/ClipLoader";
import axios from "axios";

const MediaPage = () => {
  const mediaFromState = useSelector(
    (state) => state.user?.userData?.media || []
  );
  const [mediaList, setMediaList] = useState(mediaFromState);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [newUpload, setNewUpload] = useState({ title: "", file: null });
  const [currentEdit, setCurrentEdit] = useState(null);
  const [fullScreenMedia, setFullScreenMedia] = useState(null);
  const [deleting, setDeleting] = useState({}); // Use an object to track deleting state
  const fileInputRef = useRef(null);
  const videoRefs = useRef({});
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (Array.isArray(mediaFromState)) {
      setMediaList(mediaFromState);
    }
  }, [mediaFromState]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/media/getMedia`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        dispatch(updateUserMedia({ media: response.data.media }));
      })
      .catch((error) => {
        console.log(error);
      });
  }, [dispatch]);

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (
      file &&
      (file.type.startsWith("image/") || file.type.startsWith("video/"))
    ) {
      setNewUpload((prev) => ({
        ...prev,
        file,
        title: file.name.split(".")[0],
      }));
    } else {
      alert("Please upload only image or video files.");
    }
  };

  const saveNewUpload = () => {
    if (!newUpload.file || !newUpload.title) {
      alert("Please select a file and provide a title.");
      return;
    }
    setLoading(true);

    const formData = new FormData();
    formData.append("title", newUpload.title);
    formData.append("file", newUpload.file);

    axios
      .post(`${import.meta.env.VITE_BASE_URL}/media/upload-media`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        const { id, title, url, type } = response.data.media;
        const newMedia = {
          id: currentEdit ? currentEdit.id : id,
          title: title,
          url: url,
          type: type,
        };

        if (currentEdit) {
          dispatch(
            updateUserMedia({
              media: mediaFromState.map((item) =>
                item.id === currentEdit.id ? newMedia : item
              ),
            })
          );
        } else {
          dispatch(updateUserMedia({ media: [...mediaFromState, newMedia] }));
        }

        setNewUpload({ title: "", file: null });
        setCurrentEdit(null);
        setIsModalOpen(false);
        if (fileInputRef.current) fileInputRef.current.value = "";
      })
      .catch((error) => {
        setMessage(error.response.data?.error);
        window.alert(error.data.error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleDelete = async (mediaId) => {
    try {
      // Set loading state for this specific media item
      setDeleting((prev) => ({ ...prev, [mediaId]: true }));

      const response = await axios.delete(
        `${import.meta.env.VITE_BASE_URL}/media/delete-media/${mediaId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      // Check if deletion was successful
      if (response.data.id || response.data._id) {
        // Dispatch to Redux store - matches your deleteMedia reducer
        dispatch(deleteMedia({ _id: mediaId }));
        setMessage("Media deleted successfully");
      }
    } catch (error) {
      console.error("Error deleting media:", error);
      setMessage(error.response?.data?.error || "Failed to delete media");
    } finally {
      // Reset loading state for this media item
      setDeleting((prev) => ({ ...prev, [mediaId]: false }));
    }
  };

  const handleDownload = (item) => {
    const link = document.createElement("a");
    link.href = item.url;
    link.download = item.title;
    link.click();
  };

  const openFileUploader = () => {
    fileInputRef.current.click();
  };

  const toggleFullScreen = (media) => {
    if (fullScreenMedia === media) {
      setFullScreenMedia(null);
    } else {
      setFullScreenMedia(media);
    }
  };

  const togglePlayPause = (mediaId) => {
    const videoElement = videoRefs.current[mediaId];
    if (videoElement) {
      if (videoElement.paused) {
        videoElement.play();
      } else {
        videoElement.pause();
      }
    }
  };

  return (
    <div>
      <div className="space-y-4">
        <h1 className="text-2xl font-bold tracking-tight">Media Page</h1>
        <p className="text-muted-foreground">
          You can upload videos and images of up to 1GB in size. Additionally,
          you have the ability to download, edit, and delete your files as
          needed. Rest assured, your data is securely encrypted and safely
          stored, ensuring privacy and protection. Explore the library to manage
          your content effortlessly.
        </p>
      </div>

      <div className="mx-auto pt-5">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Media Library</h1>

        <div className="mb-6">
          <button
            onClick={() => {
              setCurrentEdit(null);
              setIsModalOpen(true);
            }}
            className="flex items-center gap-2 bg-black/90 text-white px-4 py-3 rounded-lg hover:bg-black transition-colors"
          >
            <Plus size={20} />
            Add Media
          </button>
          <p className="text-red-500">{message}</p>
        </div>

        {/* Media Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {mediaList == null ? (
            <h1>Loading---</h1>
          ) : (
            mediaList.map((media) => (
              <div
                key={media._id}
                className="relative bg-white rounded-lg shadow-md overflow-hidden hover:scale-105 transition transform"
              >
                {media.type.startsWith("image") ? (
                  <img
                    src={media.url}
                    alt={media.title}
                    className="w-full h-64 object-cover"
                  />
                ) : (
                  <div className="relative">
                    <video
                      ref={(el) => (videoRefs.current[media._id] = el)}
                      src={media.url}
                      className="w-full h-64 object-cover"
                      loop
                      muted
                    />
                    <div className="absolute bottom-2 right-2 flex space-x-2">
                      <button
                        onClick={() => togglePlayPause(media._id)}
                        className="bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                      >
                        {videoRefs.current[media._id]?.paused ? (
                          <Play size={20} />
                        ) : (
                          <Pause size={20} />
                        )}
                      </button>
                    </div>
                  </div>
                )}

                <div className="p-4">
                  <h3 className="font-semibold text-gray-800 truncate">
                    {media.title}
                  </h3>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-sm text-gray-500">{media.type}</span>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => toggleFullScreen(media)}
                        className="text-gray-500 hover:text-gray-700 transition-colors"
                      >
                        {fullScreenMedia === media ? (
                          <Minimize size={20} />
                        ) : (
                          <Maximize size={20} />
                        )}
                      </button>
                      <button
                        onClick={() => handleDownload(media)}
                        className="text-blue-500 hover:text-blue-700 transition-colors"
                      >
                        <Download size={20} />
                      </button>
                      <button
                        onClick={() => handleDelete(media._id)}
                        className="text-red-500 hover:text-red-700 transition-colors"
                        disabled={deleting[media._id]}
                      >
                        {deleting[media._id] ? (
                          <ClipLoader
                            color={"#FF0000"}
                            loading={true}
                            size={20}
                          />
                        ) : (
                          <Trash2 size={20} />
                        )}
                      </button>
                      <button
                        onClick={() => {
                          setCurrentEdit(media);
                          setNewUpload({
                            title: media.title,
                            file: media.file,
                          });
                          setIsModalOpen(true);
                        }}
                        className="text-green-500 hover:text-green-700 transition-colors"
                      >
                        <Edit size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Full Screen Modal */}
        {fullScreenMedia && (
          <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4">
            <button
              onClick={() => toggleFullScreen(null)}
              className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
            >
              <Minimize size={30} />
            </button>

            {fullScreenMedia.type.startsWith("image/") ? (
              <img
                src={fullScreenMedia.url}
                alt={fullScreenMedia.title}
                className="max-w-full max-h-full object-contain"
              />
            ) : (
              <div className="relative">
                <video
                  src={fullScreenMedia.url}
                  className="max-w-full max-h-full"
                  controls
                  autoPlay
                />
              </div>
            )}
          </div>
        )}

        {/* Upload Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
              <h2 className="text-xl font-bold mb-4 text-gray-800">
                {currentEdit ? "Edit Media" : "Upload Media"}
              </h2>

              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileSelect}
                accept="image/*,video/*"
                className="hidden"
              />

              <div
                onClick={openFileUploader}
                className="border-2 border-dashed border-blue-300 rounded-lg p-6 text-center cursor-pointer hover:border-blue-500 transition-colors"
              >
                {newUpload.file ? (
                  <div className="flex items-center justify-center gap-4">
                    {newUpload.file.type.startsWith("image/") ? (
                      <FileImage size={40} className="text-blue-500" />
                    ) : (
                      <FileVideo size={40} className="text-blue-500" />
                    )}
                    <span>{newUpload.file.name}</span>
                  </div>
                ) : (
                  <div className="text-gray-500">
                    <UploadCloud size={40} className="mx-auto mb-2" />
                    <p>Click to select file</p>
                  </div>
                )}
              </div>

              <input
                type="text"
                placeholder="Title"
                value={newUpload.title}
                onChange={(e) =>
                  setNewUpload((prev) => ({ ...prev, title: e.target.value }))
                }
                className="w-full mt-4 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <div className="flex justify-end space-x-2 mt-4">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={saveNewUpload}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {loading ? (
                    <ClipLoader color={"#FFFFFF"} loading={loading} size={20} />
                  ) : currentEdit ? (
                    "Update"
                  ) : (
                    "Upload"
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MediaPage;
