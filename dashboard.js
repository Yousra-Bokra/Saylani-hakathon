




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






