const form = document.getElementById("contact-form")

function showToast(message, type = "success") {
  const toast = document.getElementById("toast")
  toast.textContent = message
  toast.className = ""
  toast.classList.add("show", type)

  setTimeout(() => {
    toast.classList.remove("show")
  }, 4000)
}

form.addEventListener("submit", async function (e) {
  e.preventDefault()

  const nombre = document.getElementById("nombre").value
  const email = document.getElementById("email").value
  const mensaje = document.getElementById("mensaje").value

  try {
    const res = await fetch(
      "https://xbzxgdowskishzrphhxt.supabase.co/functions/v1/send-contact-email",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          nombre,
          email,
          mensaje
        })
      }
    )

    const data = await res.json()

    if (res.ok) {
      showToast("Mensaje enviado correctamente", "success")
      form.reset()
    } else {
      showToast(data.message || "Error al enviar mensaje", "error")
    }

  } catch (err) {
    console.error("ERROR FETCH:", err)
    showToast("Error de conexión con el servidor", "error")
  }
})

