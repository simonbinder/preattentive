import React, { useState } from "react";
import { FormRadio, Button } from "shards-react";
import Question from "./Question";

const types = ["color", "shape", "both", "number", "multiple"];

function Quiz() {
  const [selectedType, setSelectedType] = useState("");
  const [displayQuestion, setDisplayQuestion] = useState(false);
  return (
    <div>
      {displayQuestion ? (
        <Question selectedType={selectedType} />
      ) : (
        <div>
          <div>
            <p>
              Im Folgenden wird ein Bild zu sehen sein. Nachdem das Bild
              angezeigt wurde, werden Sie gefragt werden, ob auf diesem ein
              roter Kreis zu sehen war. Die Zeit, die das Bild angezeigt wird,
              erhöht sich, bis die Frage richtig beantwortet wurde.
            </p>
          </div>
          {types.map((type) => {
            return (
              <span>
                <FormRadio
                  inline
                  name="sport"
                  checked={selectedType === type}
                  onChange={() => {
                    setSelectedType(type);
                  }}
                >
                  {type}
                </FormRadio>
              </span>
            );
          })}
          <div>
            <Button
              disabled={selectedType === ""}
              onClick={() => setDisplayQuestion(true)}
            >
              Start &rarr;
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Quiz;
