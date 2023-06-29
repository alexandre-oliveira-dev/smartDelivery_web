import { Row, Typography } from "antd";
import React from "react";

export default function SectionAsksQuestions() {
  const asks = [
    {
      ask: "Como que funciona?",
      res: "Após você criar sua conta e assinar o plano você poderá personalizar seu cardápio, e poderá acessar o link do seu delivery para seus clientes efetuarem os pedidos.",
    },
    {
      ask: "Posso cancelar a qualquer momento?",
      res: "Sim, nada de fidelização. 😄",
    },
  ];
  return (
    <section className="sectionAskquestions">
        <Row>
            <Typography.Title level={2}>Perguntas frequêntes</Typography.Title>
        </Row>
      {asks.map((item: any, index: number) => {
        return (
          <div>
            <details className="detailsask" key={index}>
              <summary >{item?.ask}</summary>
              <p>{item.res}</p>
            </details>
          </div>
        );
      })}
    </section>
  );
}
