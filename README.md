# Chatbot Flow Builder

A React-based visual flow builder for creating chatbot conversation flows. Built with React Flow, TypeScript, and Emotion.

## Features

- Drag and drop interface for creating message flows
- Text message nodes with customizable content
- Visual connection between nodes using edges
- Settings panel for editing node properties
- Flow validation to ensure proper message connections
- Modern and responsive UI

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd chatbot-flow-builder
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Usage

1. Drag a Message node from the right panel onto the canvas
2. Click on a node to edit its message text in the settings panel
3. Connect nodes by dragging from one node's right handle to another node's left handle
4. Click "Save Changes" to save your flow (validation will ensure proper connections)

## Project Structure

- `src/components/` - React components
  - `Flow.tsx` - Main flow builder component
  - `TextNode.tsx` - Message node component
  - `NodesPanel.tsx` - Panel for node types
  - `SettingsPanel.tsx` - Node settings panel
- `src/types/` - TypeScript type definitions

## Technologies Used

- React
- TypeScript
- React Flow
- Emotion (Styled Components)
- Vite

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
