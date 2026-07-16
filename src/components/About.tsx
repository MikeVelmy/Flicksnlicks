import Image from "next/image";
import SocialLinks from "@/components/SocialLinks";

const reasons = [
  {
    title: "Quality Ingredients",
    description:
      "We take pride in using only the freshest ingredients to craft every dish, ensuring that every bite is full of flavor.",
  },
  {
    title: "Vibrant Atmosphere",
    description:
      "Our restaurants are designed to be lively, fun, and welcoming, whether you're here for a quick bite or a full meal with friends, you'll feel right at home.",
  },
  {
    title: "Convenience",
    description:
      "With our easy to navigate website and app, ordering your favorite meals has never been easier. Plus, we offer delivery services, so you can enjoy Flicks & Licks from the comfort of your home.",
  },
];


export default function About() {
  return (
    <section
      id="about"
      className="bg-charcoal-light py-14 sm:py-20 scroll-mt-16"
      aria-labelledby="about-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-start">
          <div className="lg:sticky lg:top-24">
            <div className="relative aspect-[4/5] w-full max-w-sm overflow-hidden rounded-2xl border border-white/10 sm:max-w-md lg:max-w-none">
              <Image
                src="/images/brand-signage-closeup.webp"
                alt="Flicks & Licks red and black signage"
                fill
                sizes="(min-width: 1024px) 480px, 90vw"
                className="object-cover"
                loading="lazy"
              />
            </div>
          </div>

          <div>
            <span className="font-display text-xs font-bold uppercase tracking-widest text-red-bright">
              About us
            </span>
            <h2
              id="about-heading"
              className="mt-2 font-display text-3xl font-bold text-cream sm:text-4xl"
            >
              Where every bite is a celebration
            </h2>

            <p className="mt-5 font-body text-cream-dim leading-relaxed">
              Welcome to Flicks &amp; Licks, where every bite is a
              celebration, and every visit is an experience. We&rsquo;re not
              just another fast food restaurant; we&rsquo;re your favorite
              destination for mouth watering meals and a vibrant atmosphere,
              all served with a side of entertainment.
            </p>
            <p className="mt-4 font-body text-cream-dim leading-relaxed">
              Founded on the belief that food should be both fun and
              flavorful, Flicks &amp; Licks combines two things we love
              most: delicious food and entertainment. Whether you&rsquo;re
              here to grab a quick bite or enjoy a leisurely meal with
              friends and family, we offer a unique experience that&rsquo;s
              sure to satisfy your cravings.
            </p>

            <h3 className="mt-8 font-display text-xl font-bold text-cream">
              Our Story
            </h3>
            <p className="mt-3 font-body text-cream-dim leading-relaxed">
              At Flicks &amp; Licks, we believe in bringing people together
              through good food and great vibes. Our journey started with a
              simple goal: to create a space where guests could enjoy the
              best of both worlds, a fun, energetic ambiance and
              irresistible dishes that keep you coming back for more.
              We&rsquo;ve since become a favorite hangout for food lovers,
              movie buffs, and anyone who just wants to unwind with
              delicious comfort food.
            </p>

            <h3 className="mt-8 font-display text-xl font-bold text-cream">
              Why Choose Flicks &amp; Licks?
            </h3>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {reasons.map((reason) => (
                <div
                  key={reason.title}
                  className="rounded-2xl border border-white/10 bg-ink p-4"
                >
                  <h4 className="font-display text-sm font-bold text-cream">
                    {reason.title}
                  </h4>
                  <p className="mt-1.5 font-body text-xs leading-relaxed text-cream-dim">
                    {reason.description}
                  </p>
                </div>
              ))}
            </div>

            <p className="mt-8 font-body text-cream-dim leading-relaxed">
              At Flicks &amp; Licks, we&rsquo;re not just serving food;
              we&rsquo;re serving memories. We can&rsquo;t wait to welcome
              you to our restaurant. Come for the food, stay for the fun!
            </p>

            <div className="mt-8 rounded-2xl border border-red/30 bg-red/10 p-5 sm:p-6">
              <h3 className="font-display text-lg font-bold text-cream">
                Join the Flicks Community!
              </h3>
              <p className="mt-2 font-body text-sm leading-relaxed text-cream-dim">
                Don&rsquo;t be left out of our growing community! Follow
                us on social media for the latest updates, exclusive offers,
                and exciting events.
              </p>
              <SocialLinks className="mt-4 flex flex-wrap gap-3" />
              <p className="mt-4 font-display text-sm font-bold text-red-bright">
                Flicks &amp; Licks, where great food meets great
                entertainment!
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
