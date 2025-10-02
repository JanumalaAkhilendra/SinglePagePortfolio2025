import Image from "next/image";
import bg from "../../../../public/background/S3.avif";
import Form from "@/components/contact/Form";

export const metadata = {
  title: "Contact",
};

export default function Contact() {
  return (
    <>
      <Image
        src={bg}
        alt="Next.js Portfolio website's contact page background image"
        priority
        sizes="100vw"
        className="-z-50 fixed top-0 left-0 w-full h-full object-cover object-center opacity-100"
      />

      <article className="relative w-full flex flex-col items-center justify-center py-8 sm:py-0 space-y-8">
        <div className="flex flex-col items-center justify-center space-y-6 w-full sm:w-3/4">
          <h1 className="text-accent font-semibold text-center text-4xl capitalize">
            summon the Astronaut
          </h1>
          <p className="text-center font-light text-sm xs:text-base">
          Embark on a cosmic journey and leave your mark on the digital universe. Whether you are seeking celestial collaborations, exploring the depths of knowledge, or sharing interstellar tales, your messages are like stardust, scattered across the cosmos. Use the form below to send your cosmic community and await the echo of the universe.
          </p>
        </div>
        <Form />
      </article>
    </>
  );
}
