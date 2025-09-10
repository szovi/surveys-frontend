const UploadNote: React.FC = () => {
    return (
        <div className="note-content">
          <p>
            <strong>Important!!</strong>
          </p>
          <p>
            The file upload mechanism in a wrong order, can turn out as an error. To avoid that, we suggest to upload the datas in the following order:
          </p>
          <ol>
           <li>Surveys</li>
           <li>Members</li>
           <li>Statuses</li>
           <li>Participants</li>
          </ol>
          <p>The most important is too, make sure that the Participants CSV upload is the last one.</p>
      </div>
    )
}

export default UploadNote
