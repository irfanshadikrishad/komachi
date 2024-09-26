import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import styles from "@/styles/footer.module.css";
import Link from "next/link";

export default function TC() {
  return (
    <>
      <Navbar />
      <section className="container">
        <h3 className={styles.tandc_h3}>Terms & Conditions of use</h3>
        <h3 className={styles.tandc_h3}>1. Terms </h3>
        <p className={styles.tandc_p}>
          By accessing this Website, accessible from{" "}
          <Link href="https://Komachi-v2.vercel.app">Komachi</Link>, you are
          agreeing to be bound by these Website Terms and Conditions of Use and
          agree that you are responsible for the agreement with any applicable
          local laws. If you disagree with any of these terms, you are
          prohibited from accessing this site. The materials contained in this
          Website are protected by copyright and trade mark law.
        </p>
        <h3 className={styles.tandc_h3}>2. Use License</h3>
        <p className={styles.tandc_p}>
          Permission is granted to temporarily download one copy of the
          materials on Komachi Anime's Website for personal, non-commercial
          transitory viewing only. This is the grant of a license, not a
          transfer of title, and under this license you may not: modify or copy
          the materials; use the materials for any commercial purpose or for any
          public display; attempt to reverse engineer any software contained on
          Komachi Anime's Website; remove any copyright or other proprietary
          notations from the materials; or transferring the materials to another
          person or "mirror" the materials on any other server. This will let
          Komachi Anime to terminate upon violations of any of these
          restrictions. Upon termination, your viewing right will also be
          terminated and you should destroy any downloaded materials in your
          possession whether it is printed or electronic format. These Terms of
          Service has been created with the help of the Terms Of Service
          Generator and the Privacy Policy Generator.
        </p>
        <h3 className={styles.tandc_h3}>3. Disclaimer </h3>
        <p className={styles.tandc_p}>
          All the materials on Komachi Anime&apos;s Website are provided "as
          is". Komachi Anime makes no warranties, may it be expressed or
          implied, therefore negates all other warranties. Furthermore, Komachi
          Anime does not make any representations concerning the accuracy or
          reliability of the use of the materials on its Website or otherwise
          relating to such materials or any sites linked to this Website.
        </p>
        <h3 className={styles.tandc_h3}>4. Limitations </h3>
        <p className={styles.tandc_p}>
          Komachi Anime or its suppliers will not be hold accountable for any
          damages that will arise with the use or inability to use the materials
          on Komachi Anime&apos;s Website, even if Komachi Anime or an authorize
          representative of this Website has been notified, orally or written,
          of the possibility of such damage. Some jurisdiction does not allow
          limitations on implied warranties or limitations of liability for
          incidental damages, these limitations may not apply to you.
        </p>
        <h3 className={styles.tandc_h3}>5. Revisions and Errata</h3>
        <p className={styles.tandc_p}>
          The materials appearing on Komachi Anime&apos;s Website may include
          technical, typographical, or photographic errors. Komachi Anime will
          not promise that any of the materials in this Website are accurate,
          complete, or current. Komachi Anime may change the materials contained
          on its Website at any time without notice. Komachi Anime does not make
          any commitment to update the materials.
        </p>
        <h3 className={styles.tandc_h3}>6. Links </h3>
        <p className={styles.tandc_p}>
          Komachi Anime has not reviewed all of the sites linked to its Website
          and is not responsible for the contents of any such linked site. The
          presence of any link does not imply endorsement by Komachi Anime of
          the site. The use of any linked website is at the user&apos;s own
          risk.
        </p>
        <h3 className={styles.tandc_h3}>7. Site Terms of Use</h3>
        <p className={styles.tandc_p}>
          Modifications Komachi Anime may revise these Terms of Use for its
          Website at any time without prior notice. By using this Website, you
          are agreeing to be bound by the current version of these Terms and
          Conditions of Use.
        </p>
        <h3 className={styles.tandc_h3}>8. Your Privacy</h3>
        <p className={styles.tandc_p}>Please read our Privacy Policy.</p>
        <h3 className={styles.tandc_h3}>9. Governing Law</h3>
        <p className={styles.tandc_p}>
          Any claim related to Komachi Anime's Website shall be governed by the
          laws of bq without regards to its conflict of law provisions.
        </p>
      </section>
      <Footer />
    </>
  );
}
