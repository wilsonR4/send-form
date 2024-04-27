import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import rectContent from "sweetalert2-react-content";

import { cpt_FilesInserted as FilesInserted } from "./components/cpt_FilesInserted";
import { cpt_badgeAccountAdd as BadgeAccountAdd } from "./components/cpt_badgeAccountAdd";

const myAlert = rectContent(Swal);
const myToast = myAlert.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.onmouseenter = myAlert.stopTimer;
    toast.onmouseleave = myAlert.resumeTimer;
  },
});

function App() {
  const vrENV = import.meta.env.CONNECTION_URL;
  const [values, setValues] = useState({
    name_lastName: "",
    toEmail: "",
    ccEmail: [],
    ccoEmail: [],
    subjectEmail: "",
    writeEmail: "",
    filesEmail: [],
  });
  const [sizeFiles, setSizeFiles] = useState(0);

  const multipleEmail = (e) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    switch (e.target.id) {
      case "floating_for":
        if (emailPattern.test(e.target.value) && e.target.value.endsWith(";")) {
          const value = e.target.value;
          e.target.value = "";
          setValues((previewArray) => ({
            ...previewArray,
            toEmail: [...previewArray.toEmail, value.slice(0, -1)],
          }))
        } else {
          console.log("invalid");
        }

        break;
      case "input_Cc":
        if (emailPattern.test(e.target.value) && e.target.value.endsWith(";")) {
          const value = e.target.value;
          e.target.value = "";
          setValues((previewArray) => ({
            ...previewArray,
            ccEmail: [...previewArray.ccEmail, value.slice(0, -1)],
          }));
        } else {
          console.log("invalid");
        }
        break;
      case "input_Cco":
        if (emailPattern.test(e.target.value) && e.target.value.endsWith(";")) {
          const value = e.target.value;
          e.target.value = "";
          setValues((previewArray) => ({
            ...previewArray,
            ccoEmail: [...previewArray.ccoEmail, value.slice(0, -1)],
          }));
        } else {
          console.log("invalid");
        }
        break;
      default:
        break;
    }
  };

  const handleInputFile = (e) => {
    const inputFiles = e.target.files;

    Object.keys(inputFiles).map((file) => {
      setSizeFiles(sizeFiles + inputFiles[file].size);
    });
    setValues((previewArray) => ({
      ...previewArray,
      filesEmail: [...previewArray.filesEmail, inputFiles[0]],
    }));
  };

  const sendForm = (e) => {
    e.preventDefault();
    if (sizeFiles <= 34603008) {
      if (values.toEmail.length > 0) {
        const formData = new FormData();
        formData.append("name_lastName", values.name_lastName);
        formData.append("forEmail", values.toEmail);
        formData.append("ccEmail", values.ccEmail);
        formData.append("ccoEmail", values.ccoEmail);
        formData.append("subjectEmail", values.subjectEmail);
        formData.append("writeEmail", values.writeEmail);
        values.filesEmail.map((item) => {
          formData.append("filesEmail", item);
        });
        axios
          .post(`${vrENV}/sendEmail`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
          })
          .then((res) => {
            if (res.data.status === "successfully") {
              myToast.fire({
                icon: "success",
                html: "<span class='text-success'>Email sent successfully.</span>",
              });
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        myToast.fire({
          icon: "info",
          html: "<span class='text-primary'>The ' to ' field cannot be empty, or the email must end with ' ; '</span>",
        });
      }
    } else {
      myToast.fire({
        icon: "error",
        html: "<span class='text-danger'>You cannot send more than 33MB files.</span>",
      });
    }
  };

  return (
    <>
      <div className="container p-2 h-100">
        <h1 className="text-center mb-3">
          Send Form{" "}
          <span className="badge text-bg-primary">
            version 1.0.0{" "}
            <span style={{ fontSize: 10 }}>developed by Wilson Rivero</span>
          </span>
        </h1>

        <div className="row">
          <div className="col-lg-12">
            <form
              className="form overflow-y-auto mx-auto shadow-lg p-3 rounded"
              id="from"
              style={{ height: 500, maxWidth: 950 }}
            >
              {/* form */}
              {/* ------------------------------------------------------------------------------------------ */}
              <input
                type="text"
                className="form-control"
                placeholder="name & last name"
                onChange={(e) =>
                  setValues({ ...values, name_lastName: e.target.value })
                }
              />
              {/* name & last name */}
              {/* ------------------------------------------------------------------------------------------ */}
              <div className="accordion" id="accordionOptionEmail">
                {/* accordion */}
                <div className="accordion-item border-0">
                  <div className="input-group">
                    {/* ------------------------------------------------------------------------------------------ */}
                    <input
                      type="text"
                      className="form-control"
                      id="floating_for"
                      placeholder="for: Exemple@gmail.com;"
                      onChange={multipleEmail}
                    />
                    {/* input for email */}
                    <span className="input-group-text p-0">
                      <button
                        className="input-group-text accordion-button collapsed  mx-auto d-flex justify-content-center"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseOne"
                        aria-expanded="false"
                        aria-controls="collapseOne"
                      ></button>
                    </span>
                    {values.toEmail.length === 0 ? (
                      ""
                    ) : (
                      <div
                        className="container d-flex flex-wrap overflow-y-auto pt-3"
                        style={{ height: 100 }}
                      >
                        {values.toEmail.map((v, index) => (
                          <BadgeAccountAdd
                            key={index}
                            account={v}
                            data={values.toEmail}
                            deleteAccount={(e) =>
                              setValues((prev) => ({ ...prev, forEmail: e }))
                            }
                          />
                        ))}
                      </div>
                    )}
                  </div>
                  <div
                    id="collapseOne"
                    className="accordion-collapse collapse"
                    data-bs-parent="#accordionOptionEmail"
                  >
                    <div className="accordion-body p-0">
                      {/* ------------------------------------------------------------------------------------------ */}
                      <div className="container p-0">
                        <input
                          type="text"
                          className="form-control"
                          id="input_Cc"
                          placeholder="Cc: Exemple@gmail.com;"
                          onChange={multipleEmail}
                        />
                        {/* input CC email */}
                        {values.ccEmail.length === 0 ? (
                          ""
                        ) : (
                          <div
                            className="container d-flex flex-wrap overflow-y-auto pt-3"
                            style={{ height: 100 }}
                          >
                            {values.ccEmail.map((v, index) => (
                              <BadgeAccountAdd
                                key={index}
                                account={v}
                                data={values.ccEmail}
                                deleteAccount={(e) =>
                                  setValues((prev) => ({ ...prev, ccEmail: e }))
                                }
                              />
                            ))}
                          </div>
                        )}
                      </div>
                      {/* ------------------------------------------------------------------------------------------ */}
                      <div className="container p-0">
                        <input
                          type="text"
                          className="form-control"
                          id="input_Cco"
                          placeholder="Cco: Exemple@gmail.com;"
                          onChange={multipleEmail}
                        />
                        {/* input CCO email */}
                        {values.ccoEmail.length === 0 ? (
                          ""
                        ) : (
                          <div
                            className="container d-flex flex-wrap overflow-y-auto pt-3"
                            style={{ height: 100 }}
                          >
                            {values.ccoEmail.map((v, index) => (
                              <BadgeAccountAdd
                                key={index}
                                account={v}
                                data={values.ccoEmail}
                                deleteAccount={(e) =>
                                  setValues((prev) => ({
                                    ...prev,
                                    ccoEmail: e,
                                  }))
                                }
                              />
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* ------------------------------------------------------------------------------------------ */}
              <input
                type="text"
                className="form-control"
                placeholder="subject"
                onChange={(e) =>
                  setValues({ ...values, subjectEmail: e.target.value })
                }
              />
              {/* input subject */}

              {/* ------------------------------------------------------------------------------------------ */}
              <div className="container p-0">
                <div className="row">
                  {/* ------------------------------------------------------------------------------------------ */}
                  <div className="col-lg-8">
                    <textarea
                      cols="30"
                      rows="10"
                      className="form-control"
                      id="writeText"
                      placeholder="write an email"
                      onChange={(e) =>
                        setValues({ ...values, writeEmail: e.target.value })
                      }
                    ></textarea>
                    {/* write message */}
                  </div>
                  {/* ------------------------------------------------------------------------------------------ */}
                  <div className="col-lg-2 overflow-y-auto contentFileInserted p-1">
                    {/* files Inserted */}
                    {values.filesEmail.map((ob, index) => (
                      <FilesInserted
                        key={index}
                        typeIcons={ob.type}
                        name={ob.name}
                        sizeFile={ob.size}
                        data={values.filesEmail}
                        dltFiles={(e) => {
                          setValues((prev) => ({
                            ...prev,
                            filesEmail: e.newData,
                          }));
                          setSizeFiles(sizeFiles - e.reductionSize);
                        }}
                      />
                    ))}
                  </div>

                  <div className="col-lg-2 d-flex align-items-center">
                    <div className="mx-auto d-grid gap-2 container">
                      <span className="text-center fw-bold">
                        {sizeFiles >= 1024 && sizeFiles < 1024576 //KB
                          ? `${(sizeFiles / 1024).toFixed(2)}KB`
                          : sizeFiles >= 1024576 && sizeFiles < 1073741824 //MB
                          ? `${(sizeFiles / 1024 / 1024).toFixed(2)}MB`
                          : sizeFiles >= 1073741824 && sizeFiles < 1099511627776 //GB
                          ? `${(sizeFiles / 1024 / 1024 / 1024).toFixed(2)}GB`
                          : sizeFiles < 1024
                          ? `${sizeFiles}B`
                          : ""}
                      </span>
                      {/* ------------------------------------------------------------------------------------------ */}
                      <label
                        type="button"
                        htmlFor="input_file"
                        className="btn btn-primary"
                      >
                        {/* files */}
                        <input
                          type="file"
                          className="d-none"
                          name="emails"
                          id="input_file"
                          accept="
                          .txt, .doc, .docx, .xls, .pdf,
                          image/*, video/*, audio/*, application/x-msdownload
                          "
                          onChange={handleInputFile}
                        />
                        <i className="bi bi-archive"></i>
                        <span className="ms-2">Files</span>
                      </label>
                      {/* ------------------------------------------------------------------------------------------ */}
                      <input
                        type="submit"
                        className="form-control rounded-pill"
                        value="send"
                        onClick={sendForm}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
