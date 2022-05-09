import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { ActionType } from "../../state/action";
import { AppContext } from "../../state/context";
import { FeedDataType } from "../../state/state";

const LeftSideBar = () => {
  const { state, dispatch } = useContext(AppContext);
  const [allFeed, setAllFeed] = useState(state.FeedData);
  // const [selectedLabel, setSelectedLabel] = useState<string>("");
  const { query, push } = useRouter();

  useEffect(() => {
    void (async function () {
      if (query.tag && query.tag != "") {
        const response = await fetch(
          `/api/labels/filterByLabels/${
            Array.isArray(query.tag) ? query.tag[0] : query.tag
          }`
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
  }, [query]);
  return (
    <div
      id="sidebar"
      className=" bg-white w-[100%] md:max-w-[300px] rounded-lg"
    >
      <div id="labels" className="text-center">
        {state.Labels.map((label) => (
          <span
            key={label}
            onClick={() =>
              void (async function () {
                if (query.tag === label) {
                  // setSelectedLabel("");
                  await push("/question");
                } else {
                  await push(`/question?tag=${label}`);
                  // setSelectedLabel(label);
                }
              })()
            }
            className={`inline-block border-2 border-gray-300 p-1 m-2 hover:bg-cyan-400 hover:text-white rounded-md
            ${query.tag == label ? " bg-cyan-400 text-white " : ""}`}
          >
            <span className="p-1 hover:cursor-pointer">{label}</span>
          </span>
        ))}
      </div>
    </div>
  );
};

export default LeftSideBar;
