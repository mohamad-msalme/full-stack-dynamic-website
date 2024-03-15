import "./index.css";
import { ChevronDown } from "lucide-react";

const data = [
  {
    q: "How does the billing work?",
    answer:
      "Springerdata offers a variety of billing options, including monthly and annual subscription plans, as well as pay-as-you-go pricing for certain services. Payment is typically made through a credit card or other secure online payment method.",
  },
  {
    q: "How does the billing work?",
    answer:
      "Springerdata offers a variety of billing options, including monthly and annual subscription plans, as well as pay-as-you-go pricing for certain services. Payment is typically made through a credit card or other secure online payment method.",
  },
  {
    q: "How does the billing work?",
    answer:
      "Springerdata offers a variety of billing options, including monthly and annual subscription plans, as well as pay-as-you-go pricing for certain services. Payment is typically made through a credit card or other secure online payment method.",
  },
  {
    q: "How does the billing work?",
    answer:
      "Springerdata offers a variety of billing options, including monthly and annual subscription plans, as well as pay-as-you-go pricing for certain services. Payment is typically made through a credit card or other secure online payment method.",
  },
  {
    q: "How does the billing work?",
    answer:
      "Springerdata offers a variety of billing options, including monthly and annual subscription plans, as well as pay-as-you-go pricing for certain services. Payment is typically made through a credit card or other secure online payment method.",
  },
];
export const FAQ: React.FC = () => {
  return (
    <div className="py-40 max-sm:py-32">
      <div className="card_faq">
        <div className="mx-auto px-5">
          <div className="flex flex-col items-center">
            <h2 className="mt-5 text-center text-3xl font-bold tracking-tight md:text-5xl">
              FAQ
            </h2>
            <p className="mt-3 text-lg text-neutral-500 md:text-xl">
              Frequenty asked questions
            </p>
          </div>
          <div className="mx-auto mt-8 grid max-w-xl divide-y divide-neutral-200">
            {data.map((faq) => (
              <div className="py-5">
                <details className="group">
                  <summary className="flex cursor-pointer list-none items-center justify-between font-medium">
                    <span> {faq.q}</span>
                    <span className="transition group-open:rotate-180">
                      <ChevronDown />
                    </span>
                  </summary>
                  <p className="group-open:animate-fadeIn mt-3 text-neutral-600">
                    {faq.answer}
                  </p>
                </details>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
