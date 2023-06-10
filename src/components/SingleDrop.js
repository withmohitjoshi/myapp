import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { useState } from "react";
const body = document.getElementsByTagName("body")[0];
const handleIsOpen = (isOpen, setIsOpen) => setIsOpen(!isOpen);
const SingleDrop = ({
  fieldName = "",
  initalValue = "",
  placeholder = "",
  isApiPresent = true,
  queryKey = "",
  queryFn = () => {},
  queryFnPayload = {},
  selectedValue = "",
  displayLabel = "",
  rawData = [],
  onChange = () => {},
  formHookField = {},
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedResult, setSelectedResult] = useState(initalValue);
  const { data, isLoading } = useQuery({
    queryKey: [queryKey],
    queryFn: () => queryFn({ page: 1, length: 10, ...queryFnPayload }),
    select: (data) => data?.data?.data,
    enabled: isApiPresent && isOpen,
  });
  // for opeing and closing
  useEffect(() => {
    if (isOpen) {
      body.addEventListener("click", () => handleIsOpen(isOpen, setIsOpen));
    }
    return () => {
      body.removeEventListener("click", () => handleIsOpen(isOpen, setIsOpen));
    };
  }, [isOpen]);
  // for seting initial value in form hook
  useEffect(() => {
    if (formHookField.onChange && initalValue) {
      formHookField.onChange(initalValue);
    }
  }, [formHookField, initalValue]);

  if (isApiPresent) {
    return (
      <div className="dropdown-main">
        <div
          className="dropdown-header"
          onClick={(e) => {
            e.stopPropagation();
            setIsOpen(true);
          }}
        >
          <input
            type="text"
            placeholder={placeholder || "Please select"}
            readOnly
            {...formHookField}
            value={selectedResult}
          />
        </div>
        {isOpen && (
          <div className="dropdown-body">
            <div className="dropdown-search">
              <input type="search" placeholder="search" />
              {isLoading && <p>Loading...</p>}
            </div>
            <ul className="dropdown-menu">
              {!isLoading && data?.length === 0 && <li>No record found</li>}
              {!isLoading && (
                <>
                  <li
                    className="dropdown-menu-items"
                    onClick={() => {
                      setSelectedResult("");
                      onChange("");
                      setIsOpen(false);
                      if (formHookField.onChange) {
                        formHookField.onChange("");
                      }
                    }}
                  >
                    {placeholder}
                  </li>
                  {data?.map((result, index) => {
                    const value = result[selectedValue];
                    const label = result[displayLabel];
                    return (
                      <li
                        key={index}
                        className="dropdown-menu-items"
                        onClick={() => {
                          setSelectedResult(value);
                          onChange(value);
                          setIsOpen(false);
                          if (formHookField.onChange) {
                            formHookField.onChange(value);
                          }
                        }}
                      >
                        {label}
                      </li>
                    );
                  })}
                </>
              )}
            </ul>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="dropdown-main">
      <div
        className="dropdown-header"
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(true);
        }}
      >
        <input
          type="text"
          placeholder={placeholder || "Please select"}
          readOnly
          {...formHookField}
          value={selectedResult}
        />
      </div>
      {isOpen && (
        <div className="dropdown-body">
          <div className="dropdown-search">
            <input type="search" placeholder="search" />
          </div>
          <ul className="dropdown-menu">
            <li
              className="dropdown-menu-items"
              onClick={() => {
                setSelectedResult("");
                onChange("");
                setIsOpen(false);
                if (formHookField.onChange) {
                  formHookField.onChange("");
                }
              }}
            >
              {placeholder}
            </li>
            {rawData.length === 0 && <li>Data is not provided</li>}
            {rawData.map((result, index) => {
              const value = result[selectedValue];
              const label = result[displayLabel];
              return (
                <li
                  key={index}
                  className="dropdown-menu-items"
                  onClick={() => {
                    setSelectedResult(value);
                    onChange(value);
                    setIsOpen(false);
                    if (formHookField.onChange) {
                      formHookField.onChange(value);
                    }
                  }}
                >
                  {label}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SingleDrop;
