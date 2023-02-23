import {
  faGithub,
  faInstagram,
  faLinkedinIn,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import React from "react";
import Section from "../section/section";
import CardContact from "./card_contact";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Contact() {
  return (
    <Section id="contact" title="Contato" className="mb-5" applyDivider>
      <div className="">
        <div className="grid gap-8 grid-cols-2 sm:grid-cols-4">
          <CardContact
            name="LinkedIn"
            icon={faLinkedinIn}
            url="https://linkedin.com"
            title="https://linkedin.com"
            iconClasses="bg-black text-white"
          />

          <CardContact
            name="Instagram"
            icon={faInstagram}
            url="https://www.instagram.com/_raphael.dev/"
            title="https://www.instagram.com/_raphael.dev/"
          />

          <CardContact
            name="WhatsApp"
            icon={faWhatsapp}
            url="https://wa.me/5579988490850"
            title="+55 79 98849-0850"
          />

          <CardContact
            name="GitHub"
            icon={faGithub}
            url="https://github.com/z33p"
            title="https://github.com/z33p"
          />
        </div>

        <div className="pt-6 flex justify-center">
          <span>
            <FontAwesomeIcon
              icon={faEnvelope}
              className="inline-block px-1 pb-3"
              style={{ width: 1.6 + "em" }}
            />
          </span>

          <span className="text-sm">raphael00fellipe@gmail.com</span>
        </div>
      </div>
    </Section>
  );
}
