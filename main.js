// ═══════════════════════════════════════════════════════════════
//  RYB Engenharia — main.js
// ═══════════════════════════════════════════════════════════════

// ⚠️  CONFIGURAÇÃO DO FORMSPREE
// 1. Crie conta grátis em https://formspree.io
// 2. Clique em New Form → "Orçamento RYB" → Create Form
// 3. Copie o código (ex: xyzABCDE) e substitua abaixo
const FORMSPREE_URL = 'https://formspree.io/f/COLE_SEU_CODIGO_AQUI'

// ═══════════════════════════════════════════════════════════════
//  NAVEGAÇÃO
// ═══════════════════════════════════════════════════════════════
function show(id) {
  document.querySelectorAll('section').forEach(s => s.classList.remove('active'))
  document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'))
  document.getElementById(id).classList.add('active')
  const nl = document.getElementById('nl-' + id)
  if (nl) nl.classList.add('active')
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function toggleMenu() {
  const menu = document.getElementById('mobileMenu')
  menu.classList.toggle('open')
  document.querySelector('.nav-toggle').textContent =
    menu.classList.contains('open') ? '✕' : '☰'
}

// ═══════════════════════════════════════════════════════════════
//  FORMULÁRIO DE ORÇAMENTO
// ═══════════════════════════════════════════════════════════════
async function enviarOrcamento(e) {
  e.preventDefault()

  const nome = document.getElementById('f-nome').value.trim()
  const tel  = document.getElementById('f-tel').value.trim()

  if (!nome || !tel) {
    alert('Por favor, preencha nome e telefone.')
    return
  }

  const btn     = document.getElementById('f-btn')
  const success = document.getElementById('form-success')
  const error   = document.getElementById('form-error')

  btn.textContent = 'Enviando...'
  btn.disabled    = true
  success.style.display = 'none'
  error.style.display   = 'none'

  try {
    const res = await fetch(FORMSPREE_URL, {
      method:  'POST',
      headers: { 'Accept': 'application/json' },
      body:    new FormData(document.getElementById('orcamento-form'))
    })

    if (res.ok) {
      success.style.display = 'block'
      document.getElementById('orcamento-form').reset()
      setTimeout(() => { success.style.display = 'none' }, 6000)
    } else {
      error.style.display = 'block'
    }
  } catch {
    error.style.display = 'block'
  }

  btn.textContent = 'Enviar Solicitação →'
  btn.disabled    = false
}
