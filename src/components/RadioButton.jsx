import classNames from "classnames";

const RadioButton = ({ index, value, updateVal, name, data, setData, disabled }) => {
  return (
    <div className="flex flex-col">
      <ul className="inline-flex items-center -space-x-[2px]">
        <li>
          <button
            disabled={disabled}
            className={classNames(
              "rounded-l-lg border px-3 py-2 leading-tight border-blue-500 disabled:border-zinc-500",
              value
                ? "bg-blue-500 text-white disabled:bg-zinc-500"
                : "bg-white text-blue-500 disabled:text-zinc-500"
            )}
            onClick={() =>
              updateVal(
                { target: { name: name, value: true } },
                index,
                data,
                setData
              )
            }
          >
            Yes
          </button>
        </li>
        <li>
          <button
            disabled={disabled}
            className={classNames(
              "rounded-r-lg border px-3 py-2 leading-tight border-blue-500 disabled:border-zinc-500",
              !value
                ? "bg-blue-500 text-white disabled:bg-zinc-500"
                : "bg-white text-blue-500 disabled:text-zinc-500"
            )}
            onClick={() =>
              updateVal(
                { target: { name: name, value: false } },
                index,
                data,
                setData
              )
            }
          >
            No
          </button>
        </li>
      </ul>
    </div>
  );
};

export default RadioButton;
