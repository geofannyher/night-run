import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQSection = () => {
  const faqs = [
    {
      question: "What is included in the registration fee?",
      answer: "Your registration fee includes an exclusive event jersey, race number, water station support, and participation certificate. You'll also receive a finisher medal upon completion."
    },
    {
      question: "Can I change my race category after registration?",
      answer: "Yes, you can change your race category (5K to 10K or vice versa) until June 25, 2025. Please contact our support team to make the change."
    },
    {
      question: "What happens if it rains on the event day?",
      answer: "The event will proceed rain or shine. In case of severe weather conditions that pose safety risks, we may delay the start time. Updates will be communicated via WhatsApp and our official channels."
    },
    {
      question: "Is there an age limit for participants?",
      answer: "Participants must be at least 16 years old for the 5K category and 18 years old for the 10K category. Minors require parental consent and must be accompanied by a guardian."
    },
    {
      question: "When and where can I collect my race pack?",
      answer: "Race pack collection will be available on July 1-2, 2025, from 10:00 AM to 8:00 PM at Jember Town Square. Please bring your ID and registration confirmation."
    },
    {
      question: "Are there medical facilities available during the event?",
      answer: "Yes, we have medical personnel and first aid stations positioned along the route and at the finish line to ensure participant safety throughout the event."
    }
  ];

  return (
    <section className="py-16">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-4xl lg:text-5xl font-black italic text-center mb-12">
          FREQUENTLY ASKED <span className="text-vibrant-blue">QUESTIONS</span>
        </h2>
        
        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="border border-border rounded-2xl px-6">
              <AccordionTrigger className="text-left font-bold text-lg hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pt-2 pb-4">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQSection;