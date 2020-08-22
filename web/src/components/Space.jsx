import React, { useState, useEffect, Fragment } from "react";
import Basic from "./Spaces/Basic";
import Body from "./Spaces/Body";
import Headers from "./Spaces/Headers";
import SpaceCard from "./Spaces/SpaceCard";
import Select from "react-select";
import Tab from "./Common/Tab/Tab";
import Tabs from "./Common/Tab/Tabs";
import { v4 as uuid } from "uuid";
import moment from "moment";
import _ from "lodash";
import Modal from "react-modal";
import {
  CreateSpace,
  CreateCheck,
  GetSpace,
  RunSpace,
} from "../services/Services";
import { useRecoilState, useRecoilValue } from "recoil";
import { spaceState, checkState, filterState } from "../store/atoms";
import { filterSpaces } from "../store/selectors";
import { useToasts } from "react-toast-notifications";

const request_types = [
  { value: "GET", label: "GET" },
  { value: "POST", label: "POST" },
  { value: "PUT", label: "PUT" },
  { value: "DELETE", label: "DELETE" },
  { value: "HEAD", label: "HEAD" },
  { value: "PATCH", label: "PATCH" },
  { value: "OPTIONS", label: "OPTIONS" },
];

const period_types = [
  { value: "Minutes", label: "Minutes" },
  { value: "Hourly", label: "Hourly" },
  { value: "Daily", label: "Daily" },
];

const customStyles = {
  content: {
    width: "500px",
    height: "300px",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(17, 17, 17, 0.82)",
  },
};

function Space() {
  let { addToast } = useToasts();
  const [modalIsOpen, setIsOpen] = useState(false);
  const [space, setSpace] = useRecoilState(spaceState);
  const [check, setCheck] = useRecoilState(checkState);
  const [filter, setFilter] = useRecoilState(filterState);
  const filterspaces = useRecoilValue(filterSpaces);
  const [headers, setHeaders] = useState([
    { id: uuid(), field: "", value: "" },
  ]);
  const [body, setBody] = useState("");
  const [period, setPeriod] = useState("");
  const [basic, setBasic] = useState({
    name: "",
    request: "",
    type: "",
    url: "",
    isCheck: false,
  });

  useEffect(() => {
    GetSpace((err, data) => {
      if (err) {
        addToast("Unable to fetch space! Please try again!", {
          appearance: "error",
          autoDismiss: true,
        });
      } else {
        setSpace(data);
      }
    });
  }, [addToast, setSpace]);

  const createSpace = () => {
    let newSpace = {
      ...basic,
      id: uuid(),
      headers,
      body,
      runs: null,
      createdAt: moment().format(),
    };
    CreateSpace(newSpace, (err, data) => {
      if (err) {
        addToast("Unable to create space! Please try again!", {
          appearance: "error",
          autoDismiss: true,
        });
      } else {
        setSpace([...space, newSpace]);
      }
    });
  };

  const runSpace = (id) => {
    RunSpace({ id: id }, (err, data) => {
      let selected = space.find((space) => space.id === id);
      let selectedIndex = space.findIndex((space) => space.id === id);
      selected = { ...selected, runs: data };
      setSpace([
        ...space.slice(0, selectedIndex),
        selected,
        ...space.slice(selectedIndex + 1),
      ]);
    });
  };

  const createCheck = ({ id, name, request }) => {
    setIsOpen(true);
    // let newCheck = {
    //   id: uuid(),
    //   name: name,
    //   sid: id,
    //   type: request,
    //   createdAt: moment().format(),
    // };
    // CreateCheck(newCheck, (error, data) => {
    //   if (error) {
    //     addToast("Unable to create check! Please try again!", {
    //       appearance: "error",
    //       autoDismiss: true,
    //     });
    //   } else {
    //     setCheck([...check, newCheck]);
    //     let selected = space.find((space) => space.id === id);
    //     let selectedIndex = space.findIndex((space) => space.id === id);
    //     selected = { ...selected, isCheck: true };
    //     setSpace([
    //       ...space.slice(0, selectedIndex),
    //       selected,
    //       ...space.slice(selectedIndex + 1),
    //     ]);
    //   }
    // });
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const afterOpenModal = () => {};

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <Fragment>
      <div className="container">
        <div className="row">
          <div className="col-sm-2 col-md-2"></div>
          <div className="col-12 col-sm-8 col-md-8">
            <div className="raven-card">
              <div className="row">
                <div className="col-md-12">
                  <Tabs>
                    <Tab label="BASIC" defult>
                      <Basic
                        basic={basic}
                        setBasic={setBasic}
                        createSpace={createSpace}
                      />
                    </Tab>
                    <Tab label="HEADER">
                      <Headers headers={headers} setHeaders={setHeaders} />
                    </Tab>
                    <Tab label="BODY">
                      <Body body={body} setBody={setBody} />
                    </Tab>
                  </Tabs>
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-2 col-md-2"></div>
        </div>
        {_.get(filterspaces, "length", 0) > 0 ? (
          <div className="row">
            <div className="col-sm-2 col-md-2"></div>
            <div className="col-sm-8 col-md-8">
              <div className="raven-filter">
                <div className="row">
                  <div className="col-sm-1 col-md-1"></div>

                  <div className="col-sm-4 col-md-4">
                    <Select
                      options={request_types}
                      blurInputOnSelect
                      placeholder="Request Types"
                      value={_.find(request_types, { value: filter.request })}
                      onChange={(e) =>
                        setFilter({ ...filter, request: e.value })
                      }
                    />
                  </div>

                  <div className="col-sm-4 col-md-4">
                    <input
                      className="raven-input"
                      placeholder="Space Name"
                      onChange={(e) =>
                        setFilter({ ...filter, name: e.target.value })
                      }
                    ></input>
                  </div>
                  <div className="col-sm-2 col-md-2"></div>
                  <div className="col-sm-1 col-md-1"></div>
                </div>
              </div>
            </div>
            <div className="col-sm-2 col-md-2"></div>
          </div>
        ) : null}
        <div className="row">
          <div className="col-sm-2 col-md-2"></div>
          <div className="col-sm-8 col-md-8">
            {_.get(filterspaces, "length", 0) > 0
              ? _.map(filterspaces, (data) => {
                  return (
                    <SpaceCard
                      key={data.id}
                      data={data}
                      runSpace={runSpace}
                      createCheck={createCheck}
                    />
                  );
                })
              : null}
          </div>
          <div className="col-sm-2 col-md-2"></div>
        </div>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-12">
              <h5>Select Period Type</h5>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12 col-12">
              <div className="raven-margin"></div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12 col-12">
              <span>Select a time period for checks to run</span>
              <div className="raven-margin"></div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12 col-12">
              <Select
                options={period_types}
                blurInputOnSelect
                placeholder="Period Types"
                value={period}
                onChange={(e) => setPeriod(e.value)}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-12 col-12">
              <div className="raven-margin"></div>
              <div className="raven-margin"></div>
              <div className="raven-margin"></div>
            </div>
          </div>
          <div className="row raven-model-options">
            <div className="col-md-6 col-6"></div>
            <div className="col-md-3 col-3">
              <button onClick={closeModal} className="raven-buton">
                Cancel
              </button>
            </div>
            <div className="col-md-3 col-3">
              <button onClick={closeModal} className="raven-buton">
                Select
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </Fragment>
  );
}

export default Space;
