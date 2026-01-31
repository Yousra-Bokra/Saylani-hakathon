import supabase from "./config.js";



// Form Elements
const submit = document.getElementById("resume-submit");
const title = document.getElementById("title");
const skills = document.getElementById("skills");
const education = document.getElementById("education");
const experience = document.getElementById("experience");
const projects = document.getElementById("projects");

// Form Submit Event
submit.addEventListener("submit", async (e) => {
  e.preventDefault();

  //  Validation
  if (!title.value || !skills.value) {
    Swal.fire({
      title: "Oops!",
      text: "Title & Skills are required!",
      icon: "warning",
      confirmButtonText: "OK"
    });
    return;
  }

  try {
    //  Get Logged-in User
    const { data: userData, error: userError } = await supabase.auth.getUser();
    if (userError) throw userError;

    //  Insert into Supabase Table `resumes`
    const { data, error } = await supabase.from("Resumes").insert([
      {
        title: title.value,
        skills: skills.value,
        education: education.value,
        experience: experience.value,
        projects: projects.value,
        user_id: userData.user.id
      }
    ]);

    if (error) throw error;

    // SweetAlert Success + Auto Redirect
    Swal.fire({
      title: "Success!",
      text: "Resume added successfully!",
      icon: "success",
      timer: 2000,
      showConfirmButton: false
    }).then(() => {
      window.location.href = "./dashboard.html";
    });

  } catch (err) {
    //  SweetAlert Error
    Swal.fire({
      title: "Error!",
      text: err.message,
      icon: "error",
      confirmButtonText: "OK"
    });
    console.error("Supabase Insert Error:", err);
  }
});
