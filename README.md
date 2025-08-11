# Sigma Iframe Plugin

A Sigma Computing plugin that renders an iframe within a Sigma workbook, allowing you to embed external content seamlessly.

## Features

- **URL Configuration**: Configure the iframe source URL through the Sigma plugin configuration panel
- **Node ID Extraction**: Automatically extracts and manages node IDs from Sigma workbook URLs
- **Loading States**: Displays loading indicators while content is being loaded
- **Error Handling**: Graceful error handling with retry functionality
- **Responsive Design**: Fully responsive iframe that adapts to the container size
- **Security**: Implements proper sandbox attributes for secure iframe rendering

## Configuration

The plugin provides two main configuration options in the Sigma editor panel:

1. **URL Control** (`vizUrlControl`): A variable control that accepts the URL to be displayed in the iframe
2. **Node ID Control** (`vizNodeIdControl`): A variable control that automatically receives the extracted node ID from the URL

## Usage

1. Add the iframe plugin to your Sigma workbook
2. Configure the URL Control with the desired iframe source URL
3. The plugin will automatically extract the node ID from Sigma workbook URLs and populate the Node ID Control
4. The iframe will render the content with proper loading states and error handling

## URL Format Support

The plugin automatically parses node IDs from Sigma workbook URLs with the following pattern:
```
.../workbook/{workbookId}/element/{nodeId}...
```

## Development

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
npm install
```

### Development Server

```bash
npm run dev
```

### Build

```bash
npm run build
```

## Plugin Structure

- `src/App.tsx`: Main plugin component with Sigma integration
- `src/components/IframeComponent.tsx`: Reusable iframe component with loading states and error handling

## Sigma Plugin SDK Integration

This plugin demonstrates the following Sigma Plugin SDK features:

- `useEditorPanelConfig`: Configures the editor panel with variable controls
- `useVariable`: Accesses and manages variable data from Sigma
- `useActionTrigger`: Triggers actions when the plugin loads
- `useConfig`: Accesses plugin configuration

## Security Features

The iframe component includes security measures:

- Sandbox attributes to restrict iframe capabilities
- Proper error handling for failed loads
- Secure content rendering

## Styling

The plugin uses Tailwind CSS for styling and is fully responsive. The iframe component includes:

- Loading spinners
- Error states with retry buttons
- Responsive design that adapts to container size
- Modern UI with proper spacing and typography
