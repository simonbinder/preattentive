import React from "react";
import "./App.css";
import Quiz from "./Quiz";
import { Card, CardHeader, CardBody, CardTitle } from "shards-react";

function App() {
  return (
    <div className="window-wrapper">
      <Card className="quiz-container">
        <CardHeader>Preattentive Processing</CardHeader>
        <CardBody>
          <CardTitle>Art auswählen</CardTitle>
          <Quiz />
        </CardBody>
      </Card>
    </div>
  );
}

export default App;
