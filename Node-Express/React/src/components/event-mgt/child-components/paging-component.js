import React, { Component, useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import { Card, Table } from "react-bootstrap";
import { useHistory } from 'react-router-dom'

const Paging = () => {
  
    useEffect(() => {
 
    }, []);

    // currentPage
    // totalPages
    // myEvents[]
    // currentPageData
    const onNextPage = () => {
        var currentPage_ = currentPage;
        if (currentPage + 1 < totalPages) {
            setCurrentPage(currentPage + 1);
            currentPage_ = currentPage_ + 1;
        }
        console.log(currentPage);

        // 2  = records per page
        var start = currentPage_ * 2;
        var end = start + 2;
        console.log('next : start point : ' + start);
        console.log('all data : ' + myEvents);
        var currentPageData_ = myEvents.slice(start, end);
        console.log(currentPageData_);
        setCurrentPageData(currentPageData_);
    }
    const onPreviousPage = () => {
        var currentPage_ = currentPage;
        if (currentPage - 1 >= 0) {
            setCurrentPage(currentPage - 1);
            currentPage_ = currentPage_ - 1;
        }
        console.log(currentPage);

        // 2  = records per page
        var start = currentPage_ * 2;
        var end = start + 2;
        console.log('previous : start point : ' + start);
        console.log('all data : ' + myEvents);
        var currentPageData_ = myEvents.slice(start, end);
        console.log(currentPageData_);
        setCurrentPageData(currentPageData_);
    }

    return (
        <div>
            <div className="row">
                <div className="col-sm-1">
                </div>
                <div className="col-sm-4">
                    <button
                        onClick={onPreviousPage}
                        type="button"
                        className="btn btn-block btn-info">
                        &lt;&lt;PREVIOUS
                    </button>
                </div>
                <div className="col-sm-2">
                </div>
                <div className="col-sm-4 nextPage">
                    <button
                        onClick={onNextPage}
                        type="button"
                        className="btn btn-block btn-info">
                        NEXT&gt;&gt;
                    </button>
                </div>
                <div className="col-sm-1">
                </div>
            </div>
        </div>
    );
};

export default Paging;