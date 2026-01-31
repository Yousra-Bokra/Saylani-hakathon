import supabase from "./config.js";


document.getElementById("logout").addEventListener("click", async ()=>{
  await supabase.auth.signOut();
  location.href = "./login.html";
});
