import ContactForm from "@/components/contact";
import Head from "next/dist/shared/lib/head";

export default function ContactPage() {
  return (
    <main>
      <Head>
        <title>Contact Me</title>
        <meta name="description" content="Get in touch with me through this contact form." />
      </Head>
      <ContactForm />
    </main>
  );
}
