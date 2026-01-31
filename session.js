import supabase from "./config.js";

const { data } = await supabase.auth.getUser();
if(!data.user) location.href = "./login.html";
