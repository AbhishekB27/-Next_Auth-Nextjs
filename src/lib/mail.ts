import { Resend } from "resend";
export default async function sendMail({
  to,
  subject,
  body,
}: {
  to: string;
  subject: string;
  body: React.ReactNode;
}) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const { data, error } = await resend.emails.send({
    from: "Acme <onboarding@resend.dev>",
    to: ["akstyles27@gmail.com"],
    subject: subject,
    react: body,
  });
  if (error) {
    throw new Error("Error While Email Sent!");
  }
  return { success: true, data };
}
