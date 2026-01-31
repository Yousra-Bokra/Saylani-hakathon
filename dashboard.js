




import supabase from "./config.js";

// DOM Elements
const list = document.getElementById("list");
const logoutBtn = document.getElementById("logout");

// 1️⃣ Get Logged-in User
async function getUser() {
  const { data: userData, error } = await supabase.auth.getUser();
  if (error || !userData.user) {
    // اگر یوزر لاگ ان نہیں ہے تو add.html یا login پر redirect کریں
    window.location.href = "./index.html";
    return null;
  }
  return userData.user;
}

// 2️⃣ Fetch all resumes of logged-in user
async function fetchResumes() {
  const user = await getUser();
  if (!user) return;

  const { data, error } = await supabase
    .from("Resumes")
    .select("*")
    .eq("user_id", user.id)
    .order("id", { ascending: false }); // تازہ ترین پہلے دکھائیں

  if (error) {
    console.error("Error fetching resumes:", error);
    list.innerHTML = "<p>Resume fetch کرنے میں مسئلہ ہوا!</p>";
    return;
  }

  if (!data || data.length === 0) {
    list.innerHTML = "<p>کوئی ریزیومے نہیں ملا۔ نیا ریزیومے add کریں۔</p>";
    return;
  }

  // 3️⃣ Display each resume
  list.innerHTML = ""; // پہلے clear کریں
  data.forEach((resume) => {
    const card = document.createElement("div");
    card.classList.add("card-item");
    card.innerHTML = `
      <h3>${resume.title}</h3>
      <p><strong>Skills:</strong> ${resume.skills}</p>
      <p><strong>Education:</strong> ${resume.education}</p>
      <p><strong>Experience:</strong> ${resume.experience}</p>
      <p><strong>Projects:</strong> ${resume.projects}</p>
    `;
    list.appendChild(card);
  });
}

// 4️⃣ Logout Functionality
logoutBtn.addEventListener("click", async () => {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error("Logout error:", error);
  } else {
    window.location.href = "./index.html"; // login page
  }
});

// 5️⃣ Initialize
fetchResumes();






// import supabase from "./config.js";

// // DOM Elements
// const list = document.getElementById("list");
// const logoutBtn = document.getElementById("logout");

// // Global variable for editing
// let editId = null;

// // 1️⃣ Get Logged-in User
// async function getUser() {
//   const { data: userData, error } = await supabase.auth.getUser();
//   if (error || !userData.user) {
//     window.location.href = "./index.html"; // redirect to login if not logged in
//     return null;
//   }
//   return userData.user;
// }

// // 2️⃣ Fetch resumes
// async function fetchResumes() {
//   const user = await getUser();
//   if (!user) return;

//   const { data, error } = await supabase
//     .from("Resumes")
//     .select("*")
//     .eq("user_id", user.id)
//     .order("id", { ascending: false });

//   if (error) {
//     console.error("Error fetching resumes:", error);
//     list.innerHTML = "<p>Resume fetch کرنے میں مسئلہ ہوا!</p>";
//     return;
//   }

//   if (!data || data.length === 0) {
//     list.innerHTML = "<p>کوئی ریزیومے نہیں ملا۔ نیا ریزیومے add کریں۔</p>";
//     return;
//   }

//   list.innerHTML = ""; // clear previous
//   data.forEach((resume) => {
//     const card = document.createElement("div");
//     card.classList.add("card-item");
//     card.innerHTML = `
//       <div class="card-header">
//         <h3>${resume.title}</h3>
//         <div class="action-icons">
//           <span class="edit" data-id="${resume.id}" title="Edit">&#9998;</span>
//           <span class="delete" data-id="${resume.id}" title="Delete">&#10060;</span>
//         </div>
//       </div>
//       <p><strong>Skills:</strong> ${resume.skills}</p>
//       <p><strong>Education:</strong> ${resume.education}</p>
//       <p><strong>Experience:</strong> ${resume.experience}</p>
//       <p><strong>Projects:</strong> ${resume.projects}</p>
//     `;
//     list.appendChild(card);
//   });

//   // Add event listeners for delete and edit
//   document.querySelectorAll(".delete").forEach(btn => {
//     btn.addEventListener("click", deleteResume);
//   });
//   document.querySelectorAll(".edit").forEach(btn => {
//     btn.addEventListener("click", editResume);
//   });
// }

// // 3️⃣ Delete resume
// async function deleteResume(e) {
//   const id = e.target.dataset.id;

//   const confirm = await Swal.fire({
//     title: 'کیا آپ واقعی یہ ریزیومے حذف کرنا چاہتے ہیں؟',
//     icon: 'warning',
//     showCancelButton: true,
//     confirmButtonText: 'ہاں',
//     cancelButtonText: 'نہیں'
//   });

//   if (confirm.isConfirmed) {
//     const { error } = await supabase.from("Resumes").delete().eq("id", id);
//     if (error) {
//       Swal.fire('Error!', error.message, 'error');
//     } else {
//       Swal.fire('Deleted!', 'ریزیومے حذف ہوگیا۔', 'success');
//       fetchResumes(); // refresh list
//     }
//   }
// }

// // 4️⃣ Edit resume
// async function editResume(e) {
//   const id = e.target.dataset.id;
//   editId = id;

//   const { data, error } = await supabase.from("Resumes").select("*").eq("id", id).single();
//   if (error) {
//     Swal.fire('Error!', error.message, 'error');
//     return;
//   }

//   // Redirect to add.html with query param for edit
//   window.location.href = `add.html?editId=${id}`;
// }

// // 5️⃣ Logout
// logoutBtn.addEventListener("click", async () => {
//   const { error } = await supabase.auth.signOut();
//   if (!error) window.location.href = "./index.html";
// });

// // Initialize
// fetchResumes();


