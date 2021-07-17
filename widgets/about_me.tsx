import React from "react";
import Section from "./section";

const textStyle: React.CSSProperties = {
  fontSize: 1.25 + "rem",
  textAlign: "justify",
};

export default function AboutMe() {
  return (
    <Section id="about-me" title="Sobre mim">
      <div className="text-justify" style={textStyle}>
        <p>
          Ob-La-Di, Ob-La-Da, meu nome é Raphael sou desenvolvedor de software
          full stack com experiência profissional com .NET Framework, React e
          Django. Além de me aventurar no desenvolvimento mobile durante meu
          tempo livre utilizando Flutter nos meus projetos pessoais. Vale
          mencionar esse meu site pessoal feito com Next.js
        </p>
        <p>
          Sou apaixonado por lógica e resolver problemas, desse modo, comecei
          meus estudos cedo, pouco antes de entrar na faculdade. Nesse primeiro
          momento foi bastante desafiador aprender programação, me vi na
          oportunidade de aperfeiçoar meu inglês e desde então consumo bastante
          material no idioma. Assim, de forma autodidata (como até hoje lido com
          meus estudos) consegui bons resultados que me levarem rapidamente à
          posição de desenvolvedor pleno ainda durante meu segundo ano na
          faculdade.
        </p>
        <p>
          Eu amo investimento e negócios o que me leva a almejar um dia ter a
          oportunidade de abrir minha própria empresa, ou vir a me tornar sócio
          da próxima big tech. Em vista disso, fui levado por minha aspiração a
          criar esse website com o objetivo de divulgar o meu trabalho e com a
          expectativa de ter a oportunidade de aprender com os grandes. E com
          isso preciso da sua contribuição na minha jornada, toda contribuição é
          bem-vinda {";)"}
        </p>
      </div>
    </Section>
  );
}
