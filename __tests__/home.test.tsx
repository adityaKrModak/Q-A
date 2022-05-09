import Home from "../pages/index";
import { render, screen } from "@testing-library/react";

describe("Home Page", () => {
  beforeEach(() => {
    render(<Home />);
  });
  test("renders page", () => {
    expect(screen.getByText("Asking Questions")).toBeInTheDocument();
  });
  describe("Header", () => {
    test("QuestionsLink", () => {
      expect(screen.getByRole("link", { name: "Questions" })).toHaveAttribute(
        "href",
        "/question"
      );
    });
    test("HomeLink", () => {
      expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute(
        "href",
        "/"
      );
    });
  });
});
