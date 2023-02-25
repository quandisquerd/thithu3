
import axios from 'axios'
import { router, useEffect, useState } from '../lib'
import * as yup from 'yup'
import "toastr/build/toastr.min.css"
import toastr from 'toastr'

const edit = ({ id }) => {
    const [data, setdata] = useState([])
    useEffect(() => {
        fetch('http://localhost:3000/project/' + id)
            .then((response) => response.json())
            .then(data => setdata(data))
    }, [])
    useEffect(() => {
        const formvali = yup.object().shape({
            name: yup.string().required("ban phai nhap name"),
            desc: yup.string().required("ban phai nhap desc"),
            price: yup.number().moreThan(1,"Phai nhap so duong").required("ban phai nhap price"),

            img: yup.string().required("ban phai nhap img")
        })
        const form = document.querySelector('.form');
        const name = document.querySelector('#name');
        const desc = document.querySelector('#desc');
        const price = document.querySelector('#price');
        const image = document.querySelector('#img');
        form.addEventListener('submit', async (e) => {
            e.preventDefault()
            const urls = await uploadfile(image.files)

           
            try{
                const formdata= new FormData(form);
                const values= Object.fromEntries(formdata.entries())
                await formvali.validate(values,{abortEarly:false});
                const newdata = {
                    name: name.value,
                    desc: desc.value,
                    price: price.value,
                    img: urls

                }
                fetch('http://localhost:3000/project/' + id, {
                    method: 'PUT',
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(newdata)
                }).then(() => router.navigate("/project"))
                toastr.success("Edit thanh cong !!")
            }catch(error){
                if(error instanceof yup.ValidationError){
                    const errors = {};
                    error.inner.forEach(e =>{
                        errors[e.path]=e.errors[0]
                    })
                    err(errors)
                }
            }
        })
    })
    const err=(errors)=>{
        const span= document.getElementById("span")
        span.innerHTML='';
        Object.keys(errors).forEach((key)=>{
            const li = document.createElement("li");
            li.innerText=errors[key];
            li.style.color="red"
            span.appendChild(li)
        })
    }
    const uploadfile = async (files) => {
        const cloudname = "dw6wgytc3";
        const presetname = "demo_upload";
        const folder = "ECMA";
        const urls = [];
        const api = `https://api.cloudinary.com/v1_1/${cloudname}/image/upload`;

        const formdata = new FormData();
        formdata.append("upload_preset", presetname)
        formdata.append("folder", folder);
        for (const file of files) {
            formdata.append("file", file);
            const response = await axios.post(api, formdata, {
                headers: { "Content-Type": "multipart/form-data" }
            })
            urls.push(response.data.secure_url)
        }
        return urls
    }
    return `
  
  
  <form class="form">
    <label for="">NAME</label><br>
    <input type="text" id="name" value="${data.name}" name="name" class="form-control"><br>
    <label for="">DESC</label><br>
    <input type="text" id="desc" value="${data.desc}" name="desc" class="form-control"><br>
    <label for="">PRICE</label><br>
    <input type="text" id="price" value="${data.price}" name="price" class="form-control"><br>
    <label for="">IMAGE</label><br>
    <input type="file" id="img" value="" name="img" class="form-control"><br>
    <span id="span"></span>
    <button type="submit" class="btn btn-success">SUBMIT</button>

  </form>`
}

export default edit