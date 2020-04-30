import React, { useState, useEffect } from "react";
import { FormRadio, Button } from "shards-react";
import { Stage, Layer, Circle, Rect, Ellipse, Arc } from "react-konva";

function Question(questionProps) {
  const { selectedType } = questionProps;
  const [displayTime, setDisplayTime] = useState(100);
  const [displayImage, setDisplayImage] = useState(true);
  const [answer, setAnswer] = useState("");
  const [circles, setCircle] = useState([]);
  const [displayElement, setDisplayElement] = useState(false);
  const [displaySolution, setDisplaySolution] = useState(false);
  const [solved, setSolved] = useState(false);
  const [numElements, setNumElements] = useState(10);

  useEffect(() => {
    if (circles.length === 0) {
      popCanvas();
    }
    if (selectedType === "number") {
      setNumElements(100);
    }
    const random_boolean = Math.random() >= 0.5;
    setDisplayElement(random_boolean);
    setTimeout(() => {
      setDisplayImage(false);
    }, displayTime);
  }, []);

  const continueQuestion = () => {
    setDisplayImage(true);
    setDisplaySolution(false);
    const random_boolean = Math.random() >= 0.5;
    setDisplayElement(random_boolean);
    popCanvas();
    setAnswer("");
    setTimeout(() => {
      setDisplayImage(false);
    }, displayTime);
  };

  const solveQuestion = () => {
    setDisplaySolution(true);
    if (
      (answer === "yes" && displayElement === true) ||
      (answer === "no" && displayElement === false)
    ) {
      setSolved(true);
    } else {
      if (selectedType === "number") {
        setNumElements(numElements - 5);
      }
      setDisplayTime(displayTime + 50);
    }
  };

  function haveIntersection(r1, r2) {
    return !(
      r2.x > r1.x + r1.r ||
      r2.x + r2.r < r1.x ||
      r2.y > r1.y + r1.r ||
      r2.y + r2.r < r1.y
    );
  }

  const popCanvas = () => {
    let tempCircles = [];
    while (tempCircles.length < numElements) {
      let circle = {
        x: Math.random() * width,
        y: Math.random() * height,
        r: 20,
      };
      let overlapping = false;

      for (var i = 0; i < tempCircles.length; i++) {
        var existing = tempCircles[i];
        var d = haveIntersection(circle, existing);
        if (d) {
          overlapping = true;
          break;
        }
      }

      if (!overlapping) {
        tempCircles.push(circle);
      }
    }
    setCircle(tempCircles);
  };

  const width = 1180;
  const height = 400;

  return (
    <div>
      {!displaySolution ? (
        displayImage ? (
          <div>
            {(selectedType === "color" || selectedType === "number") && (
              <Stage width={window.innerWidth} height={window.innerHeight}>
                <Layer>
                  {circles.map((circle, i) => {
                    return (
                      <Circle
                        key={i}
                        x={circle.x}
                        y={circle.y}
                        radius={circle.r}
                        fill={i === 0 && displayElement ? "red" : "grey"}
                      />
                    );
                  })}
                </Layer>
              </Stage>
            )}
            {selectedType === "shape" && (
              <Stage width={window.innerWidth} height={window.innerHeight}>
                <Layer>
                  {circles.map((circle, i) => {
                    if (i === 0 && displayElement) {
                      return (
                        <Rect
                          key={i}
                          x={circle.x}
                          y={circle.y}
                          width={circle.r}
                          height={circle.r}
                          fill={"grey"}
                        />
                      );
                    } else
                      return (
                        <Circle
                          key={i}
                          x={circle.x}
                          y={circle.y}
                          radius={circle.r}
                          fill={"grey"}
                        />
                      );
                  })}
                </Layer>
              </Stage>
            )}
            {selectedType === "both" && (
              <Stage width={window.innerWidth} height={window.innerHeight}>
                <Layer>
                  {circles.map((circle, i) => {
                    if (i === 0 && displayElement) {
                      return (
                        <Circle
                          key={i}
                          x={circle.x}
                          y={circle.y}
                          radius={circle.r}
                          fill={"grey"}
                        />
                      );
                    } else {
                      const random_boolean = Math.random() >= 0.5;
                      if (random_boolean) {
                        return (
                          <Circle
                            key={i}
                            x={circle.x}
                            y={circle.y}
                            radius={circle.r}
                            fill={"grey"}
                          />
                        );
                      } else {
                        return (
                          <Rect
                            key={i}
                            x={circle.x}
                            y={circle.y}
                            width={circle.r * 2}
                            height={circle.r * 2}
                            fill={"red"}
                          />
                        );
                      }
                    }
                  })}
                </Layer>
              </Stage>
            )}
            {selectedType === "multiple" && (
              <div>
                <Stage width={window.innerWidth} height={window.innerHeight}>
                  <Layer>
                    {circles.map((circle, i) => {
                      if (i === 0 && displayElement) {
                        return (
                          <Circle
                            key={i}
                            x={circle.x}
                            y={circle.y}
                            radius={circle.r}
                            fill={"red"}
                          />
                        );
                      } else {
                        const random_boolean = Math.random();
                        if (random_boolean <= 0.2) {
                          const rand = Math.random() * (10 - 1) + 1;
                          return (
                            <Rect
                              key={i}
                              x={circle.x}
                              y={circle.y}
                              width={circle.r * rand}
                              height={circle.r * rand}
                              rotation={360 * rand}
                              fill={"grey"}
                            />
                          );
                        } else if (
                          random_boolean > 0.2 &&
                          random_boolean <= 0.4
                        ) {
                          return (
                            <Ellipse
                              key={i}
                              x={circle.x}
                              y={circle.y}
                              width={circle.r * 2}
                              height={circle.r * 2}
                              fill={"grey"}
                            />
                          );
                        } else if (
                          random_boolean > 0.4 &&
                          random_boolean <= 0.6
                        ) {
                          return (
                            <Circle
                              key={i}
                              x={circle.x}
                              y={circle.y}
                              radius={circle.r}
                              fill={"grey"}
                            />
                          );
                        } else if (
                          random_boolean > 0.6 &&
                          random_boolean <= 0.8
                        ) {
                          return (
                            <Arc
                              x={circle.x}
                              y={circle.y}
                              innerRadius={40}
                              outerRadius={70}
                              angle={60}
                              fill={"grey"}
                              stroke={"grey"}
                              strokeWidth={2}
                            />
                          );
                        } else {
                          const rand = Math.random() * (5 - 1) + 1;
                          return (
                            <Circle
                              key={i}
                              x={circle.x}
                              y={circle.y}
                              radius={circle.r * rand}
                              fill={"grey"}
                            />
                          );
                        }
                      }
                    })}
                  </Layer>
                </Stage>
              </div>
            )}
          </div>
        ) : (
          <div>
            <div>{`War ${
              selectedType === "shape" ? "das Quadrat" : "der rote Kreis"
            } im Bild sichtbar ?`}</div>
            <div>
              <span>
                <FormRadio
                  inline
                  name="yes"
                  checked={answer === "yes"}
                  onChange={() => {
                    setAnswer("yes");
                  }}
                >
                  Ja
                </FormRadio>
              </span>
              <span>
                <FormRadio
                  inline
                  name="no"
                  checked={answer === "no"}
                  onChange={() => {
                    setAnswer("no");
                  }}
                >
                  Nein
                </FormRadio>
              </span>
              <span>
                <FormRadio
                  inline
                  name="dontknow"
                  checked={answer === "dontknow"}
                  onChange={() => {
                    setAnswer("dontknow");
                  }}
                >
                  Weiß nicht
                </FormRadio>
              </span>
            </div>
            <Button disabled={answer === ""} onClick={() => solveQuestion()}>
              <span>Lösung anzeigen</span>
            </Button>
          </div>
        )
      ) : solved ? (
        <div>{`Herzlichen Glückwunsch! Sie haben die richtige Antwort innerhalb von ${displayTime}ms erkannt.`}</div>
      ) : (
        <div>
          <div>
            {answer !== "dontknow" && <span>Leider falsch. </span>}
            Klicken sie unten, um mit längerer Zeit fortzufahren.
          </div>
          <Button onClick={() => continueQuestion()}>
            <span>Fortfahren</span>
          </Button>
        </div>
      )}
    </div>
  );
}

export default Question;
