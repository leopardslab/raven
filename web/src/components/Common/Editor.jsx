import React from "react";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/mode-text";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-github";

function Editor({ name, value, onChange }) {
  return (
    <AceEditor
      mode="json"
      theme="github"
      name={name}
      value={value}
      width="auto"
      height="250px"
      fontSize={16}
      onChange={onChange}
      className="raven-ace"
      editorProps={{ $blockScrolling: true }}
      setOptions={{
        enableBasicAutocompletion: true,
        enableLiveAutocompletion: false,
        enableSnippets: false,
        showLineNumbers: true,
        tabSize: 2,
        useWorker: false,
      }}
    />
  );
}

export default Editor;
