// import React, { useState } from 'react'
// import { useForm } from 'react-hook-form'
// import Breadcrumb from '../Layout/Breadcrumb'
// import { Breadcrumbs } from '../../utils/breadcrumbMapper'
// import { useUploadFileMutation } from '../../services/dataUploadApi'
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css'
// import '../../styles/UploadForm.scss'
// import UploadNote from './UploadNote'

// type UploadFormValues = {
//   file: FileList
// }

// const UploadForm: React.FC = () => {
//   const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<UploadFormValues>()
//   const [uploadFile] = useUploadFileMutation()
//   const [noteOpen, setNoteOpen] = useState(false)
//   const [selectedFileName, setSelectedFileName] = useState<string | null>(null);

//   const onSubmit = async (data: UploadFormValues) => {
//     if (!data.file?.[0]) return

//     const file = data.file?.[0];

//     if (!file.name.toLowerCase().endsWith('.csv')) {
//       toast.error('❌ The uploaded file must be a comma separated file (CSV)!');
//       return;
//     }

//     try {
//       await uploadFile({ file: data.file[0] }).unwrap()
//       toast.success('✅ Sikeres adatfeltöltés!')
//       reset()
//     } catch (err: any) {
//       toast.error(`❌ Feltöltés sikertelen: ${err?.data?.message || err?.message || 'Ismeretlen hiba'}`)
//     }
//   }

//   return (
//     <div className="upload-form-page">
//       <Breadcrumb items={Breadcrumbs.upload()} />
//       <p>This form allows uploading data for 4 tables: Surveys, Members, Statuses, and Participations.</p>

//       <div className="upload-note">
//         <div 
//           className="note-header" 
//           onClick={() => setNoteOpen(!noteOpen)}
//         >
//           NOTE!
//         </div>
//         {noteOpen && (
//           <UploadNote />
//         )}
//       </div>

//       <form onSubmit={handleSubmit(onSubmit)} className="upload-form">
//         <div className="form-row">
//           <div className="form-group">
//             <label htmlFor="file">Upload CSV File</label>
//             <input
//               type="file"
//               id="file"
//               accept=".csv"
//               {...register('file', { required: true })}
//               onChange={(e) => setSelectedFileName(e.target.files?.[0]?.name ?? null)}
//             />
//             {errors.file && <span className="error">Please upload a CSV file</span>}
//           </div>
//         </div>

//         <button type="submit" disabled={isSubmitting}>
//           {isSubmitting ? 'Uploading...' : 'Upload'}
//         </button>
//       </form>

//       <ToastContainer 
//         position="top-right" 
//         autoClose={4000} 
//         hideProgressBar={false} 
//         newestOnTop={false} 
//         closeOnClick 
//         pauseOnFocusLoss 
//         draggable 
//         pauseOnHover 
//       />
//     </div>
//   )
// }

// export default UploadForm


import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import Breadcrumb from '../Layout/Breadcrumb'
import { Breadcrumbs } from '../../utils/breadcrumbMapper'
import { useUploadFileMutation } from '../../services/dataUploadApi'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import '../../styles/UploadForm.scss'
import UploadNote from './UploadNote'

type UploadFormValues = {
  file: FileList
}

const UploadForm: React.FC = () => {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<UploadFormValues>()
  const [uploadFile] = useUploadFileMutation()
  const [noteOpen, setNoteOpen] = useState(false)
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);

  const onSubmit = async (data: UploadFormValues) => {
    if (!data.file?.[0]) return

    const file = data.file[0];

    if (!file.name.toLowerCase().endsWith('.csv')) {
      toast.error('❌ The uploaded file must be a comma separated file (CSV)!');
      return;
    }

    try {
      await uploadFile({ file }).unwrap()
      toast.success('✅ Sikeres adatfeltöltés!')
      reset()
      setSelectedFileName(null)
    } catch (err: any) {
      toast.error(`❌ Feltöltés sikertelen: ${err?.data?.message || err?.message || 'Ismeretlen hiba'}`)
    }
  }

  return (
    <div className="upload-form-page">
      <Breadcrumb items={Breadcrumbs.upload()} />
      <p>This form allows uploading data for 4 tables: Surveys, Members, Statuses, and Participations.</p>

      <div className="upload-note">
        <div 
          className="note-header" 
          onClick={() => setNoteOpen(!noteOpen)}
        >
          NOTE!
        </div>
        {noteOpen && (
          <UploadNote />
        )}
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="upload-form">
        <div className="form-row">
          <div className="form-group">
            <input
              type="file"
              id="file"
              accept=".csv"
              {...register('file', { required: true })}
              onChange={(e) => setSelectedFileName(e.target.files?.[0]?.name ?? null)}
            />
            <label htmlFor="file">Choose CSV File</label>
            {selectedFileName && <span className="file-name">{selectedFileName}</span>}
            {errors.file && <span className="error">Please upload a CSV file</span>}
          </div>
        </div>

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Uploading...' : 'Upload'}
        </button>
      </form>

      <ToastContainer 
        position="top-right" 
        autoClose={4000} 
        hideProgressBar={false} 
        newestOnTop={false} 
        closeOnClick 
        pauseOnFocusLoss 
        draggable 
        pauseOnHover 
      />
    </div>
  )
}

export default UploadForm
