import { Resend } from "resend";


import {
    Html,
    Head,
    Preview,
    Body,
    Container,
    Heading,
    Text,
    Button,
    Hr,
    Link,
} from "@react-email/components";
import { ACCENT_COLOR } from "@/lib/constants";

export default async function RegisterAutoReply() {
    return (
        <Html>
            <Head />
            <Preview>Welcome to jamAI — your new favorite writing space</Preview>
            <Body style={{ backgroundColor: "#f9fafb", padding: "40px 0", fontFamily: "sans-serif" }}>
                <Container
                    style={{
                        backgroundColor: "#ffffff",
                        padding: "32px",
                        borderRadius: "8px",
                        maxWidth: "600px",
                        margin: "0 auto",
                    }}
                >
                    <Heading style={{ textAlign: "center", fontSize: "24px", marginBottom: "12px" }}>
                        Welcome to jamAI 👋
                    </Heading>
                    <Text style={{ fontSize: "16px", lineHeight: "1.6" }}>
                        We&apos;re so excited you&apos;ve joined us! jamAI is your intelligent writing space.
                    </Text>
                    <Text style={{ fontSize: "16px", lineHeight: "1.6" }}>
                        Whether you&apos;re writing an essay, assignment, or personal piece, jamAI helps you reword, clarify, and improve your writing without losing your voice.
                    </Text>

                    <div style={{textAlign: "center", margin: "24px 0" }}>
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
                        If you didn’t sign up for jamAI, you can ignore this message or contact us at{" "}
                        <Link href="mailto:contact@jamai.dev">contact@jamai.dev</Link>.
                    </Text>
                </Container>
            </Body>
        </Html>
    );
}


export async function sendRegisterEmail(email: string) {
    const resend = new Resend(process.env.RESEND_API_KEY);
    try {
        await resend.emails.send({
            from: process.env.JAMAI_EMAIL || "",
            to: email,
            subject: "Welcome to jamAI — Let’s get writing ✍️",
            react: (
                <RegisterAutoReply />
            ),
            text: "Welcome to jamAI — Let’s get writing ✍️",
        })
    } catch {
        return { error: "Failed to send email" };
    }
}