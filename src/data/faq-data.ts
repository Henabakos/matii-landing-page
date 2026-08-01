export interface faqItems {
  id: string;
  question: string;
  answer: string;
}

export const faqItems: faqItems[] = [
  {
    id: "item-1",
    question: "Have an idea but don't know where to start?",
    answer:
      "That’s exactly where we come in. We help shape your idea, understand the problem, define the right solution, and turn it into a clear digital product.",
  },
  {
    id: "item-2",
    question: "What kind of projects do you work on?",
    answer:
      "We specialize in full-stack web applications, SaaS platforms, custom AI automation agents, and mobile applications for iOS & Android.",
  },
  {
    id: "item-3",
    question: "How do you start a project?",
    answer:
      "We begin with a discovery phase to align on goals, technical scope, and design strategy. From there, we work in rapid sprints with full transparency.",
  },
  {
    id: "item-4",
    question: "How long does a typical project take?",
    answer:
      "Initial MVPs and core web platforms typically take 4 to 8 weeks, depending on complexity and feature scope.",
  },
  {
    id: "item-5",
    question: "Do you provide post-launch support and scaling?",
    answer:
      "Yes, we offer continuous maintenance, cloud infrastructure monitoring, feature expansion, and performance scaling.",
  },
  {
    id: "item-6",
    question: "Can you integrate AI capabilities into existing platforms?",
    answer:
      "Absolutely. We build custom AI workflows, intelligent agents, and predictive integrations seamlessly into existing backend architectures.",
  },
];
