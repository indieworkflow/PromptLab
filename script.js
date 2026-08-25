// -----------------------------
// PRO STATE
// -----------------------------
let isPro = localStorage.getItem("pro") === "true";

function refreshProState() {
  isPro = localStorage.getItem("pro") === "true";

  updateModeAccess();
  updateTemplateAccess();
  renderPlanBanner();
  updateTemplateLabels();
}

// -----------------------------
// PLAN BANNER
// -----------------------------
function renderPlanBanner() {

  const banner = document.getElementById("planBanner");

  if (!banner) return;

  if (isPro) {

    banner.innerHTML = `
      <div class="plan-banner pro-active">

        <div>
          <div class="plan-title">🟢 PRO Active</div>
          <div class="plan-text">
            You are currently using the full version of PromptLab.
          </div>
        </div>

      </div>
    `;

  } else {

    banner.innerHTML = `
      <div class="plan-banner">

        <div>
          <div class="plan-title">Free Plan</div>
          <div class="plan-text">
            You are currently using the free version of PromptLab.
          </div>
        </div>

        <button class="upgrade-btn" onclick="scrollToPricing()">
          Upgrade to PRO
        </button>

      </div>
    `;

  }
}

function scrollToPricing() {

  const pricing = document.getElementById("pricing");

  if (!pricing) return;

  pricing.scrollIntoView({
    behavior: "smooth"
  });

}

function resetGenerator() {

  // -----------------
  // INPUT RESET
  // -----------------
  document.getElementById("idea").value = "";

  document.getElementById("role").value = "Marketing Expert";
  document.getElementById("tone").value = "Professional";
  document.getElementById("style").value = "Bullet Points";
  document.getElementById("complexity").value = "Simple";

  // -----------------
  // MODE RESET
  // -----------------
  document.getElementById("mode").value = "General";

  // -----------------
  // TEMPLATE RESET
  // -----------------
  const template = document.getElementById("template");
  if (template) {
    template.value = "";
  }

  // -----------------
  // OUTPUT RESET
  // -----------------
  document.getElementById("result").innerText =
    "Your prompt will appear here...";

  // -----------------
  // PRO-AWARE UI RESET
  // (ovo je bitno da se sve vrati kako treba)
  // -----------------
  if (typeof isPro !== "undefined" && isPro) {

    // PRO state - ponovo aktiviraj PRO UI
    updateModeAccess();
    updateTemplateAccess();
    updateTemplateLabels();

  } else {

    // FREE state - zaključa PRO feature
    updateModeAccess();
    updateTemplateAccess();
    updateTemplateLabels();
  }

  // -----------------
  // optional: scroll nazad na generator
  // -----------------
  const generator = document.getElementById("generator");
  if (generator) {
    generator.scrollIntoView({ behavior: "smooth" });
  }
}

// -----------------------------
// MODE ACCESS CONTROL
// -----------------------------
function updateModeAccess() {
  const modeSelect = document.getElementById("mode");

  if (!modeSelect) return;

  const options = modeSelect.options;

  if (!isPro) {

    for (let i = 0; i < options.length; i++) {

      if (options[i].value !== "General") {

        options[i].disabled = true;

        if (!options[i].text.includes("🔒")) {
          options[i].text = "🔒 " + options[i].value;
        }

      }

    }

    modeSelect.value = "General";

  } else {

    for (let i = 0; i < options.length; i++) {

      options[i].disabled = false;
      options[i].text = options[i].value;

    }
  }
}

// -----------------------------
// TEMPLATE ACCESS CONTROL
// -----------------------------
function updateTemplateAccess() {

  const template = document.getElementById("template");

  if (!template) return;

  const options = template.options;

  if (!isPro) {

    for (let i = 1; i < options.length; i++) {
      options[i].disabled = true;
    }

    template.value = "";

  } else {

    for (let i = 1; i < options.length; i++) {
      options[i].disabled = false;
    }

  }
}

function updateTemplateLabels() {

  const template = document.getElementById("template");

  if (!template) return;

  const options = template.options;

  for (let i = 1; i < options.length; i++) {

    const cleanText = options[i].text.replace("🔒 ", "");

    if (isPro) {
      options[i].text = cleanText;
    } else {
      options[i].text = "🔒 " + cleanText;
    }

  }

}

// -----------------------------
// TEMPLATE SYSTEM
// -----------------------------
function applyTemplate() {

  const templateSelect = document.getElementById("template");

  if (!isPro) {
    templateSelect.value = "";
    return;
  }

  const template = templateSelect.value;
  const ideaField = document.getElementById("idea");

  if (template === "tiktok") {

    ideaField.value = "Create a viral TikTok for a fitness app";
    document.getElementById("mode").value = "Content";
    document.getElementById("role").value = "Copywriter";
    document.getElementById("tone").value = "Aggressive";
    document.getElementById("style").value = "Step-by-step Plan";
    document.getElementById("complexity").value = "Advanced";
  }

  else if (template === "landing") {

    ideaField.value = "Write a high-converting landing page for a SaaS product";
    document.getElementById("mode").value = "Marketing";
    document.getElementById("role").value = "Copywriter";
    document.getElementById("tone").value = "Professional";
    document.getElementById("style").value = "Bullet Points";
    document.getElementById("complexity").value = "Advanced";
  }

  else if (template === "growth") {

    ideaField.value = "Create a business growth strategy for a startup";
    document.getElementById("mode").value = "Business";
    document.getElementById("role").value = "Business Strategist";
    document.getElementById("tone").value = "Direct";
    document.getElementById("style").value = "Step-by-step Plan";
    document.getElementById("complexity").value = "Advanced";
  }

  else if (template === "youtube") {

    ideaField.value = "Write a viral YouTube video script";
    document.getElementById("mode").value = "Content";
    document.getElementById("role").value = "Copywriter";
    document.getElementById("tone").value = "Friendly";
    document.getElementById("style").value = "Step-by-step Plan";
    document.getElementById("complexity").value = "Medium";
  }

  else if (template === "instagram") {

    ideaField.value = "Create a high-converting Instagram ad";
    document.getElementById("mode").value = "Marketing";
    document.getElementById("role").value = "Marketing Expert";
    document.getElementById("tone").value = "Luxury";
    document.getElementById("style").value = "Bullet Points";
    document.getElementById("complexity").value = "Medium";
  }

  else if (template === "product") {

    ideaField.value = "Write a high-converting product description for a smartwatch";
    document.getElementById("mode").value = "Marketing";
    document.getElementById("role").value = "Marketing Expert";
    document.getElementById("tone").value = "Professional";
    document.getElementById("style").value = "Bullet Points";
    document.getElementById("complexity").value = "Advanced";
  }

  else if (template === "email") {

    ideaField.value = "Create a 3-email marketing campaign for an online course";
    document.getElementById("mode").value = "Marketing";
    document.getElementById("role").value = "Copywriter";
    document.getElementById("tone").value = "Friendly";
    document.getElementById("style").value = "Step-by-step Plan";
    document.getElementById("complexity").value = "Advanced";
  }

  else if (template === "thread") {

    ideaField.value = "Create a viral Twitter/X thread about productivity";
    document.getElementById("mode").value = "Content";
    document.getElementById("role").value = "Copywriter";
    document.getElementById("tone").value = "Direct";
    document.getElementById("style").value = "Step-by-step Plan";
    document.getElementById("complexity").value = "Advanced";
  }

  else if (template === "blog") {

    ideaField.value = "Create SEO blog outline for keyword: passive income";
    document.getElementById("mode").value = "Content";
    document.getElementById("role").value = "Content Writer";
    document.getElementById("tone").value = "Professional";
    document.getElementById("style").value = "Bullet Points";
    document.getElementById("complexity").value = "Medium";
  }

  else if (template === "cold") {

    ideaField.value = "Write a cold outreach message for SaaS founders";
    document.getElementById("mode").value = "Marketing";
    document.getElementById("role").value = "Copywriter";
    document.getElementById("tone").value = "Direct";
    document.getElementById("style").value = "Bullet Points";
    document.getElementById("complexity").value = "Simple";
  }

  else if (template === "adcopy") {

    ideaField.value = "Create 3 ad copy variations for a fitness app";
    document.getElementById("mode").value = "Marketing";
    document.getElementById("role").value = "Marketing Expert";
    document.getElementById("tone").value = "Aggressive";
    document.getElementById("style").value = "Bullet Points";
    document.getElementById("complexity").value = "Advanced";
  }

  else if (template === "pitch") {

    ideaField.value = "Generate a startup pitch for an AI productivity app";
    document.getElementById("mode").value = "Business";
    document.getElementById("role").value = "Business Strategist";
    document.getElementById("tone").value = "Professional";
    document.getElementById("style").value = "Step-by-step Plan";
    document.getElementById("complexity").value = "Advanced";
  }

  else if (template === "app") {

    ideaField.value = "Generate a mobile app idea for fitness niche";
    document.getElementById("mode").value = "Business";
    document.getElementById("role").value = "Startup Founder";
    document.getElementById("tone").value = "Creative";
    document.getElementById("style").value = "Step-by-step Plan";
    document.getElementById("complexity").value = "Medium";
  }

  else if (template === "resume") {

    ideaField.value = "Turn marketing job into strong resume bullet points";
    document.getElementById("mode").value = "Content";
    document.getElementById("role").value = "Copywriter";
    document.getElementById("tone").value = "Professional";
    document.getElementById("style").value = "Bullet Points";
    document.getElementById("complexity").value = "Simple";
  }

  else if (template === "value") {

    ideaField.value = "Create strong value proposition for SaaS AI tool";
    document.getElementById("mode").value = "Marketing";
    document.getElementById("role").value = "Marketing Expert";
    document.getElementById("tone").value = "Luxury";
    document.getElementById("style").value = "Bullet Points";
    document.getElementById("complexity").value = "Advanced";
  }

  else if (template === "hook") {

    ideaField.value = "Generate 10 viral hooks for productivity app";
    document.getElementById("mode").value = "Content";
    document.getElementById("role").value = "Copywriter";
    document.getElementById("tone").value = "Aggressive";
    document.getElementById("style").value = "Bullet Points";
    document.getElementById("complexity").value = "Advanced";
  }

  else if (template === "case") {

    ideaField.value = "Write a case study for a successful SaaS product";
    document.getElementById("mode").value = "Business";
    document.getElementById("role").value = "Business Strategist";
    document.getElementById("tone").value = "Professional";
    document.getElementById("style").value = "Step-by-step Plan";
    document.getElementById("complexity").value = "Advanced";
  }

  else if (template === "scriptlong") {

    ideaField.value = "Write a long-form YouTube video script about online business";
    document.getElementById("mode").value = "Content";
    document.getElementById("role").value = "Copywriter";
    document.getElementById("tone").value = "Friendly";
    document.getElementById("style").value = "Step-by-step Plan";
    document.getElementById("complexity").value = "Advanced";
  }

  else if (template === "ads3") {

    ideaField.value = "Create 3 ad variations for a SaaS product";
    document.getElementById("mode").value = "Marketing";
    document.getElementById("role").value = "Marketing Expert";
    document.getElementById("tone").value = "Aggressive";
    document.getElementById("style").value = "Bullet Points";
    document.getElementById("complexity").value = "Advanced";
  }

  else if (template === "strategy") {

    ideaField.value = "Create full marketing strategy for a new SaaS startup";
    document.getElementById("mode").value = "Business";
    document.getElementById("role").value = "Business Strategist";
    document.getElementById("tone").value = "Professional";
    document.getElementById("style").value = "Step-by-step Plan";
    document.getElementById("complexity").value = "Advanced";
  }

  updateModeAccess();
}

// -----------------------------
// INIT
// -----------------------------
document.addEventListener("DOMContentLoaded", () => {
  updateModeAccess();
  updateTemplateAccess();
  renderPlanBanner();
  updateTemplateLabels();
  updatePricingButton();
  updateFreeButton();
  checkSession();
});

// -----------------------------
// SCROLL
// -----------------------------
function scrollToGenerator() {
  const generator = document.getElementById("generator");
  generator.scrollIntoView({ behavior: "smooth" });
}

// -----------------------------
// FREE PROMPT
// -----------------------------
function buildFreePrompt(idea, role, tone, style, complexity) {
  return `
ROLE: ${role || "General Assistant"}

TASK: ${idea}

TONE: ${tone || "Neutral"}

OUTPUT STYLE: ${style || "Simple"}

COMPLEXITY: ${complexity || "Basic"}

OUTPUT:
- Simple structured response
`;
}

// -----------------------------
// PRO PROMPT
// -----------------------------
function buildProPrompt(idea, mode, role, tone, style, complexity) {

  let extra = "";

  if (mode === "Marketing") {
    extra = `
FOCUS:
- Target audience psychology
- Viral hooks
- Emotional triggers
- Conversion strategy
`;
  } else if (mode === "Business") {
    extra = `
FOCUS:
- Business model structure
- Market positioning
- Risk analysis
- Growth strategy
`;
  } else if (mode === "Content") {
    extra = `
FOCUS:
- Viral structure
- Engagement optimization
- Platform strategy
- Retention mechanics
`;
  } else {
    mode = "General";
  }

  return `
ROLE: ${role}

TASK: ${idea}

MODE: ${mode}

OUTPUT FORMAT:
1. HOOK
2. STRATEGY
3. SCRIPT
4. VARIATIONS
5. CTA

PSYCHOLOGY:
- Why it works
- Engagement triggers
- Viral mechanics

TONE: ${tone}
STYLE: ${style}
COMPLEXITY: ${complexity}

${extra}

INSTRUCTIONS:
- Be highly structured
- Avoid generic answers
- Focus on real-world use
`;
}

// -----------------------------
// MAIN GENERATOR
// -----------------------------
function generatePrompt() {
  let idea = document.getElementById("idea").value;
  let mode = document.getElementById("mode").value;
  const role = document.getElementById("role").value;
  const tone = document.getElementById("tone").value;
  const style = document.getElementById("style").value;
  const complexity = document.getElementById("complexity").value;

  if (!idea) {
    document.getElementById("result").innerText = "Please enter an idea first.";
    return;
  }

  let prompt;

  if (!isPro) {
    mode = "General"; // HARD LOCK FREE MODE
    prompt = buildFreePrompt(idea, role, tone, style, complexity);
  } else {
    prompt = buildProPrompt(idea, mode, role, tone, style, complexity);
  }

  document.getElementById("result").innerText = prompt;
}

// -----------------------------
// COPY
// -----------------------------
function copyPrompt() {
  const text = document.getElementById("result").innerText;
  const btn = event.target;

  navigator.clipboard.writeText(text).then(() => {

    const originalText = btn.innerText;

    btn.innerText = "Copied ✓";
    btn.style.background = "#22c55e";

    setTimeout(() => {
      btn.innerText = originalText;
      btn.style.background = "";
    }, 1500);

  });
}

function updateFreeButton() {

  const btn = document.getElementById("freeBtn");

  if (!btn) return;

  if (isPro) {

    btn.innerText = "✓ Using PRO";

    btn.classList.add("pro-active");

  } else {

    btn.innerText = "Use Free";

    btn.classList.remove("pro-active");

  }
}

// -----------------------------
// GUMROAD
// -----------------------------
function goToGumroad() {
  window.open("https://indieworkflow.gumroad.com/l/mepjrp", "_blank");
}

function updatePricingButton() {

  const btn = document.getElementById("pricingBtn");

  if (!btn) return;

  if (isPro) {

    btn.innerText = "✓ PRO Active";

    btn.disabled = true;

    btn.classList.add("pro-active");

  } else {

    btn.innerText = "Upgrade to PRO";

    btn.disabled = false;

    btn.classList.remove("pro-active");

  }
}

const supabaseUrl = "https://clrkbovahevprsxfxknc.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNscmtib3ZhaGV2cHJzeGZ4a25jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEyNzY0NzIsImV4cCI6MjA5Njg1MjQ3Mn0._I8hR3VlBnUjrqpdrKXfs3ibMCX7VB30APzV8RFqNPE";

const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey);

async function login(email) {
  const { data, error } = await supabaseClient.auth.signInWithOtp({
    email: email,
    options: {
      emailRedirectTo: "http://localhost:5500"
    }
  });

  if (error) {
    console.error(error);
    alert("Login error");
  } else {
    alert("Check your email for login link");
  }
}

function handleLogin() {
  const email = document.getElementById("email").value;
  login(email);
}

function updateLoginUI(loggedIn) {

    const loginBtn = document.getElementById("loginBtn");
    const logoutBtn = document.getElementById("logoutBtn");

    if(loggedIn){

        loginBtn.innerText="Logged In";
        loginBtn.classList.add("logged");
        loginBtn.disabled=true;

        logoutBtn.style.display="block";

    }else{

        loginBtn.innerText="Login";
        loginBtn.classList.remove("logged");
        loginBtn.disabled=false;

        logoutBtn.style.display="none";

    }

}

async function logout(){

    await supabaseClient.auth.signOut();

    updateLoginUI(false);

    isPro=false;

    updatePlanBanner();

}

async function checkSession() {

  const { data, error } = await supabaseClient.auth.getSession();


  if (error) {

    console.error(error);
    return;

  }


  console.log("SESSION:", data.session);


  if (data.session) {


    const email = data.session.user.email;


    console.log("Logged in as:", email);


    updateLoginUI(true);



    // CHECK PRO FROM DATABASE

    const userIsPro = await checkProStatus(email);


    isPro = userIsPro;


    refreshProState();



    console.log("PRO STATUS:", isPro);



  } else {


    console.log("Not logged in");


    isPro = false;


    refreshProState();


    updateLoginUI(false);


  }

}

async function checkProStatus(email) {

  const { data, error } = await supabaseClient
    .from("users")
    .select("pro")
    .eq("email", email)
    .maybeSingle();

  if (error) {
    console.error(error);
    return false;
  }

  if (!data) {
    return false;
  }

  return data.pro === true;
}