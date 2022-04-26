import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { ActionType } from "../../state/action";
import { AppContext } from "../../state/context";
import { FeedDataType } from "../../state/state";

const LeftSideBar = () => {
  const { state, dispatch } = useContext(AppContext);
  const [allFeed, setAllFeed] = useState(state.FeedData);
  const [selectedLabel, setSelectedLabel] = useState<string>("");
  useEffect(() => {
    void (async function () {
      if (selectedLabel != "") {
        const response = await fetch(
          `/api/labels/filterByLabels/${selectedLabel}`
        );
        if (response.ok) {
          const filteredFeedData = (await response.json()) as FeedDataType[];
          dispatch({
            type: ActionType.FilterQuestions,
            payload: filteredFeedData,
          });
        }
      } else {
        dispatch({ type: ActionType.FilterQuestions, payload: allFeed });
      }
    })();
  }, [selectedLabel]);
  return (
    <div id="sidebar" className=" bg-white w-[100%] md:max-w-[300px] ">
      <div id="labels" className="text-center">
        {state.Labels.map((label) => (
          <span
            key={label}
            onClick={() =>
              selectedLabel == label
                ? setSelectedLabel("")
                : setSelectedLabel(label)
            }
            className={
              selectedLabel == label
                ? " bg-cyan-400 text-white  inline-block border-2 border-gray-300 p-1 m-2 hover:bg-cyan-400 hover:text-white "
                : "inline-block border-2 border-gray-300 p-1 m-2 hover:bg-cyan-400 hover:text-white "
            }
          >
            <Link href="/home">
              <a className="p-1 hover:cursor-pointer"> {label}</a>
            </Link>
          </span>
        ))}
      </div>
    </div>
  );
};

export default LeftSideBar;
