import { useEffect, useRef } from "react";
import "./App.css";
import { useConfig, useActionTrigger, useVariable, useEditorPanelConfig } from "@sigmacomputing/plugin";
import IframeComponent from "./components/IframeComponent";

function App() {
  // Configure the editor panel with control selectors for vizUrl and vizNodeId
  useEditorPanelConfig([
    {
      type: "action-trigger",
      name: "onLoadAction",
      label: "onLoad",
    },
    {
      name: "vizUrlControl",
      type: "variable",
      label: "URL Control"
    },
    {
      name: "vizNodeIdControl",
      type: "variable",
      label: "Node ID Control"
    }
  ]);

  const config = useConfig();
  
  // Get the action trigger for onLoad
  const triggerOnLoadAction = useActionTrigger(config.onLoadAction);
  
  // Get the variable data for the selected controls
  const vizUrlControlData = useVariable(config.vizUrlControl);
  const [, setVizNodeIdValue] = useVariable(config.vizNodeIdControl);
  
  // Extract the URL value from the control - handle the type properly
  const vizUrl = (vizUrlControlData[0]?.defaultValue as any)?.value || "";
  
  // Parse the node ID from the vizUrl
  const parseNodeIdFromUrl = (url: string): string => {
    try {
      // Extract the element ID from the URL path
      // URL pattern: .../workbook/{workbookId}/element/{nodeId}...
      const elementMatch = url.match(/\/element\/([^\/&\?]+)/);
      if (elementMatch && elementMatch[1]) {
        return elementMatch[1];
      }
      return "";
    } catch (error) {
      console.error("Error parsing node ID from URL:", error);
      return "";
    }
  };

  const nodeId = parseNodeIdFromUrl(vizUrl);
  
  // Set the node ID value to the vizNodeId control when the URL changes
  useEffect(() => {
    if (config.vizNodeIdControl && nodeId) {
      // Update the control value with the parsed node ID
      console.log("Setting vizNodeId control to:", nodeId);
      setVizNodeIdValue(nodeId);
    }
  }, [vizUrl, config.vizNodeIdControl, nodeId, setVizNodeIdValue]);
  
  // Flag to track if initial render has happened
  const initialRenderRef = useRef(true);

  // Trigger onLoadAction when the plugin first mounts
  useEffect(() => {
    if (initialRenderRef.current) {
      console.log("Iframe plugin mounted - triggering onLoadAction");
      console.log("Parsed node ID:", nodeId);
      triggerOnLoadAction();
      initialRenderRef.current = false;
    }
  }, [triggerOnLoadAction, nodeId]);

  return (
    <div className="w-full h-full flex flex-col" style={{ minHeight: 0 }}>
      <IframeComponent 
        src={vizUrl}
        title="Sigma Iframe Content"
        className="w-full h-full flex-1"
        onLoad={() => {
          console.log("Iframe loaded successfully");
          // You can add additional logic here when the iframe loads
        }}
        onError={(error) => {
          console.error("Iframe failed to load:", error);
          // You can add additional error handling here
        }}
      />
    </div>
  );
}

export default App;
