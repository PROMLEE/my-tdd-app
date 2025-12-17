import { render, screen } from "@testing-library/react";
import App from "./App";
import { describe, it, expect } from "vitest";

describe("App 컴포넌트", () => {
  it("화면에 Vite + React 글자가 보여야 한다", () => {
    render(<App />);
    // 화면에 해당 글자가 있는지 확인
    expect(screen.getByText(/Vite \+ React/i)).toBeInTheDocument();
  });
});
