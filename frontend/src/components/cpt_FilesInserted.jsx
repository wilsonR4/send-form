import {React,useState} from 'react'

const iconClass = {
  img: "bi bi-file-earmark-image",
  video: "bi bi-file-earmark-play",
  audio: "bi bi-file-earmark-music",
  txt: "bi bi-file-earmark-text",
  docx: "bi bi-filetype-docx",
  excel: "bi bi-file-earmark-excel",
  pdf: "bi bi-filetype-pdf",
  exe: "bi bi-filetype-exe",
  gif: "bi bi-filetype-gif",
  zip: "bi bi-file-earmark-zip"
};

function convertDateFile(data,typeConvert){
  let result = 0;
  switch(typeConvert){
    case "KB":
       result = data/1024;
      break;
    case "MB":
      result = data/1024/1024;
      break;
    case "GB":
      result = data/1024/1024/1024;
      break;
    case "B": result = data; break;
  }
  return (data < 1024)? result : result.toFixed(2);
}

function deleteFile(d,f){
  const data = d.filter(i=> i.name!==f);
  return data;
}

function cpt_FilesInserted({name="",typeIcons="",sizeFile="",data="",dltFiles=""}) {

  const newData = deleteFile(data,name);

  return (
    <div className="rounded d-flex justify-content-between align-items-center border p-2 my-2 box_files">
      {
        (typeIcons === "image/png" || typeIcons === "image/jpeg" || typeIcons === "image/gif")?
          (<i className={`${iconClass.img} file_img`}></i>):
        (typeIcons === "video/mp4")?
          (<i className={`${iconClass.video} file_video`}></i>):
        (typeIcons === "audio/mp3" || typeIcons === "audio/wav" || typeIcons === "audio/ogg" || typeIcons === "audio/mpeg")?
          (<i className={`${iconClass.audio} file_audio fileIcon`}></i>):
        (typeIcons === "text/plain")?
          (<i className={`${iconClass.txt} file_txt`}></i>):
        (typeIcons === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" || typeIcons === "application/msword")?
          (<i className={`${iconClass.docx} file_docx`}></i>):
        (typeIcons === "application/vnd.ms-excel")?
          (<i className={`${iconClass.excel} file_excel`}></i>):
        (typeIcons === "application/pdf")?
          (<i className={`${iconClass.pdf} file_pdf`}></i>):
        (typeIcons === "application/x-zip-compressed")?
          (<i className={`${iconClass.zip} file_zip`}></i>):
        (typeIcons === "application/x-msdownload")?
          (<i className={`${iconClass.exe} file_exe`}></i>): ""
      }
        
      <span className="text-truncate px-2" title={name} style={{width:58.56}}>
        {name}<br/>
        <span className="fst-italic" style={{fontSize:10}}>
          {
            ((sizeFile >= 1024) && (sizeFile < 1024576))?//KB
              `${convertDateFile(sizeFile,"KB")}KB`
            :
            ((sizeFile >= 1024576) && (sizeFile < 1073741824))?//MB
              `${convertDateFile(sizeFile,"MB")}MB`
            :
            ((sizeFile >= 1073741824) && (sizeFile < 1099511627776))?//GB
              `${convertDateFile(sizeFile,"GB")}GB`
            :(sizeFile < 1024)? `${convertDateFile(sizeFile,"B")}B`:""
          }
        </span>
      </span>
      <button type="button" className="btn-close" onClick={()=>dltFiles({newData:newData,reductionSize: sizeFile})}></button>
    </div>
  )
}

export {cpt_FilesInserted}