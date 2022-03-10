import { render, screen } from "@testing-library/react";
import store from "../redux/store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import Create from "../components/Create";

describe("Form test", () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Create />
        </BrowserRouter>
      </Provider>
    );
  });
  it("The form should have an input for the dog's name", () => {
    const element = screen.getByLabelText("Name");
    expect(element.type).toBe("text");
  });
  it("The form should have two input for the dog's height", () => {
    const element = screen.getByLabelText("Height");
    expect(element.type).toBe("number");
  });
  it("The form should have two input for the dog's weight", () => {
    const element = screen.getByLabelText("Weight");
    expect(element.type).toBe("number");
  });
  it("The form should have two input for the dog's life span", () => {
    const element = screen.getByLabelText("Life span");
    expect(element.type).toBe("number");
  });
  it("The form should have two input for the dog's image", () => {
    const element = screen.getByLabelText("Image");
    expect(element.type).toBe("url");
  });
  it("The form should have two input for the dog's temperaments", () => {
    const element = screen.getByLabelText("Temperaments");
    expect(element.type).toBe("select-one");
  });
});
