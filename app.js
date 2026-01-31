import supabase from "./config.js";


let name = document.getElementById("name")
let email = document.getElementById("email")
let password = document.getElementById("password")
let phone = document.getElementById("phone")

let formsubmit = document.getElementById("form-submit");


async function signup(e) {
    e.preventDefault()
    try {
        if (!name.value || !email.value || !password.value || !phone.value) {

            Swal.fire({
                title: "All fields required!",
                text: "Please fill all fields before signup.",
                icon: "warning",
                background: "ffffff",
                color: "#000000",
                confirmButtonColor: "#000000",
                confirmButtonText: "OK",
                borderRadius: "15px",
                customClass: {
                    popup: "sweet-alert-class"
                }
            })
            return
        }



        const { data, error } = await supabase.auth.signUp(
            {
                email: email.value,
                password: password.value,
                options: {
                    data: {
                        name: name.value,
                        phone: phone.value,

                    }
                }
            }
        )



        if (error) {
            console.log(error);
        }

        if (data) {
            // console.log(data, "send to Table ");
            console.log(data);
            let userinfo = data.user.user_metadata
            console.log(userinfo);

            const { error } = await supabase
                .from('Users')
                .insert({
                    Name: userinfo.name,
                    Email: userinfo.email,
                    Phone: userinfo.phone
                });


            //   alert('signup succesfully')
            await Swal.fire({
                title: "Good job!",
                text: "Signup successful!",
                icon: "success",
                background: "ffffff",
                color: "#000000",
                confirmButtonColor: "#000000",
                confirmButtonText: "OK",
                borderRadius: "15px",
                customClass: {
                    popup: "sweet-alert-class"
                }
            });

        };

        location.href = "./login.html";

    } catch (err) {
        console.log(err);
    }
}




formsubmit && formsubmit.addEventListener("submit", signup);


//Login page //////////////////////////////////
let useremail = document.getElementById("email")
let userpassword = document.getElementById("password")

let loginsubmit = document.getElementById("login-submit")

async function login(e) {
    e.preventDefault()
    try {



        if (!useremail.value || !userpassword.value) {

            Swal.fire({
                title: "All fields required!",
                text: "Please fill all fields before login.",
                icon: "warning",
                background: "ffffff",
                color: "#000000",
                confirmButtonColor: "#000000",
                confirmButtonText: "OK",
                borderRadius: "15px",
                customClass: {
                    popup: "sweet-alert-class"
                }
            })
            return
        }

        const { data, error } = await supabase.auth.signInWithPassword(
            {
                email: useremail.value,
                password: userpassword.value,

            }
        )

        if (error) {
            console.log(error);
        }

        await Swal.fire({
            title: "Good job!",
            text: "Login successful!",
            icon: "success",
            background: "ffffff",
            color: "#000000",
            confirmButtonColor: "#000000",
            confirmButtonText: "OK",
            borderRadius: "15px",
            customClass: {
                popup: "sweet-alert-class"
            }
        });

        location.href = "./add.html";


    } catch (err) {
        console.log(err);
    }
}


loginsubmit && loginsubmit.addEventListener("submit", login)