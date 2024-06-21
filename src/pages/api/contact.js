export const POST = async ({ request }) => {
  const data = await request.formData();
  const name = data.get("name");
  const email = data.get("email");
  const phoneNumber = data.get("phoneNumber");
  const message = data.get("message");

  const fields = {
    name: "Nombres",
    email: "Email",
    phoneNumber: "Teléfono",
  };

  if (!name || !email || !phoneNumber) {
    return new Response(
      JSON.stringify({
        ok: false,
        message: `Faltan los siguientes campos: ${fields["name"]},${fields["email"]}, ${fields["phoneNumber"]}`,
      }),
      { status: 400 },
    );
  }

  const mapContact = {
    contact: {
      fullName: name,
      email,
      phone: {
        countryCode: "+51",
        number: phoneNumber,
      },
      message,
      hostname: "eces.pe",
    },
  };

  await fetch("https://api-servitecsales.web.app/emails/contact", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(mapContact),
  });

  return new Response(
    JSON.stringify({
      ok: true,
      message: "¡Mensaje exito!",
    }),
    { status: 200 },
  );
};
