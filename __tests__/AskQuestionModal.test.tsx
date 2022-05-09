import { fireEvent, render, screen } from "@testing-library/react";
import AskQuestionModal from "../components/AskQuestionModal";

describe("Ask Question MOdal", () => {
  test("should render the basic fields", () => {
    const mockSaveFormData = jest.fn();

    render(
      <AskQuestionModal
        setIsModalOpen={() => false}
        saveFormData={mockSaveFormData}
      />
    );
    expect(screen.getByLabelText("Title")).toBeInTheDocument();
    expect(screen.getByText("Description")).toBeInTheDocument();
    expect(screen.getByLabelText("Tags")).toBeInTheDocument();

    expect(screen.getByRole("textbox", { name: /title/i }));
    //mock the React Quill component
    expect(screen.getByRole("textbox", { name: /tags/i }));
    expect(screen.getByRole("button", { name: /post/i }));

    //Testing Invalid data
    fireEvent.input(screen.getByRole("textbox", { name: /title/i }), {
      target: {
        value: "",
      },
    });

    fireEvent.input(screen.getByRole("textbox", { name: /tags/i }), {
      target: {
        value: "",
      },
    });
    fireEvent.submit(screen.getByRole("button", { name: /post/i }));
    expect(mockSaveFormData).not.toBeCalled();

    //Testing Valid data
    fireEvent.input(screen.getByRole("textbox", { name: /title/i }), {
      target: {
        value: "testing 1",
      },
    });

    fireEvent.input(screen.getByRole("textbox", { name: /tags/i }), {
      target: {
        value: ["testingTag1"],
      },
    });
    fireEvent.submit(screen.getByRole("button", { name: /post/i }));

    //check if button changes to loading
  });
});
