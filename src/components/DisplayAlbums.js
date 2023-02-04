import React, { useEffect, useState } from 'react'

function DisplayAlbums({data}) {
  let [edit,setEdit]=useState(false)
  let[index,setIndex]=useState(-1)
  let [value,setValue]=useState('')
  let[renderData,setRenderData]=useState(data)
  let[showAlbum,setShow]=useState(false)
  let[alValue,setAlValue]=useState("")
  const DeleteIndexData=(index)=>{
    console.log('dddd',index);
     const NewData=renderData.filter((item,id)=>id!==index)
     console.log(NewData);
     setRenderData(NewData)
  }
  const handleAlbumCreation=()=>{
    setShow(true)
    if(showAlbum){
      const URL="https://jsonplaceholder.typicode.com/albums"
      fetch('https://jsonplaceholder.typicode.com/posts', {
  method: 'POST',
  body: JSON.stringify({
    alValue
  }),
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
})
  .then((response) => response.json()).then((res)=>{
    if(res.alValue.length>0){
    const updated={
      id:res.id,
      title:res.alValue
    }
    console.log(updated);
    setRenderData([updated,...renderData])
    setShow(false)
    setAlValue("")}
  })
  .catch((err) =>{setShow(false); setAlValue("")});
    }
  }
  useEffect(()=>{setRenderData(data)},[data])
  return (
    <div className='album-container'>
      <div style={{width:"100%",display:'flex',alignItems:'center'}}>
       {showAlbum?<input style={{width:'88%',backgroundColor:'black',marginRight:'2%',padding:'.5rem',color:'white'}} type={'text'} value={alValue} onChange={(e)=>setAlValue(e.target.value)}/>:null}
      <button onClick={()=>handleAlbumCreation()} style={{alignSelf:"flex-end",margin:'.5rem',padding:10,backgroundColor:'black',color:'white'}}>{showAlbum?'Create Album' :'+ ADD ALBUM'} </button>
      </div>
         {renderData.map((item,id)=>(
          <div onClick={()=>setValue(item.title)}>
            <LineData item={item} edit={edit} value={value} setValue={setValue} setEdit={setEdit} index={index} setIndex={setIndex}id={id} DeleteIndexData={DeleteIndexData}/>
          </div>
         ))}
    </div>
  )
}
const LineData=({item,edit,value,setValue,setEdit,index,setIndex ,id,DeleteIndexData})=>{
  let [load,setLoad]=useState(false)
   const handleEdit=()=>{
    setEdit(true);
    setIndex(id)
    if(edit && index==id){
      setLoad(true)
      const URL=`https://jsonplaceholder.typicode.com/albums/${index+1}`
      //  const URL="https://jsonplaceholder.typicode.com/posts/1"
      fetch(URL,{
        method:'PUT',
        mode: 'cors', 
        headers: {
                  'Content-type': 'application/json; charset=UTF-8',
              },
        body:JSON.stringify({value})
      }).then(res=>res.json()).then((res)=>{setLoad(false);item.title=res.value;;setIndex(-1)})
      .catch(err=>{setLoad(false);setIndex(-1)})
    }
   }
   const handleDelete=()=>{
          const URL=`https://jsonplaceholder.typicode.com/albums/${item.id}`
      //  const URL="https://jsonplaceholder.typicode.com/posts/1"
      fetch(URL,{
        method:'DELETE',
      }).then(res=>res.json()).then((res)=>{
          DeleteIndexData(id)
      })
      .catch(err=>{setLoad(false);setIndex(-1)})
    }
  return(
    <div className='line' style={{width:'100%',display:'flex',justifyContent:'space-between'}} >{
      edit && index==id?<input style={{width:'85%'}} type={'text'} value={value} onChange={(e)=>setValue(e.target.value)}/>:item.title}
      <div style={{display:'flex',flexDirection:'row',backgroundColor:'GrayText'}}>
      <button className='btn' onClick={()=>{handleEdit()}}>{load?'.....':edit && index==id?'Update':'Edit'}</button>
      <button className="btn" style={{backgroundColor:'red',color:'white'}} onClick={()=>handleDelete()}>Delete</button>
      </div>
    </div>
  )
}
export default DisplayAlbums