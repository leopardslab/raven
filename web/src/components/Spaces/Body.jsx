import React, { Fragment, useState, useEffect } from "react";
import Editor from "../Common/Editor";
import Select from "react-select";
import _ from "lodash";

const editor_modes = [
  { value: "json", label: "JSON" },
  { value: "text", label: "Text" },
  { value: "javascript", label: "JavaScript" },
  { value: "xml", label: "XML" },
];

function Body({ body, setBody }) {
  const [mode, setMode] = useState(editor_modes[0]);
  return (
    <Fragment>
      <div className="row">
        <div className="col-md-1"></div>
        <div className="col-md-3">
          <Select
            options={editor_modes}
            blurInputOnSelect
            placeholder="Mode"
            value={mode}
            styles={{ zIndex: 1000 }}
            onChange={(e) => setMode(_.find(editor_modes, { value: e.value }))}
          />
        </div>
        <div className="col-md-8"></div>
      </div>
      <div className="row">
        <div className="col-md-1"></div>
        <div className="col-md-10">
          <div style={{ height: "14px" }} />
        </div>
        <div className="col-md-1"></div>
      </div>
      <div className="row">
        <div className="col-md-1"></div>
        <div className="col-md-10">
          <Editor name={"asas"} value={body} onChange={setBody}></Editor>
        </div>
        <div className="col-md-1"></div>
      </div>
      <div className="row">
        <div className="col-md-7"></div>
        <div className="col-md-2">
          <button className="raven-buton">Cancel</button>
        </div>
        <div className="col-md-2">
          <button className="raven-buton">Save</button>
        </div>
        <div className="col-md-1"></div>
      </div>
    </Fragment>
  );
}

export default Body;
