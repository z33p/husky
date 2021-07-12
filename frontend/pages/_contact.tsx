import {
  faGithub,
  faInstagram,
  faLinkedinIn,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import Section from "./components/_section";
import CardContact from "./components/contact/_cardContact";

export default function Contact() {
  return (
    <Section id="contact" title="Contato" className="mb-5" applyDivider>
      <div className="row justify-content-center">
        <div className="pb-4 col-6 col-md-2">
          <div className="d-flex justify-content-center">
            <CardContact
              name="LinkedIn"
              icon={faLinkedinIn}
              url="https://linkedin.com"
              title="https://linkedin.com"
              iconClasses="bg-dark text-white"
            />
          </div>
        </div>

        <div className="pb-4 col-6 col-md-2">
          <div className="d-flex justify-content-center">
            <CardContact
              name="Instagram"
              icon={faInstagram}
              url="https://www.instagram.com/_raphael.dev/"
              title="https://www.instagram.com/_raphael.dev/"
            />
          </div>
        </div>

        <div className="pb-4 col-6 col-md-2">
          <div className="d-flex justify-content-center">
            <CardContact
              name="WhatsApp"
              icon={faWhatsapp}
              url="https://wa.me/5579988490850"
              title="+55 79 98849-0850"
            />
          </div>
        </div>

        <div className="pb-4 col-6 col-md-2">
          <div className="d-flex justify-content-center">
            <CardContact
              name="GitHub"
              icon={faGithub}
              url="https://github.com/z33p"
              title="https://github.com/z33p"
            />
          </div>
        </div>
      </div>

      <div className="pt-2 row justify-content-center">
        <div className="col-md-2 ">
          <div className="d-flex justify-content-center">
            <span>
              <FontAwesomeIcon
                icon={faEnvelope}
                className="d-inline-block px-1"
                style={{ width: 1.8 + "em" }}
              />
            </span>

            <span>raphael00fellipe@gmail.com</span>
          </div>
        </div>
      </div>
    </Section>
  );
}
