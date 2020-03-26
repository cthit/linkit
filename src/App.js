import React from "react";
import "./App.css";
import {
  DigitProviders,
  DigitHeader,
  DigitButton
} from "@cthit/react-digit-components";

function App() {
  return (
    <DigitProviders>
      <DigitHeader
        title="My website"
        renderMain={() => <DigitButton text="Hello world!" />}
      />
    </DigitProviders>
  );
}

export default App;
