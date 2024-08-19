form.addEventListener("submit",()=>
    {
        const login={
            name:name.value,
            email:email.value,
            password:password.value,
            repassword:repassword.value,


        }
        fetch("/api/regis",
            {
                method:"POST",
                body:JSON.stringify(login),
                headers:{
                    "Content-Type":"application/json"
                }
            }
        ).then(res=>res.json()).then(data=>
        {
            if(data.status==="error")
            {
                success.style.display="none"
                error.style.display="block"
                error.innertext=data.error;
             
            }
            else{
                error.style.display="none"
                success.style.display="block"
                success.innertext=data.success;
            }
        }
        )
    })