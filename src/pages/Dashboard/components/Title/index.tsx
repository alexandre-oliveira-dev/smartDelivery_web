import React from 'react'

type Styles ={
    size:string,
    color:string,
    align: 'center' | 'start' |'end',
    text:string    
}
export default function Title({align,color,size,text}:Styles){
    return(
     <div style={{width:'calc(100% - 250px)',margin:"20px 0 20px 0",display:"flex",justifyContent:"center"}}>
           <h2 style={{
            textAlign:align,
            color:color,
            fontSize:size,
            width:"80%",
            padding:"10px 0 10px 0",
            background:"#612f74",
            borderRadius:"10px"
        }}>
            {text}
        </h2>
     </div>
    )
}