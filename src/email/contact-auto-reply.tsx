"use server";
import {
  Html,
  Head,
  Preview,
  Body,
  Container,
  Heading,
  Text,
  Hr,
  Link,
  Button,
} from "@react-email/components";

import { z } from "zod";
import { Resend } from "resend";
// import db from "@/db/db";
import { ACCENT_COLOR } from "@/lib/constants";
import db from "@/db/db";

const emailFormSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  message: z.string().min(1),
});

export default async function ContactAutoReply({ name }: { name: string }) {
  //TODO: colors need to be updated to match the rest of the site
  return (
    <Html>
      <Head />
      <Preview>
        Thanks for reaching out to jamAI — we&apos;ll get back to you soon
      </Preview>
      <Body
        style={{
          backgroundColor: "#f9fafb",
          padding: "40px 0",
          fontFamily: "sans-serif",
        }}
      >
        <Container
          style={{
            backgroundColor: "#ffffff",
            padding: "32px",
            borderRadius: "8px",
            maxWidth: "600px",
            margin: "0 auto",
          }}
        >
          <Heading
            style={{
              textAlign: "center",
              fontSize: "24px",
              marginBottom: "12px",
            }}
          >
            Hi {name}, We&apos;ve received your message 📨
          </Heading>
          <Text style={{ fontSize: "16px", lineHeight: "1.6" }}>
            Thanks for contacting jamAI! We&apos;ve received your message and
            will get back to you as soon as we can — usually within 48 hours.
          </Text>
          <Text style={{ fontSize: "16px", lineHeight: "1.6" }}>
            While you wait, feel free to explore the writing space or check out
            our latest updates.
          </Text>
          <div style={{ textAlign: "center", margin: "24px 0" }}>
            <Button
              href="https://write.jamai.dev/"
              style={{
                backgroundColor: ACCENT_COLOR,
                color: "#ffffff",
                fontSize: "16px",
                padding: "12px 24px",
                borderRadius: "6px",
                textDecoration: "none",
              }}
            >
              Start Writing Now →
            </Button>
          </div>
          <Hr />
          <Text style={{ fontSize: "12px", color: "#888" }}>
            If you didn&apos;t submit a message, you can ignore this email or
            contact us at{" "}
            <Link href="mailto:contact@jamai.dev">contact@jamai.dev</Link>.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

export async function sendContactEmail(_: unknown, data: FormData) {
  const result = emailFormSchema.safeParse(Object.fromEntries(data.entries()));
  if (!result.success) return result.error.formErrors.fieldErrors;
  const { name, email, message } = result.data;
  await db.message.create({ data: { name, email, message } });

  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    await resend.emails.send({
      from: process.env.JAMAI_EMAIL as string,
      to: email,
      subject:
        "Thanks for reaching out to jamAI — we'll get back to you shortly",
      react: <ContactAutoReply name={name} />,
      text: "Thanks for reaching out to jamAI — we'll get back to you shortly",
    });
  } catch {
    return { error: "Failed to send email" };
  }

  return { error: undefined };
}
