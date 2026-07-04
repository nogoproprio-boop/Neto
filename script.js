// ----- Footer year -----
document.getElementById("year").textContent = new Date().getFullYear();

// ----- Mobile nav toggle -----
const navToggle = document.getElementById("navToggle");
const navLinks = document.querySelector(".nav-links");

navToggle.addEventListener("click", () => {
  navLinks.classList.toggle("open");
});

navLinks.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => navLinks.classList.remove("open"));
});

// ----- Fake "ticket number" for the schedule form (visual detail) -----
const ticketNumberEl = document.getElementById("ticketNumber");
function generateTicketNumber() {
  const random = Math.floor(1000 + Math.random() * 9000);
  ticketNumberEl.textContent = `Nº ${random}`;
}
generateTicketNumber();

// ----- Phone number mask (Brazilian format) -----
const telefoneInput = document.getElementById("telefone");
telefoneInput.addEventListener("input", () => {
  let digits = telefoneInput.value.replace(/\D/g, "").slice(0, 11);
  let formatted = digits;
  if (digits.length > 2) {
    formatted = `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  }
  if (digits.length > 7) {
    formatted = `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
  }
  telefoneInput.value = formatted;
});

// ----- Form submission -----
const form = document.getElementById("scheduleForm");
const status = document.getElementById("formStatus");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const nome = document.getElementById("nome").value.trim();
  const telefone = telefoneInput.value.trim();
  const eletrodomestico = document.getElementById("eletrodomestico").value;
  const descricao = document.getElementById("descricao").value.trim();

  if (!nome || !telefone || !eletrodomestico || !descricao) {
    status.textContent = "Preencha todos os campos antes de enviar.";
    status.className = "form-status error";
    return;
  }

  const telefoneDigits = telefone.replace(/\D/g, "");
  if (telefoneDigits.length < 10) {
    status.textContent = "Digite um telefone válido com DDD.";
    status.className = "form-status error";
    return;
  }

  // Build a WhatsApp message so the request goes straight to the shop's phone.
  const mensagem =
    `Olá! Gostaria de agendar um atendimento.%0A` +
    `Nome: ${encodeURIComponent(nome)}%0A` +
    `Telefone: ${encodeURIComponent(telefone)}%0A` +
    `Eletrodoméstico: ${encodeURIComponent(eletrodomestico)}%0A` +
    `Problema: ${encodeURIComponent(descricao)}`;

  const whatsappUrl = `https://wa.me/5519997310253?text=${mensagem}`;

  status.textContent = "Agendamento pronto! Abrindo o WhatsApp para confirmar...";
  status.className = "form-status success";

  setTimeout(() => {
    window.open(whatsappUrl, "_blank");
    form.reset();
    generateTicketNumber();
  }, 700);
});
