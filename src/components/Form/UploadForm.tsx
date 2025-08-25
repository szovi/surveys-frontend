import React from "react"
import { useForm } from "react-hook-form"
import Breadcrumb from "../Layout/Breadcrumb"
import { Breadcrumbs } from "../../utils/breadcrumbMapper"
import { useUploadFileMutation, type UploadTarget } from "../../services/dataUploadApi"
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import "../../styles/UploadForm.scss"

type UploadFormValues = {
  target: UploadTarget
  file: FileList
}

const UploadForm: React.FC = () => {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<UploadFormValues>()
  const [uploadFile] = useUploadFileMutation()

  const onSubmit = async (data: UploadFormValues) => {
    if (!data.file?.[0]) return

    try {
      await uploadFile({ target: data.target, file: data.file[0] }).unwrap()
      toast.success("✅ Sikeres adatfeltöltés!")
      reset()
    } catch (err: any) {
      toast.error(`❌ Feltöltés sikertelen: ${err?.data?.message || err?.message || "Ismeretlen hiba"}`)
    }
  }

  return (
    <div className="upload-form-page">
      <Breadcrumb items={Breadcrumbs.upload()} />
      <p>This form allows uploading data for 4 tables: Surveys, Members, Statuses, and Participations.</p>

      <form onSubmit={handleSubmit(onSubmit)} className="upload-form">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="target">Select Data Type</label>
            <select id="target" {...register("target", { required: true })}>
              <option value="">-- Select --</option>
              <option value="surveys">Surveys</option>
              <option value="members">Members</option>
              <option value="statuses">Statuses</option>
              <option value="participations">Participations</option>
            </select>
            {errors.target && <span className="error">Please select a type</span>}
          </div>

          <div className="form-group">
            <label htmlFor="file">Upload CSV File</label>
            <input
              type="file"
              id="file"
              accept=".csv"
              {...register("file", { required: true })}
            />
            {errors.file && <span className="error">Please upload a CSV file</span>}
          </div>
        </div>

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Uploading..." : "Upload"}
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
