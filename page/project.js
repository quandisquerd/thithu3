import { useEffect, useState } from "../lib"
import "toastr/build/toastr.css"
import toastr from 'toastr'

const project = () => {
    const [data, setdata] = useState([])
    useEffect(() => {
        fetch('http://localhost:3000/project')
            .then((response) => response.json())
            .then(data => setdata(data))
    }, [])
    useEffect(()=>{
        const btns = document.querySelectorAll('.btn-primary')
        for(const btn of btns) {
            const id = btn.dataset.id;
            btn.addEventListener('click', () =>{
                const ok = confirm("Ban co muon xoa")
                if(ok==true){
                    fetch('http://localhost:3000/project/'+id,{
                    method: 'DELETE'
                    
                    
                })
                const newdata= data.filter((data)=>data.id!=id)
                setdata(newdata)
                toastr.success("Xoa thanh cong !!")
                }else{

                }
                
            })
        }
    })
    return /*html*/`
    <a href="/project/add"><button class="btn btn-success">NEW</button></a>
     <table class="table">
      <thead>
        <th>STT</th>
        <th>NAME</th>
        <th>IMG</th>
        <th>DESC</th>
        <th>PRICE</th>
        <th></th>

      </thead>
      <tbody>
      ${data.map((data, index) => `
      <tr>
          <td>${index+1}</td>
          <td>${data.name}</td>
          <td class="img" ><img src="${data.img}"></td>
          <td>${data.desc}</td>
          <td>${data.price}</td>
          <td><button class="btn btn-primary" data-id="${data.id}">Xoa</button>|| <a href="/project/${data.id}/edit"><button class="btn btn-success">Sua</button></a></td>
        </tr>
      
      
      `).join('')}
        
      </tbody>

    </table>
  
  `
}

export default project