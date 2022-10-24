import React, { Component, useState, useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import { useHistory } from "react-router-dom";
import { Button } from "react-bootstrap";

const MyEvent = ({ myEvents, currentPageData, totalPages, showPaging }) => {
  const history = useHistory();

  const [currentPage, setCurrentPage] = useState();
  const [currentPageData_, setCurrentPageData_] = useState([]);

  useEffect(() => {
    setCurrentPageData_(currentPageData);
    setCurrentPage(0);
  }, []);

  const setActiveEvent = (selectedEvent) => {
    localStorage.setItem("selectedEvent", JSON.stringify(selectedEvent));
    history.push("manage-event");
  };

  const onNextPage = () => {
    var currentPage_ = currentPage;
    if (currentPage + 1 < totalPages) {
      setCurrentPage(currentPage + 1);
      currentPage_ = currentPage_ + 1;
    }

    // 2  = records per page
    var start = currentPage_ * 2;
    var end = start + 2;
    var currentPageData_ = myEvents.slice(start, end);
    setCurrentPageData_(currentPageData_);
  };
  const onPreviousPage = () => {
    var currentPage_ = currentPage;
    if (currentPage - 1 >= 0) {
      setCurrentPage(currentPage - 1);
      currentPage_ = currentPage_ - 1;
    }

    // 2  = records per page
    var start = currentPage_ * 2;
    var end = start + 2;
    var currentPageData_ = myEvents.slice(start, end);
    setCurrentPageData_(currentPageData_);
  };

  let myEventsList =
    currentPageData_.length > 0 ? (
      currentPageData_.map((e, index) => {
        return (
          <span key={index}>
            <Button
              variant="success"
              style={{
                marginBottom: 10,
                marginRight: 15,
                width: 350,
                height: 150,
                borderColor: "black",
                borderWidth: 2,
                color: "white",
                borderStyle: "dotted",
                borderRadius: 30,
              }}
              onClick={() => {
                setActiveEvent(e.eventData);
              }}
              key={index}
              size="md"
            >
              <div>
                <b>
                  <span className="eventTitle">{e.eventData.eventTitle}</span>
                  <br />
                  {e.offsetFromToday > 1 ? (
                    <span className="remainingEvent">
                      [ {e.offsetFromToday} Days Remaining ]
                    </span>
                  ) : (
                    <span>
                      {e.offsetFromToday == 1 ? (
                        <span className="tomorrowEvent">
                          [ {e.offsetFromToday} Day Remaining ]
                        </span>
                      ) : (
                        <span>
                          {e.offsetFromToday == 0 ? (
                            <span className="todayEvent">
                              [ Today @{" "}
                              {moment(e.eventData.eventDate).format("hh:mm A")}{" "}
                              ]
                            </span>
                          ) : (
                            <span>
                              {e.offsetFromToday < -1 ? (
                                <span className="pastEvent">
                                  [ {e.offsetFromToday * -1} Days Before ]
                                </span>
                              ) : (
                                <span className="pastEvent">
                                  [ {e.offsetFromToday * -1} Day Before ]
                                </span>
                              )}
                            </span>
                          )}
                        </span>
                      )}
                    </span>
                  )}
                </b>
                <br />
                <b>
                  {moment(e.eventData.eventDate).format("ddd, Do MMM - h:mm a")}
                </b>
                <br />
                {e.eventData.eventDesc}
              </div>
            </Button>
          </span>
        );
      }, this)
    ) : (
      <div>
        <p></p>
        <div className="row noEvents">
          <div className="col-sm-4"></div>
          <div className="col-sm-4">No Events Yet!</div>
          <div className="col-sm-4"></div>
        </div>
        <p></p>
      </div>
    );

  return (
    <div>
      <div>
        <p></p>
        {showPaging ? (
          <div className="row">
            <div className="col-sm-1"></div>
            <div className="col-sm-4">
              <button
                onClick={onPreviousPage}
                type="button"
                className="btn btn-block btn-info"
              >
                &lt;&lt;PREVIOUS
              </button>
            </div>
            <div className="col-sm-2"></div>
            <div className="col-sm-4 nextPage">
              <button
                onClick={onNextPage}
                type="button"
                className="btn btn-block btn-info"
              >
                NEXT&gt;&gt;
              </button>
            </div>
            <div className="col-sm-1"></div>
          </div>
        ) : (
          <span></span>
        )}
      </div>
      <p></p>
      <p></p>
      <div className="row">
        <div className="com-sm-1"></div>
        <div className="com-sm-10 eventContainer">{myEventsList}</div>
      </div>
    </div>
  );
};

export default MyEvent;
