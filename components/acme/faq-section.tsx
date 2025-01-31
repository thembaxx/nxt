import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// FAQ data
const faqData = [
  {
    question: "What is Next.js?",
    answer:
      "Next.js is a React framework for building full-stack web applications. You use React Components to build user interfaces, and Next.js for additional features and optimizations.",
  },
  {
    question: "How do I get started with Next.js?",
    answer:
      "To get started with Next.js, you need to have Node.js installed on your machine. Then, you can create a new Next.js app using 'npx create-next-app@latest'. Follow the prompts, and you'll have a new Next.js project ready to go!",
  },
  {
    question: "What is server-side rendering?",
    answer:
      "Server-side rendering (SSR) is the process of rendering web pages on the server and sending the fully rendered page to the client. This can improve performance and SEO compared to client-side rendering.",
  },
  {
    question: "What are the key features of Next.js?",
    answer:
      "Some key features of Next.js include: server-side rendering, static site generation, API routes, built-in CSS support, code splitting, and fast refresh for a better developer experience.",
  },
  {
    question: "Is Next.js suitable for large-scale applications?",
    answer:
      "Yes, Next.js is well-suited for large-scale applications. It provides excellent performance optimizations, code splitting, and a scalable architecture that can handle complex, data-intensive applications.",
  },
];

export function FAQSection() {
  return (
    <section className="w-full max-w-3xl mx-auto p-6 bg-neutral-800 text-gray-100 rounded-2xl shadow-xl">
      <h2 className="text-3xl font-bold mb-6 text-center">
        Frequently Asked Questions
      </h2>
      <Accordion type="single" collapsible className="w-full">
        {faqData.map((faq, index) => (
          <AccordionItem
            key={index}
            value={`item-${index}`}
            className="last-of-type:border-none"
          >
            <AccordionTrigger className="text-left">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-gray-300">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
