import Banner from "@/components/Banner";
import Book from "@/components/Book";
import Testimonials from "@/components/Testimonials";
import Why from "@/components/Why";

export default function Home() {
  return (
    <main>
      <section>
        <Banner />
      </section>

      <section>
        <Why />
      </section>

      <section>
        <Testimonials />
      </section>
      <section>
        <Book />
      </section>
    </main>
  );
}
