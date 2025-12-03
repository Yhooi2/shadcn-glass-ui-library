import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import { fn } from "storybook/test";
import { HeaderNavGlass } from "./glass/sections/header-nav-glass";

const meta = {
  title: "Glass/Composite/HeaderNavGlass",
  component: HeaderNavGlass,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {
    username: {
      control: "text",
      description: "Default username for search input",
    },
    onSearch: {
      description: "Callback when search is triggered",
    },
    onThemeToggle: {
      description: "Callback when theme toggle is clicked",
    },
  },
} satisfies Meta<typeof HeaderNavGlass>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    username: "Yhooi2",
    onSearch: fn(),
    onThemeToggle: fn(),
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const CustomUsername: Story = {
  args: {
    username: "octocat",
    onSearch: fn(),
    onThemeToggle: fn(),
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const EmptySearch: Story = {
  args: {
    username: "",
    onSearch: fn(),
    onThemeToggle: fn(),
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const WithCallbacks: Story = {
  args: {
    username: "Yhooi2",
    onSearch: fn((value) => console.log("Search:", value)),
    onThemeToggle: fn(() => console.log("Theme toggled")),
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const Interactive: Story = {
  args: {
    username: "Yhooi2",
  },
  render: function InteractiveHeader() {
    const [searchValue, setSearchValue] = useState("Yhooi2");
    const [searchResults, setSearchResults] = useState<string[]>([]);

    const handleSearch = (value: string) => {
      setSearchValue(value);
      setSearchResults([...searchResults, `Searched: ${value} at ${new Date().toLocaleTimeString()}`]);
    };

    return (
      <div className="flex flex-col">
        <HeaderNavGlass
          username={searchValue}
          onSearch={handleSearch}
        />
        {searchResults.length > 0 && (
          <div className="mt-4 p-4">
            <p style={{ color: "var(--text-primary)", fontSize: "12px", marginBottom: "8px" }}>
              Search history:
            </p>
            <ul style={{ fontSize: "10px", color: "var(--text-muted)" }}>
              {searchResults.map((result, i) => (
                <li key={i}>{result}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};
