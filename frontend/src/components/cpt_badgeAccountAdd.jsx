import React from 'react'

function dlAccount(d,a){
  const newArr = d.filter(i=> i!==a);
  return newArr;
}
const styles = {
  background: `rgb(25,178,230)`,
  height:45
};

function cpt_badgeAccountAdd({account,deleteAccount,data}) {
  const result = dlAccount(data,account);
  
  return (
    <>
        <span className="rounded-pill p-2 m-1" style={styles}>
            <span className="text-truncation text-light ms-2" title={`added account: ${account}`}>{account}</span>
            <button type="button" className="btn-close ms-2" onClick={()=>deleteAccount(result)}></button>
        </span>
        
    </>
  )
}

export {cpt_badgeAccountAdd}